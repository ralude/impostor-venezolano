import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Text, type TextProps } from 'react-native';

interface RevealTextProps extends TextProps {
  text: string;
  delay?: number;
  duration?: number;
  onComplete?: () => void;
}

export function typingIntervalFor(length: number, duration = 1100) {
  return Math.round(Math.max(35, Math.min(90, duration / Math.max(length, 1))));
}

export function RevealText({
  text,
  delay = 250,
  duration = 1100,
  onComplete,
  ...props
}: RevealTextProps) {
  const [visibleText, setVisibleText] = useState('');
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const characters = Array.from(text);
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    void AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (cancelled) return;
      if (reduceMotion || characters.length === 0) {
        setVisibleText(text);
        onCompleteRef.current?.();
        return;
      }

      timeout = setTimeout(() => {
        let index = 0;
        interval = setInterval(() => {
          index += 1;
          setVisibleText(characters.slice(0, index).join(''));
          if (index === characters.length) {
            clearInterval(interval);
            onCompleteRef.current?.();
          }
        }, typingIntervalFor(characters.length, duration));
      }, delay);
    });

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [delay, duration, text]);

  return (
    <Text {...props} accessibilityLabel={text}>
      {visibleText}
      {visibleText !== text ? '▌' : ''}
    </Text>
  );
}
