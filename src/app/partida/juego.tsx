import { Redirect, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { TarjetaJugador } from '@/components/juego/TarjetaJugador';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { usePartidaContext } from '@/context/PartidaContext';
import { LoadingScreen } from '@/components/ui/loading-screen';

export default function Juego() {
  const router = useRouter();
  const {
    jugadores,
    palabraActual,
    fase,
    isHydrated,
  } = usePartidaContext();

  if (!isHydrated) return <LoadingScreen />;
  if (!palabraActual) return <Redirect href="/partida" />;
  if (fase === 'todosRevelados') return <Redirect href="/partida/quien-empieza" />;

  return (
    <ScreenLayout>
      <View className="w-full max-w-4xl flex-1 self-center px-6 pt-4">
        <ScreenHeader title="Palabra secreta" />
        <Text className="mt-1 text-base text-on-surface-variant">
          Toca tu nombre para revelar
        </Text>

        <ScrollView
          className="mt-4 flex-1"
          contentContainerClassName="flex-row flex-wrap justify-center gap-3 py-4"
          showsVerticalScrollIndicator={false}>
          {jugadores.map((jugador) => (
            <TarjetaJugador
              key={jugador.id}
              nombre={jugador.nombre}
              revelada={jugador.palabraRevelada}
              onPress={() =>
                router.push({ pathname: '/partida/revelar', params: { id: jugador.id } })
              }
            />
          ))}
        </ScrollView>

        <View className="pb-4">
          <Text className="text-center text-sm text-on-surface-variant">
            {jugadores.filter((j) => j.palabraRevelada).length} de {jugadores.length} revelaron
          </Text>
        </View>
      </View>

    </ScreenLayout>
  );
}
