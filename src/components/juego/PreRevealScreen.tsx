import { Pressable, Text, View } from 'react-native';

import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';

interface PreRevealScreenProps {
  nombre: string;
  onReveal: () => void;
}

export function PreRevealScreen({ nombre, onReveal }: PreRevealScreenProps) {
  return (
    <ScreenLayout>
      <View className="px-6 pt-4">
        <ScreenHeader title="Revelar" />
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-lg text-on-surface-variant">
          Toca tu nombre para revelar
        </Text>

        <Pressable
          onPress={onReveal}
          accessibilityRole="button"
          accessibilityLabel={`Revelar palabra de ${nombre}`}
          accessibilityHint="Asegúrate de que solo este jugador pueda ver la pantalla"
          className="mt-8 w-full items-center rounded-3xl bg-surface-container px-8 py-10 active:opacity-80">
          <Text className="text-center text-4xl font-extrabold text-on-surface">
            {nombre}
          </Text>
          <Text className="mt-4 text-center text-base text-on-surface-variant">
            Toca aquí
          </Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}
