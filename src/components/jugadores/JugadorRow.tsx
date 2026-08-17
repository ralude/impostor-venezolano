import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';
import { COLORES } from '@/utils/constants';

interface JugadorRowProps {
  id: string;
  nombre: string;
  editando: boolean;
  editandoNombre: string;
  onEditandoNombreChange: (text: string) => void;
  onEditar: () => void;
  onGuardarEdicion: () => void;
  onEliminar: () => void;
  canEliminar: boolean;
}

export function JugadorRow({
  id,
  nombre,
  editando,
  editandoNombre,
  onEditandoNombreChange,
  onEditar,
  onGuardarEdicion,
  onEliminar,
  canEliminar,
}: JugadorRowProps) {
  return (
    <View key={id} className="mb-3 min-h-16 flex-row items-center rounded-2xl bg-surface-container px-4 py-2">
      {editando ? (
        <>
          <TextInput
            className="flex-1 rounded-lg bg-background px-3 py-2 text-base text-on-surface"
            value={editandoNombre}
            onChangeText={onEditandoNombreChange}
            onSubmitEditing={onGuardarEdicion}
            autoFocus
            returnKeyType="done"
          />
          <Pressable
            onPress={onGuardarEdicion}
            accessibilityRole="button"
            accessibilityLabel={`Guardar nombre de ${nombre}`}
            className="ml-2 rounded-lg bg-primary px-3 py-2 active:opacity-80">
            <Text className="text-sm font-semibold text-on-primary">OK</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text className="flex-1 text-base text-on-surface">{nombre}</Text>
          <Pressable
            onPress={onEditar}
            accessibilityRole="button"
            accessibilityLabel={`Editar ${nombre}`}
            className="mr-1 h-12 w-12 items-center justify-center rounded-full active:opacity-60">
            <Ionicons name="pencil" size={20} color={COLORES.ON_SURFACE_VARIANT} />
          </Pressable>
          <Pressable
            onPress={onEliminar}
            accessibilityRole="button"
            accessibilityLabel={`Eliminar ${nombre}`}
            disabled={!canEliminar}
            accessibilityState={{ disabled: !canEliminar }}
            className={`h-12 w-12 items-center justify-center rounded-full ${
              canEliminar ? 'active:opacity-60' : 'opacity-30'
            }`}>
            <Ionicons name="trash-outline" size={20} color={COLORES.ERROR} />
          </Pressable>
        </>
      )}
    </View>
  );
}
