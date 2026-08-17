import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PalabraVenezolana } from '@/data/palabras';
import type { CategoriaCustom } from '@/hooks/useCategoriasCustom';
import { usePalabraClave } from '@/hooks/usePalabraClave';
import { useSinonimos } from '@/hooks/useSinonimos';
import { usePendientesPalabras } from '@/hooks/usePendientesPalabras';
import { esPalabraClaveValida } from '@/data/palabrasClave';
import { CategoriaAccordion } from './CategoriaAccordion';
import { PalabrasPendientesList } from './PalabrasPendientesList';
import { PalabraForm } from './PalabraForm';

interface CategoriasCustomProps {
  categorias: CategoriaCustom[];
  crearCategoria: (nombre: string) => CategoriaCustom | null;
  agregarPalabra: (categoriaId: string, palabra: PalabraVenezolana) => void;
  actualizarPalabra: (
    categoriaId: string,
    index: number,
    palabra: PalabraVenezolana,
  ) => void;
  eliminarPalabra: (categoriaId: string, index: number) => void;
  eliminarCategoria: (categoriaId: string) => void;
  errorPersistencia?: string | null;
}

export function CategoriasCustom({
  categorias,
  crearCategoria,
  agregarPalabra,
  actualizarPalabra,
  eliminarPalabra,
  eliminarCategoria,
  errorPersistencia,
}: CategoriasCustomProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [categoriaIdActual, setCategoriaIdActual] = useState<string | null>(null);
  const [palabraIndexActual, setPalabraIndexActual] = useState<number | null>(null);
  const [expandida, setExpandida] = useState<string | null>(null);

  const search = usePalabraClave();
  const sinonimos = useSinonimos();
  const pendientes = usePendientesPalabras();

  const abrirModalNueva = () => {
    setModalVisible(true);
    setNombreCategoria('');
    setCategoriaIdActual(null);
    setPalabraIndexActual(null);
    search.reset();
    sinonimos.resetSinonimos();
    pendientes.limpiar();
  };

  const abrirModalAgregarPalabra = (cat: CategoriaCustom) => {
    setModalVisible(true);
    setNombreCategoria(cat.nombre);
    setCategoriaIdActual(cat.id);
    setPalabraIndexActual(null);
    search.reset();
    sinonimos.resetSinonimos();
    pendientes.limpiar();
  };

  const abrirModalEditarPalabra = (cat: CategoriaCustom, index: number) => {
    const palabra = cat.palabras[index];
    if (!palabra) return;
    setModalVisible(true);
    setNombreCategoria(cat.nombre);
    setCategoriaIdActual(cat.id);
    setPalabraIndexActual(index);
    search.cargar(palabra.palabra, palabra.palabraClaveImpostor);
    sinonimos.setSinonimos(palabra.sinonimos ?? []);
    pendientes.limpiar();
  };

  const cerrarModal = () => {
    setModalVisible(false);
    pendientes.limpiar();
    search.reset();
    sinonimos.resetSinonimos();
    setPalabraIndexActual(null);
  };

  const handleGuardar = () => {
    const nombreCat = nombreCategoria.trim();
    if (!nombreCat) return;

    let catId = categoriaIdActual;
    if (!catId) {
      const nueva = crearCategoria(nombreCat);
      if (!nueva) {
        Alert.alert('Nombre no disponible', 'Usa un nombre de categoría diferente.');
        return;
      }
      catId = nueva.id;
    }

    const claveActualValida = esPalabraClaveValida(
      search.palabraClave,
      search.palabraInput,
      sinonimos.sinonimos,
    );

    if (palabraIndexActual !== null) {
      if (!catId || !search.palabraInput.trim() || !claveActualValida) return;
      actualizarPalabra(catId, palabraIndexActual, {
        palabra: search.palabraInput.trim(),
        categoria: nombreCat,
        palabraClaveImpostor: search.palabraClave.trim(),
        sinonimos: sinonimos.sinonimos.length > 0 ? sinonimos.sinonimos : undefined,
      });
      cerrarModal();
      return;
    }

    pendientes.palabrasPendientes.forEach(
      ({ palabra, palabraClaveImpostor, sinonimos: sins }) => {
      agregarPalabra(catId!, {
        palabra,
        categoria: nombreCat,
        palabraClaveImpostor,
        sinonimos: sins.length > 0 ? sins : undefined,
      });
      },
    );

    const palabraActual = search.palabraInput.trim();
    if (palabraActual && claveActualValida) {
      agregarPalabra(catId!, {
        palabra: palabraActual,
        categoria: nombreCat,
        palabraClaveImpostor: search.palabraClave.trim(),
        sinonimos: sinonimos.sinonimos.length > 0 ? sinonimos.sinonimos : undefined,
      });
    }

    cerrarModal();
  };

  const toggleExpandir = (catId: string) => {
    setExpandida((prev) => (prev === catId ? null : catId));
  };

  const puedeGuardar =
    nombreCategoria.trim().length > 0 &&
    (pendientes.palabrasPendientes.length > 0 ||
      (search.palabraInput.trim().length > 0 &&
        esPalabraClaveValida(
          search.palabraClave,
          search.palabraInput,
          sinonimos.sinonimos,
        )));

  return (
    <View className="mt-10">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-on-surface">Categorías personalizadas</Text>
        <Pressable
          onPress={abrirModalNueva}
          disabled={!!errorPersistencia}
          accessibilityRole="button"
          accessibilityLabel="Crear categoría personalizada"
          accessibilityState={{ disabled: !!errorPersistencia }}
          className={`rounded-full bg-primary px-4 py-2 active:opacity-80 ${
            errorPersistencia ? 'opacity-40' : ''
          }`}>
          <Text className="text-sm font-semibold text-on-primary">+ Nueva</Text>
        </Pressable>
      </View>

      {errorPersistencia && (
        <Text accessibilityLiveRegion="polite" className="mt-3 text-sm text-error">
          {errorPersistencia} La edición está deshabilitada para evitar perder cambios.
        </Text>
      )}

      {!errorPersistencia && categorias.length === 0 ? (
        <Text className="mt-4 text-sm text-on-surface-variant">
          No tienes categorías personalizadas aún. Toca {'“+ Nueva”'} para crear una.
        </Text>
      ) : !errorPersistencia ? (
        categorias.map((cat) => (
          <CategoriaAccordion
            key={cat.id}
            cat={cat}
            expandida={expandida === cat.id}
            onToggle={() => toggleExpandir(cat.id)}
            onAgregarPalabra={() => abrirModalAgregarPalabra(cat)}
            onEditarPalabra={(index) => abrirModalEditarPalabra(cat, index)}
            onEliminarCategoria={() => {
              Alert.alert(
                 'Eliminar categoría',
                `¿Eliminar "${cat.nombre}" y sus ${cat.palabras.length} palabra${cat.palabras.length !== 1 ? 's' : ''}?`,
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Eliminar', style: 'destructive', onPress: () => eliminarCategoria(cat.id) },
                ],
              );
            }}
            onEliminarPalabra={(index) => {
              const palabra = cat.palabras[index]?.palabra ?? '';
              Alert.alert('Eliminar palabra', `¿Eliminar "${palabra}"?`, [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', style: 'destructive', onPress: () => eliminarPalabra(cat.id, index) },
              ]);
            }}
          />
        ))
      ) : null}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={cerrarModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1 justify-end bg-black/60 md:justify-center md:px-6">
          <View
            accessibilityViewIsModal
            className="max-h-[90%] w-full max-w-2xl self-center rounded-t-3xl bg-background px-6 pb-8 pt-6 md:rounded-3xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-bold text-on-surface">
                 {palabraIndexActual !== null
                   ? 'Editar palabra'
                   : categoriaIdActual
                     ? 'Agregar palabra'
                     : 'Nueva categoría'}
              </Text>

              {!categoriaIdActual && (
                <View className="mt-6">
                  <Text className="text-sm font-medium text-on-surface-variant">
                     Nombre de la categoría
                  </Text>
                  <Input
                    className="mt-2"
                    placeholder="Ej: Chistes internos"
                    value={nombreCategoria}
                    onChangeText={setNombreCategoria}
                  />
                </View>
              )}

              <PalabrasPendientesList palabras={pendientes.palabrasPendientes} />

              <PalabraForm
                palabraInput={search.palabraInput}
                onPalabraChange={(text) => {
                  search.cambiarPalabra(text);
                  sinonimos.resetSinonimos();
                }}
                palabraClave={search.palabraClave}
                onPalabraClaveChange={search.cambiarClave}
                estadoPalabraClave={search.estado}
                errorPalabraClave={search.error}
                editarDisabled={search.estado === 'fetching' || sinonimos.estadoSinonimos === 'fetching'}
                onGenerar={() => search.handleGenerar(nombreCategoria)}
                puedeGenerar={!!search.palabraInput.trim() && search.estado !== 'fetching'}
                onAgregarPalabra={() =>
                  search.palabraInput.trim() &&
                  esPalabraClaveValida(
                    search.palabraClave,
                    search.palabraInput,
                    sinonimos.sinonimos,
                  ) &&
                  pendientes.handleAgregarPalabra(
                    search.palabraInput,
                    search.palabraClave,
                    sinonimos.sinonimos,
                    () => {
                      search.reset();
                      sinonimos.resetSinonimos();
                    },
                  )
                }
                puedeAgregar={
                  !!search.palabraInput.trim() &&
                  esPalabraClaveValida(
                    search.palabraClave,
                    search.palabraInput,
                    sinonimos.sinonimos,
                  )
                }
                palabraClaveValida={esPalabraClaveValida(
                  search.palabraClave,
                  search.palabraInput,
                  sinonimos.sinonimos,
                )}
                mostrarAgregar={palabraIndexActual === null}
                sinonimos={sinonimos.sinonimos}
                estadoSinonimos={sinonimos.estadoSinonimos}
                onBuscarSinonimos={() => sinonimos.handleBuscarSinonimos(search.palabraInput)}
                onQuitarSinonimo={sinonimos.quitarSinonimo}
                onAgregarSinonimoManual={sinonimos.agregarSinonimoManual}
              />

              <View className="mt-8 gap-3">
                <Button
                   title={
                     palabraIndexActual !== null
                       ? 'Guardar cambios'
                       : categoriaIdActual
                         ? 'Guardar palabra(s)'
                         : 'Guardar categoría'
                   }
                  onPress={handleGuardar}
                  disabled={!puedeGuardar}
                  className={!puedeGuardar ? 'opacity-40' : ''}
                />
                <Button
                  title="Cancelar"
                  variant="outlined"
                  onPress={cerrarModal}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
