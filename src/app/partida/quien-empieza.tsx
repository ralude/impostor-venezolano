import { Redirect, useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { usePartidaContext } from '@/context/PartidaContext';

export default function QuienEmpieza() {
  const router = useRouter();
  const { jugadores, palabraActual, primerHabladorId, fase, terminarPartida, isHydrated } =
    usePartidaContext();

  if (!isHydrated) return <LoadingScreen />;
  if (!palabraActual || !primerHabladorId) return <Redirect href="/partida" />;
  if (fase !== 'todosRevelados') return <Redirect href="/partida/juego" />;

  const primerHablador = jugadores.find((jugador) => jugador.id === primerHabladorId);
  if (!primerHablador) return <Redirect href="/partida/juego" />;

  const terminar = () => {
    terminarPartida();
    router.replace('/partida/configuracion');
  };

  return (
    <ScreenLayout>
      <View className="w-full max-w-xl flex-1 self-center items-center justify-center px-6">
        <Text className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Ronda en curso</Text>
        <Text className="mt-8 text-center text-lg text-on-surface-variant">Comienza hablando</Text>
        <Text accessibilityRole="header" className="mt-4 text-center text-5xl font-extrabold text-primary">
          {primerHablador.nombre}
        </Text>
        <Text className="mt-6 text-center text-base leading-6 text-on-surface-variant">
          Una pista por persona. No digan la palabra ni algo demasiado obvio.
        </Text>
        <View className="mt-8 w-full rounded-2xl bg-surface-container p-5">
          <Text className="text-sm text-on-surface">1. Den sus pistas siguiendo el turno.</Text>
          <Text className="mt-2 text-sm text-on-surface">2. Conversen, sospechen y voten en grupo.</Text>
        </View>
        <View className="mt-10 w-full">
          <Button title="Ya votamos" onPress={() => router.push('/partida/resultado')} />
          <View className="mt-3">
            <Button
              title="Salir de la ronda"
              variant="outlined"
              onPress={() =>
                Alert.alert('¿Salir de la ronda?', 'Se perderá esta palabra y volverás a la configuración.', [
                  { text: 'Seguir jugando', style: 'cancel' },
                  { text: 'Salir', style: 'destructive', onPress: terminar },
                ])
              }
            />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
