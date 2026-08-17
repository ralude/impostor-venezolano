import { Redirect, useRouter } from 'expo-router';
import { Alert, ScrollView, Text, View } from 'react-native';

import { CategoriasCustom } from '@/components/config/CategoriasCustom';
import { CategoryChip } from '@/components/ui/category-chip';
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
    crearCategoria,
    agregarPalabra,
    actualizarPalabra,
    eliminarPalabra,
    eliminarCategoria,
    isHydrated,
    errorCategorias,
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
        <ScreenHeader title="Configuración" />

        <View className="mt-8">
          <Text className="text-lg font-semibold text-on-surface">Número de impostores</Text>
          <Text className="mt-1 text-sm text-on-surface-variant">
            Recomendado: {impostoresRecomendados} para {totalJugadores} jugadores
          </Text>

          <View className="mt-4">
            <ImpostorStepper
              value={numImpostores}
              min={1}
              max={maxImpostores}
              onChange={setNumImpostores}
            />
          </View>
        </View>

        <View className="mt-10">
          <Text className="text-lg font-semibold text-on-surface">Categorías</Text>
          <Text className="mt-1 text-sm text-on-surface-variant">
            Deselecciona las que no quieras usar
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

        <CategoriasCustom
          categorias={categoriasCustom}
          crearCategoria={crearCategoria}
          agregarPalabra={agregarPalabra}
          actualizarPalabra={actualizarPalabra}
          eliminarPalabra={eliminarPalabra}
          eliminarCategoria={eliminarCategoria}
          errorPersistencia={errorCategorias}
        />

        <View className="mt-10 rounded-2xl bg-surface-container p-5">
          <Text className="text-base font-semibold text-on-surface">Resumen</Text>
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
          title="Empezar partida"
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
          className={palabrasDisponibles === 0 || totalJugadores < 3 ? 'opacity-40' : ''}
        />
      </View>
    </ScreenLayout>
  );
}
