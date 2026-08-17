import { Redirect, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { usePartidaContext } from '@/context/PartidaContext';

export default function QuienEmpieza() {
  const router = useRouter();
  const { jugadores, palabraActual, primerHabladorId, fase, iniciarPartida, terminarPartida, isHydrated } =
    usePartidaContext();

  if (!isHydrated) return <LoadingScreen />;
  if (!palabraActual || !primerHabladorId) return <Redirect href="/partida" />;
  if (fase !== 'todosRevelados') return <Redirect href="/partida/juego" />;

  const primerHablador = jugadores.find((jugador) => jugador.id === primerHabladorId);
  if (!primerHablador) return <Redirect href="/partida/juego" />;

  const empezarOtraRonda = () => {
    if (iniciarPartida()) router.replace('/partida/juego');
  };

  const terminar = () => {
    terminarPartida();
    router.replace('/partida/configuracion');
  };

  return (
    <ScreenLayout>
      <View className="w-full max-w-xl flex-1 self-center items-center justify-center px-6">
        <Text className="text-center text-lg text-on-surface-variant">Comienza hablando</Text>
        <Text accessibilityRole="header" className="mt-4 text-center text-5xl font-extrabold text-primary">
          {primerHablador.nombre}
        </Text>
        <Text className="mt-6 text-center text-base leading-6 text-on-surface-variant">
          Todos ya conocen su información. Empiecen la ronda diciendo sus pistas y descubran al impostor.
        </Text>
        <View className="mt-10 w-full">
          <Button title="Empezar otra ronda" onPress={empezarOtraRonda} />
          <View className="mt-3">
            <Button title="Terminar partida" variant="outlined" onPress={terminar} />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
