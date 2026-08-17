import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { ImpostorReveal } from '@/components/juego/ImpostorReveal';
import { NormalReveal } from '@/components/juego/NormalReveal';
import { PreRevealScreen } from '@/components/juego/PreRevealScreen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Button } from '@/components/ui/button';
import { usePartidaContext } from '@/context/PartidaContext';
import { useRevelar } from '@/hooks/useRevelar';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { LoadingScreen } from '@/components/ui/loading-screen';

export default function Revelar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { jugadores, palabraActual, palabraMostrada, revelarPalabra, isHydrated, fase } =
    usePartidaContext();

  const { jugador, palabraActual: palabra, esImpostor, revelado, handleRevelar } = useRevelar(
    id ?? '',
    jugadores,
    palabraActual,
    revelarPalabra,
  );

  if (!isHydrated) return <LoadingScreen />;
  if (!palabra) return <Redirect href="/partida" />;
  if (!jugador) return <Redirect href="/partida/juego" />;
  if (!revelado && (fase !== 'jugando' || jugador.palabraRevelada)) {
    return <Redirect href="/partida/juego" />;
  }

  if (!revelado) {
    return <PreRevealScreen nombre={jugador.nombre} onReveal={handleRevelar} />;
  }

  const mostrada = palabraMostrada ?? palabra.palabra;

  return (
    <ScreenLayout>
      <View className="px-6 pt-4">
        <ScreenHeader title="Revelar" />
      </View>
      <ScrollView className="flex-1 px-6" contentContainerClassName="flex-1 justify-center">
        <Text
          className={`text-center text-lg ${
            esImpostor ? 'text-error' : 'text-on-surface-variant'
          }`}>
          {jugador.nombre}
        </Text>

        {esImpostor ? (
          <ImpostorReveal
            palabraClave={palabra.palabraClaveImpostor}
            categoria={palabra.categoria}
          />
        ) : (
          <NormalReveal
            palabra={mostrada}
            categoria={palabra.categoria}
          />
        )}
      </ScrollView>

      <View className="px-6 pb-6">
        <Button
          title="Continuar"
          onPress={() => router.replace('/partida/juego')}
          className={esImpostor ? 'bg-error text-on-error' : ''}
        />
      </View>
    </ScreenLayout>
  );
}
