import { useEffect, useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { AccessibilityInfo, Animated, Easing, Platform, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { RevealText } from '@/components/ui/reveal-text';
import { usePartidaContext } from '@/context/PartidaContext';

export default function Resultado() {
  const router = useRouter();
  const [namesComplete, setNamesComplete] = useState(false);
  const [contentReveal] = useState(() => new Animated.Value(0));
  const {
    jugadores,
    palabraActual,
    palabraMostrada,
    fase,
    isHydrated,
    iniciarPartida,
    terminarPartida,
  } = usePartidaContext();

  useEffect(() => {
    if (!namesComplete) return;

    let cancelled = false;
    void AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (cancelled) return;
      Animated.timing(contentReveal, {
        toValue: 1,
        duration: reduceMotion ? 0 : 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    });

    return () => {
      cancelled = true;
      contentReveal.stopAnimation();
    };
  }, [contentReveal, namesComplete]);

  if (!isHydrated) return <LoadingScreen />;
  if (!palabraActual || fase !== 'todosRevelados') return <Redirect href="/partida" />;

  const impostores = jugadores.filter((jugador) => jugador.esImpostor);
  const palabra = palabraMostrada ?? palabraActual.palabra;
  const nombres = impostores.map((jugador) => jugador.nombre).join(' y ');
  const revealStyle = {
    opacity: contentReveal,
    transform: [
      {
        translateY: contentReveal.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        }),
      },
    ],
  };

  return (
    <ScreenLayout>
      <View className="w-full max-w-xl flex-1 self-center justify-center px-6 py-8">
        <Text className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Se acabó el misterio</Text>
        <Text className="mt-6 text-center text-lg text-on-surface-variant">
          {impostores.length === 1 ? 'El impostor era' : 'Los impostores eran'}
        </Text>
        <RevealText
          key={nombres}
          text={nombres}
          delay={350}
          duration={1300}
          onComplete={() => setNamesComplete(true)}
          accessibilityRole="header"
          className="mt-3 text-center text-5xl font-extrabold leading-tight text-on-surface"
        />

        <Animated.View style={revealStyle}>
          <View className="mt-10 rounded-3xl bg-surface-container-high p-6">
            <Text className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">La palabra secreta</Text>
            <Text className="mt-3 text-3xl font-extrabold text-primary">{palabra}</Text>
            <Text className="mt-5 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">La clave del impostor</Text>
            <Text className="mt-2 text-xl font-bold text-on-surface">{palabraActual.palabraClaveImpostor}</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        pointerEvents={namesComplete ? 'auto' : 'none'}
        style={revealStyle}>
        <View className="w-full max-w-xl self-center gap-3 px-6 pb-6">
          <Button
            title="Otra ronda"
            onPress={() => {
              if (iniciarPartida()) router.replace('/partida/juego');
            }}
          />
          <Button
            title="Cambiar jugadores"
            variant="outlined"
            onPress={() => {
              terminarPartida();
              router.dismissTo('/partida');
            }}
          />
        </View>
      </Animated.View>
    </ScreenLayout>
  );
}
