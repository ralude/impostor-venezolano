import { Pressable, Text, View } from 'react-native';

import { ScreenLayout } from '@/components/ui/screen-layout';
import { GameProgress } from '@/components/ui/game-progress';

interface PreRevealScreenProps {
  nombre: string;
  current: number;
  total: number;
  onReveal: () => void;
}

export function PreRevealScreen({ nombre, current, total, onReveal }: PreRevealScreenProps) {
  return (
    <ScreenLayout>
      <View className="px-6 pt-4">
        <Text accessibilityRole="header" className="text-3xl font-bold text-on-surface">Pásale el teléfono</Text>
        <View className="mt-6">
          <GameProgress current={current} total={total} label="Roles privados" />
        </View>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Que nadie más mire</Text>
        <Text className="mt-4 text-center text-lg text-on-surface-variant">Este teléfono ahora es para</Text>

        <Pressable
          onPress={onReveal}
          accessibilityRole="button"
          accessibilityLabel={`Revelar palabra de ${nombre}`}
          accessibilityHint="Asegúrate de que solo este jugador pueda ver la pantalla"
          className="mt-8 w-full items-center rounded-3xl bg-surface-container-high px-8 py-10 active:opacity-80">
          <Text className="text-center text-4xl font-extrabold text-on-surface">
            {nombre}
          </Text>
          <Text className="mt-4 text-center text-base text-on-surface-variant">
            Soy {nombre} · Ver mi rol
          </Text>
        </Pressable>
      </View>
    </ScreenLayout>
  );
}
