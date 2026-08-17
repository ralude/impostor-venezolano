import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { JugadorRow } from '@/components/jugadores/JugadorRow';
import { PlayerInput } from '@/components/jugadores/PlayerInput';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Button } from '@/components/ui/button';
import { usePartidaContext } from '@/context/PartidaContext';
import { usePlayerForm } from '@/hooks/usePlayerForm';
import { MIN_JUGADORES } from '@/utils/constants';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { GameProgress } from '@/components/ui/game-progress';

export default function SetupJugadores() {
  const router = useRouter();
  const {
    jugadores,
    agregarJugador,
    editarJugador,
    eliminarJugador,
    irAConfiguracion,
    isHydrated,
    errorJugadores,
  } = usePartidaContext();

  const form = usePlayerForm(jugadores, agregarJugador, editarJugador, eliminarJugador);

  if (!isHydrated) return <LoadingScreen />;

  return (
    <ScreenLayout>
      <View className="w-full max-w-xl flex-1 self-center px-6 pt-4">
        <ScreenHeader title="Jugadores" />
        <View className="mt-6">
          <GameProgress current={1} total={3} label="Preparación" />
        </View>
        <Text className="mt-6 text-lg font-semibold text-on-surface">¿Quiénes juegan?</Text>
        <Text className="mt-1 text-sm text-on-surface-variant">Agrega al menos {MIN_JUGADORES} panas.</Text>

        <View className="mt-4">
          <PlayerInput
            value={form.nombreInput}
            onChangeText={form.setNombreInput}
            onSubmit={form.handleAgregar}
          />
        </View>

        <ScrollView className="mt-6 flex-1" showsVerticalScrollIndicator={false}>
          {jugadores.length === 0 ? (
            <View className="mt-6 items-center rounded-2xl border border-outline p-6">
              <Text className="text-base font-semibold text-on-surface">La mesa está vacía</Text>
              <Text className="mt-2 text-center text-sm text-on-surface-variant">Escribe el primer nombre para armar el grupo.</Text>
            </View>
          ) : (
            jugadores.map((jugador) => (
              <JugadorRow
                key={jugador.id}
                id={jugador.id}
                nombre={jugador.nombre}
                editando={form.editandoId === jugador.id}
                editandoNombre={form.editandoNombre}
                onEditandoNombreChange={form.setEditandoNombre}
                onEditar={() => form.handleEditar(jugador.id, jugador.nombre)}
                onGuardarEdicion={form.handleGuardarEdicion}
                onEliminar={() => form.handleEliminar(jugador.id)}
                canEliminar
              />
            ))
          )}
        </ScrollView>
        {errorJugadores && (
          <Text accessibilityLiveRegion="polite" className="mb-3 text-center text-sm text-error">
            {errorJugadores}
          </Text>
        )}
      </View>

      <View className="w-full max-w-xl self-center px-6 pb-6">
        <Text className="mb-3 text-center text-sm text-on-surface-variant">
          {jugadores.length} jugador{jugadores.length !== 1 ? 'es' : ''}
        </Text>
        <Button
          title={`Continuar con ${jugadores.length}`}
          onPress={() => form.handleSiguiente(() => {
            irAConfiguracion();
            router.push('/partida/configuracion');
          })}
          disabled={jugadores.length < MIN_JUGADORES}
        />
      </View>
    </ScreenLayout>
  );
}
