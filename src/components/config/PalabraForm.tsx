import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { Input } from '@/components/ui/input';
import type { EstadoPalabraClave } from '@/hooks/usePalabraClave';
import type { EstadoSinonimos } from '@/hooks/useSinonimos';
import { COLORES } from '@/utils/constants';

interface PalabraFormProps {
  palabraInput: string;
  onPalabraChange: (text: string) => void;
  palabraClave: string;
  onPalabraClaveChange: (text: string) => void;
  estadoPalabraClave: EstadoPalabraClave;
  errorPalabraClave: string | null;
  editarDisabled: boolean;
  onGenerar: () => void;
  puedeGenerar: boolean;
  onAgregarPalabra: () => void;
  puedeAgregar: boolean;
  palabraClaveValida: boolean;
  mostrarAgregar?: boolean;
  sinonimos: string[];
  estadoSinonimos: EstadoSinonimos;
  onBuscarSinonimos: () => void;
  onQuitarSinonimo: (index: number) => void;
  onAgregarSinonimoManual: (texto: string) => void;
}

export function PalabraForm({
  palabraInput,
  onPalabraChange,
  palabraClave,
  onPalabraClaveChange,
  estadoPalabraClave,
  errorPalabraClave,
  editarDisabled,
  onGenerar,
  puedeGenerar,
  onAgregarPalabra,
  puedeAgregar,
  palabraClaveValida,
  mostrarAgregar = true,
  sinonimos,
  estadoSinonimos,
  onBuscarSinonimos,
  onQuitarSinonimo,
  onAgregarSinonimoManual,
}: PalabraFormProps) {
  const [nuevoSinonimo, setNuevoSinonimo] = useState('');

  const handleAgregarSinonimo = () => {
    const texto = nuevoSinonimo.trim();
    if (!texto) return;
    onAgregarSinonimoManual(texto);
    setNuevoSinonimo('');
  };

  return (
    <View className="mt-6">
      <Text className="text-sm font-medium text-on-surface-variant">Palabra secreta</Text>
      <Input
        className="mt-2"
        placeholder="Escribe la palabra"
        value={palabraInput}
        onChangeText={onPalabraChange}
        editable={!editarDisabled}
        maxLength={80}
      />

      <View className="mt-5 flex-row items-end gap-3">
        <View className="flex-1">
          <Text className="text-sm font-medium text-on-surface-variant">
            Palabra clave del impostor
          </Text>
          <Input
            className="mt-2"
            accessibilityLabel="Palabra clave del impostor"
            placeholder="Ej: maíz"
            value={palabraClave}
            onChangeText={onPalabraClaveChange}
            editable={estadoPalabraClave !== 'fetching'}
            autoCapitalize="none"
            maxLength={40}
          />
        </View>
        <Pressable
          onPress={onGenerar}
          disabled={!puedeGenerar}
          accessibilityRole="button"
          accessibilityLabel="Generar palabra clave"
          accessibilityState={{ disabled: !puedeGenerar }}
          className={`h-12 min-w-24 items-center justify-center rounded-xl bg-primary px-4 ${
            !puedeGenerar ? 'opacity-40' : 'active:opacity-80'
          }`}>
          {estadoPalabraClave === 'fetching' ? (
            <ActivityIndicator size="small" color={COLORES.BACKGROUND} />
          ) : (
            <Text className="text-sm font-semibold text-on-primary">
              {palabraClave ? 'Generar otra' : 'Generar'}
            </Text>
          )}
        </Pressable>
      </View>

      <Text className="mt-2 text-xs text-on-surface-variant">
        Debe ser una sola palabra relacionada, distinta de la respuesta.
      </Text>
      {estadoPalabraClave === 'success' && (
        <Text accessibilityLiveRegion="polite" className="mt-2 text-sm text-primary">
          Palabra clave generada. Puedes editarla antes de guardar.
        </Text>
      )}
      {errorPalabraClave && (
        <Text accessibilityLiveRegion="polite" className="mt-2 text-sm text-error">
          {errorPalabraClave}
        </Text>
      )}
      {!!palabraClave && !palabraClaveValida && !errorPalabraClave && (
        <Text accessibilityLiveRegion="polite" className="mt-2 text-sm text-error">
          Usa una sola palabra distinta de la respuesta y sus sinónimos.
        </Text>
      )}

      <View className="mt-6">
        <View className="flex-row items-center justify-between gap-3">
          <Text className="text-sm font-medium text-on-surface-variant">
            Sinónimos (opcional)
          </Text>
          <Pressable
            onPress={onBuscarSinonimos}
            disabled={!palabraInput.trim() || estadoSinonimos === 'fetching'}
            accessibilityRole="button"
            accessibilityLabel="Buscar sinónimos"
            className={`min-h-12 justify-center rounded-lg bg-surface-container px-3 ${
              !palabraInput.trim() || estadoSinonimos === 'fetching'
                ? 'opacity-40'
                : 'active:opacity-80'
            }`}>
            {estadoSinonimos === 'fetching' ? (
              <ActivityIndicator size="small" color={COLORES.PRIMARY} />
            ) : (
              <Text className="text-xs font-semibold text-primary">Buscar sinónimos</Text>
            )}
          </Pressable>
        </View>

        {sinonimos.length > 0 && (
          <View className="mt-3 flex-row flex-wrap gap-2">
            {sinonimos.map((sinonimo, index) => (
              <Pressable
                key={`${sinonimo}-${index}`}
                onPress={() => onQuitarSinonimo(index)}
                accessibilityRole="button"
                accessibilityLabel={`Quitar sinónimo ${sinonimo}`}
                className="min-h-12 flex-row items-center rounded-full bg-primary/20 px-3 active:opacity-80">
                <Text className="text-sm text-primary">{sinonimo}</Text>
                <Text className="ml-1.5 text-sm text-primary/60">×</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View className="mt-3 flex-row gap-2">
          <Input
            className="flex-1"
            placeholder="Agregar sinónimo manual"
            value={nuevoSinonimo}
            onChangeText={setNuevoSinonimo}
            onSubmitEditing={handleAgregarSinonimo}
            returnKeyType="done"
          />
          <Pressable
            onPress={handleAgregarSinonimo}
            disabled={!nuevoSinonimo.trim()}
            accessibilityRole="button"
            accessibilityLabel="Agregar sinónimo"
            className={`h-12 w-12 items-center justify-center rounded-xl bg-surface-container ${
              !nuevoSinonimo.trim() ? 'opacity-40' : 'active:opacity-80'
            }`}>
            <Text className="text-xl font-semibold text-primary">+</Text>
          </Pressable>
        </View>

        {estadoSinonimos === 'error' && sinonimos.length === 0 && (
          <Text accessibilityLiveRegion="polite" className="mt-2 text-xs text-on-surface-variant">
            No se encontraron sinónimos. Puedes agregarlos manualmente.
          </Text>
        )}
      </View>

      {mostrarAgregar && (
        <Pressable
          onPress={onAgregarPalabra}
          disabled={!puedeAgregar}
          accessibilityRole="button"
          accessibilityState={{ disabled: !puedeAgregar }}
          className={`mt-6 min-h-12 items-center justify-center rounded-xl bg-surface-container px-4 ${
            !puedeAgregar ? 'opacity-40' : 'active:opacity-80'
          }`}>
          <Text className="text-sm font-semibold text-primary">+ Agregar esta palabra</Text>
        </Pressable>
      )}
    </View>
  );
}
