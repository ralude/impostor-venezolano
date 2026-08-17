import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { BackButton } from '@/components/ui/back-button';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
}

export function ScreenHeader({ title, subtitle, rightElement }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-center gap-2">
      <BackButton />
      <View className="flex-1">
        <Text accessibilityRole="header" className="text-3xl font-bold text-on-surface">
          {title}
        </Text>
        {subtitle && (
          <Text className="mt-1 text-base text-on-surface-variant">{subtitle}</Text>
        )}
      </View>
      {rightElement}
    </View>
  );
}
