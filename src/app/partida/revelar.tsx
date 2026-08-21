import { useState } from 'react';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ImpostorReveal } from '@/components/juego/ImpostorReveal';
import { NormalReveal } from '@/components/juego/NormalReveal';
import { PreRevealScreen } from '@/components/juego/PreRevealScreen';
import { Button } from '@/components/ui/button';
import { GameProgress } from '@/components/ui/game-progress';
import { usePartidaContext } from '@/context/PartidaContext';
import { useRevelar } from '@/hooks/useRevelar';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { LoadingScreen } from '@/components/ui/loading-screen';

export default function Revelar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [revealComplete, setRevealComplete] = useState(false);
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
    return (
      <PreRevealScreen
        nombre={jugador.nombre}
        current={Math.min(jugadores.filter((item) => item.palabraRevelada).length + 1, jugadores.length)}
        total={jugadores.length}
        onReveal={handleRevelar}
      />
    );
  }

  const mostrada = palabraMostrada ?? palabra.palabra;
  const current = jugadores.filter((item) => item.palabraRevelada).length;

  return (
    <ScreenLayout>
      <View className="w-full max-w-xl self-center px-6 pt-6">
        <GameProgress current={current} total={jugadores.length} label="Tu rol" />
      </View>
      <ScrollView
        className="w-full max-w-xl flex-1 self-center px-6"
        contentContainerClassName="flex-1 justify-center py-8">
        {esImpostor ? (
          <ImpostorReveal
            palabraClave={palabra.palabraClaveImpostor}
            categoria={palabra.categoria}
            onComplete={() => setRevealComplete(true)}
          />
        ) : (
          <NormalReveal
            palabra={mostrada}
            categoria={palabra.categoria}
            onComplete={() => setRevealComplete(true)}
          />
        )}
      </ScrollView>

      <View className="w-full max-w-xl self-center px-6 pb-6">
        <Button
          title={revealComplete ? 'Ocultar y pasar' : 'Revelando…'}
          onPress={() => router.replace('/partida/juego')}
          variant={esImpostor ? 'tonal' : 'filled'}
          disabled={!revealComplete}
        />
      </View>
    </ScreenLayout>
  );
}
