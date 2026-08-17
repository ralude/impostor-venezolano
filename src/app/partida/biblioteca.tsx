import { ScrollView, Text, View } from 'react-native';

import { CategoriasCustom } from '@/components/config/CategoriasCustom';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { usePartidaContext } from '@/context/PartidaContext';

export default function Biblioteca() {
  const {
    categoriasCustom,
    crearCategoria,
    agregarPalabra,
    actualizarPalabra,
    eliminarPalabra,
    eliminarCategoria,
    errorCategorias,
  } = usePartidaContext();

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1"
        contentContainerClassName="w-full max-w-2xl self-center px-6 pb-10 pt-4"
        showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Mi biblioteca" />
        <Text className="mt-4 text-base leading-6 text-on-surface-variant">
          Guarda categorías y palabras que solo entiende tu grupo.
        </Text>
        <CategoriasCustom
          categorias={categoriasCustom}
          crearCategoria={crearCategoria}
          agregarPalabra={agregarPalabra}
          actualizarPalabra={actualizarPalabra}
          eliminarPalabra={eliminarPalabra}
          eliminarCategoria={eliminarCategoria}
          errorPersistencia={errorCategorias}
        />
        <View className="mt-8 rounded-2xl bg-surface-container p-5">
          <Text className="text-sm font-semibold text-on-surface">Una buena clave no regala la respuesta</Text>
          <Text className="mt-2 text-sm leading-5 text-on-surface-variant">Debe orientar al impostor lo suficiente para improvisar, sin ser un sinónimo directo.</Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
