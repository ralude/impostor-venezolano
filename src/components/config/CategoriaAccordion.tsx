import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { CategoriaCustom } from '@/hooks/useCategoriasCustom';
import { COLORES } from '@/utils/constants';

interface CategoriaAccordionProps {
  cat: CategoriaCustom;
  expandida: boolean;
  onToggle: () => void;
  onAgregarPalabra: () => void;
  onEditarPalabra: (index: number) => void;
  onEliminarCategoria: () => void;
  onEliminarPalabra: (index: number) => void;
}

export function CategoriaAccordion({
  cat,
  expandida,
  onToggle,
  onAgregarPalabra,
  onEditarPalabra,
  onEliminarCategoria,
  onEliminarPalabra,
}: CategoriaAccordionProps) {
  return (
    <View className="mt-3 overflow-hidden rounded-2xl bg-surface-container">
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`${cat.nombre}, ${cat.palabras.length} palabras`}
        accessibilityState={{ expanded: expandida }}
        className="min-h-12 flex-row items-center justify-between px-4 py-3 active:opacity-70">
        <View className="flex-row items-center gap-2">
          <Ionicons
            name={expandida ? 'chevron-down' : 'chevron-forward'}
            size={18}
            color={COLORES.ON_SURFACE}
          />
          <Text className="text-base font-medium text-on-surface">{cat.nombre}</Text>
          <Text className="text-sm text-on-surface-variant">({cat.palabras.length})</Text>
        </View>
        <Pressable
          onPress={onEliminarCategoria}
          accessibilityRole="button"
          accessibilityLabel={`Eliminar categoria ${cat.nombre}`}
          className="px-2 py-1 active:opacity-60">
          <Ionicons name="trash-outline" size={20} color={COLORES.ERROR} />
        </Pressable>
      </Pressable>

      {expandida && (
        <View className="border-t border-outline px-4 pb-3 pt-2">
          {cat.palabras.length === 0 && (
            <Text className="py-3 text-sm text-on-surface-variant">
              Esta categoría todavía no tiene palabras.
            </Text>
          )}
          {cat.palabras.map((palabra, index) => (
            <View
              key={`${cat.id}-${index}`}
              className="mb-2 flex-row items-center justify-between rounded-lg bg-background px-3 py-2">
              <View className="flex-1">
                <Text className="text-base text-on-surface">{palabra.palabra}</Text>
                <Text className="text-xs text-on-surface-variant">
                  {palabra.palabraClaveImpostor
                    ? `Clave: ${palabra.palabraClaveImpostor}`
                    : 'Sin clave: vuelve a agregar esta palabra'}
                </Text>
              </View>
              <View className="ml-2 flex-row">
                <Pressable
                  onPress={() => onEditarPalabra(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`Editar ${palabra.palabra}`}
                  className="h-12 w-12 items-center justify-center rounded-full active:opacity-60">
                  <Ionicons name="pencil" size={18} color={COLORES.ON_SURFACE_VARIANT} />
                </Pressable>
                <Pressable
                  onPress={() => onEliminarPalabra(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`Eliminar ${palabra.palabra}`}
                  className="h-12 w-12 items-center justify-center rounded-full active:opacity-60">
                  <Ionicons name="close" size={18} color={COLORES.ON_SURFACE_VARIANT} />
                </Pressable>
              </View>
            </View>
          ))}

          <Pressable
            onPress={onAgregarPalabra}
            accessibilityRole="button"
            accessibilityLabel={`Agregar palabra a ${cat.nombre}`}
            className="mt-1 min-h-12 justify-center rounded-lg border border-dashed border-outline px-3 py-2 active:opacity-70">
            <Text className="text-center text-sm text-primary">+ Agregar palabra</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
