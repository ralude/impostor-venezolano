import { ActivityIndicator, Text, View } from 'react-native';

import { ScreenLayout } from '@/components/ui/screen-layout';
import { COLORES } from '@/utils/constants';

export function LoadingScreen() {
  return (
    <ScreenLayout>
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <ActivityIndicator size="large" color={COLORES.PRIMARY} />
        <Text accessibilityLiveRegion="polite" className="text-base text-on-surface-variant">
          Cargando partida…
        </Text>
      </View>
    </ScreenLayout>
  );
}
