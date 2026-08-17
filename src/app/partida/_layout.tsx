import { Stack } from 'expo-router';

import { PartidaProvider } from '@/context/PartidaContext';
import { COLORES } from '@/utils/constants';

export default function PartidaLayout() {
  return (
    <PartidaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORES.BACKGROUND },
        }}
      />
    </PartidaProvider>
  );
}
