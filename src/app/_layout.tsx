import '@/global.css';

import { COLORES } from '@/utils/constants';

import { Text, View } from 'react-native';
import { Stack, type ErrorBoundaryProps } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full max-w-xl flex-1 self-center items-center justify-center px-6">
        <Text accessibilityRole="header" className="text-center text-3xl font-bold text-on-surface">
          Algo salió mal
        </Text>
        <Text className="mt-3 text-center text-base text-on-surface-variant">
          {error.message || 'La aplicación encontró un error inesperado.'}
        </Text>
        <View className="mt-8 w-full">
          <Button title="Intentar de nuevo" onPress={() => void retry()} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORES.BACKGROUND },
        }}
      />
    </View>
  );
}
