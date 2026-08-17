import { Redirect, useRouter } from 'expo-router';
import { Alert, ScrollView, Text, View } from 'react-native';

import { CategoryChip } from '@/components/ui/category-chip';
import { GameProgress } from '@/components/ui/game-progress';
import { ImpostorStepper } from '@/components/ui/impostor-stepper';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Button } from '@/components/ui/button';
import { usePartidaContext } from '@/context/PartidaContext';
import { CATEGORIAS } from '@/data/palabras';
import { contarPalabrasDisponibles } from '@/utils/gameLogic';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { MIN_JUGADORES } from '@/utils/constants';

export default function Configuracion() {
  const router = useRouter();
  const {
    jugadores,
    numImpostores,
    setNumImpostores,
    categoriasFiltradas,
    setCategoriasFiltradas,
    iniciarPartida,
    categoriasCustom,
    isHydrated,
  } = usePartidaContext();

  const totalJugadores = jugadores.length;
  const maxImpostores = Math.max(1, totalJugadores - 2);
  const impostoresRecomendados = Math.max(1, Math.ceil(totalJugadores / 4));
  const palabrasDisponibles = contarPalabrasDisponibles(categoriasFiltradas, categoriasCustom);

  if (!isHydrated) return <LoadingScreen />;
  if (totalJugadores < MIN_JUGADORES) return <Redirect href="/partida" />;

  const toggleCategoria = (cat: string) => {
    if (categoriasFiltradas.includes(cat)) {
      setCategoriasFiltradas(categoriasFiltradas.filter((c) => c !== cat));
    } else {
      setCategoriasFiltradas([...categoriasFiltradas, cat]);
    }
  };

  const chipActiva = (nombre: string) => categoriasFiltradas.includes(nombre);

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1"
        contentContainerClassName="w-full max-w-2xl self-center px-6 pb-6 pt-4"
        showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Armar la ronda" />
        <View className="mt-6">
          <GameProgress current={2} total={3} label="Preparación" />
        </View>

        <View className="mt-8 rounded-3xl bg-surface-container-high p-6">
          <Text className="text-lg font-semibold text-on-surface">¿Cuántos impostores?</Text>
          <Text className="mt-1 text-sm text-on-surface-variant">
            Recomendado: {impostoresRecomendados} para {totalJugadores} jugadores
          </Text>

          <View className="mt-6">
            <ImpostorStepper
              value={numImpostores}
              min={1}
              max={maxImpostores}
              onChange={setNumImpostores}
            />
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-lg font-semibold text-on-surface">¿De qué hablamos?</Text>
          <Text className="mt-1 text-sm text-on-surface-variant">
            Toca una categoría para incluirla o sacarla de la ronda.
          </Text>

          <View className="mt-4 flex-row flex-wrap gap-2">
            {CATEGORIAS.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                activa={chipActiva(cat)}
                onPress={() => toggleCategoria(cat)}
              />
            ))}
            {categoriasCustom.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.nombre}
                activa={chipActiva(cat.nombre)}
                onPress={() => toggleCategoria(cat.nombre)}
              />
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Button title="Administrar mi biblioteca" variant="outlined" onPress={() => router.push('/partida/biblioteca')} />
        </View>

        <View className="mt-8 rounded-2xl bg-surface-container p-5">
          <Text className="text-xs font-semibold uppercase tracking-widest text-primary">Resumen de la ronda</Text>
          <Text className="mt-2 text-sm text-on-surface-variant">
            {totalJugadores} jugadores · {numImpostores} impostor
            {numImpostores !== 1 ? 'es' : ''}
          </Text>
          <Text className="text-sm text-on-surface-variant">
            Categorías:{' '}
            {categoriasFiltradas.length === 0 ? 'Ninguna' : categoriasFiltradas.join(', ')}
          </Text>
          <Text className="text-sm text-on-surface-variant">
            {palabrasDisponibles} palabra{palabrasDisponibles !== 1 ? 's' : ''} disponible
            {palabrasDisponibles !== 1 ? 's' : ''}
          </Text>
        </View>
      </ScrollView>

      <View className="w-full max-w-2xl self-center px-6 pb-6">
        <Button
          title="Preparar roles"
          onPress={() => {
            if (iniciarPartida()) {
              router.push('/partida/juego');
              return;
            }
            Alert.alert(
              'Configuración incompleta',
              'Selecciona al menos una categoría que tenga palabras disponibles.',
            );
          }}
          disabled={palabrasDisponibles === 0 || totalJugadores < 3}
        />
      </View>
    </ScreenLayout>
  );
}
