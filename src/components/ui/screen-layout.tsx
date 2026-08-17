import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ScreenLayout({ children, className }: ScreenLayoutProps) {
  return (
    <SafeAreaView className={`flex-1 bg-background ${className ?? ''}`}>
      {children}
    </SafeAreaView>
  );
}
