import { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIAS, type PalabraVenezolana } from '@/data/palabras';
import { STORAGE_KEYS } from '@/utils/storageKeys';

export interface CategoriaCustom {
  id: string;
  nombre: string;
  palabras: PalabraVenezolana[];
}

function generarId(): string {
  return `cat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function decodificarPalabra(value: unknown): PalabraVenezolana | null {
  if (!value || typeof value !== 'object') return null;
  const palabra = value as Partial<PalabraVenezolana>;
  const pistasValidas =
    palabra.pistas === undefined ||
    (Array.isArray(palabra.pistas) &&
      palabra.pistas.every((pista) => typeof pista === 'string' && pista.trim().length > 0));
  const valida =
    typeof palabra.palabra === 'string' &&
    palabra.palabra.trim().length > 0 &&
    palabra.palabra.length <= 80 &&
    typeof palabra.categoria === 'string' &&
    pistasValidas &&
    (palabra.sinonimos === undefined ||
      (Array.isArray(palabra.sinonimos) &&
        palabra.sinonimos.every((sinonimo) => typeof sinonimo === 'string')));
  if (!valida) return null;

  return {
    palabra: palabra.palabra!,
    categoria: palabra.categoria!,
    palabraClaveImpostor:
      typeof palabra.palabraClaveImpostor === 'string' ? palabra.palabraClaveImpostor : '',
    pistas: palabra.pistas,
    sinonimos: palabra.sinonimos,
  };
}

function decodificarCategorias(value: unknown): CategoriaCustom[] | null {
  if (!Array.isArray(value)) return null;
  const resultado: CategoriaCustom[] = [];
  for (const categoria of value) {
    if (
      !categoria ||
      typeof categoria !== 'object' ||
      typeof categoria.id !== 'string' ||
      typeof categoria.nombre !== 'string' ||
      !categoria.nombre.trim() ||
      !Array.isArray(categoria.palabras)
    ) {
      return null;
    }
    const palabras: (PalabraVenezolana | null)[] = (categoria.palabras as unknown[]).map(
      decodificarPalabra,
    );
    if (palabras.some((palabra) => !palabra)) return null;
    resultado.push({ ...categoria, palabras: palabras as PalabraVenezolana[] });
  }
  return resultado;
}

export function useCategoriasCustom() {
  const [categorias, setCategorias] = useState<CategoriaCustom[]>([]);
  const [cargado, setCargado] = useState(false);
  const [cargaExitosa, setCargaExitosa] = useState(false);
  const [errorCategorias, setErrorCategorias] = useState<string | null>(null);

  // Cargar desde AsyncStorage al montar
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.CATEGORIAS_CUSTOM)
      .then((raw) => {
        if (raw) {
          const decoded = decodificarCategorias(JSON.parse(raw));
          if (!decoded) throw new Error('Formato inválido');
          setCategorias(decoded);
        }
      })
      .then(() => setCargaExitosa(true))
      .catch(() => setErrorCategorias('No se pudieron cargar las categorías personalizadas.'))
      .finally(() => setCargado(true));
  }, []);

  // Guardar en AsyncStorage cada vez que cambian las categorias
  useEffect(() => {
    if (!cargado || !cargaExitosa) return;
    AsyncStorage.setItem(STORAGE_KEYS.CATEGORIAS_CUSTOM, JSON.stringify(categorias)).catch(() =>
      setErrorCategorias('No se pudieron guardar las categorías personalizadas.'),
    );
  }, [categorias, cargado, cargaExitosa]);

  const crearCategoria = useCallback((nombre: string) => {
    const trimmed = nombre.trim();
    if (!trimmed) return null;
    const nombreNormalizado = trimmed.toLocaleLowerCase('es');
    if (
      CATEGORIAS.some((categoria) => categoria.toLocaleLowerCase('es') === nombreNormalizado) ||
      categorias.some((categoria) => categoria.nombre.toLocaleLowerCase('es') === nombreNormalizado)
    ) {
      return null;
    }
    const nueva: CategoriaCustom = {
      id: generarId(),
      nombre: trimmed,
      palabras: [],
    };
    setCategorias((prev) => [...prev, nueva]);
    return nueva;
  }, [categorias]);

  const agregarPalabra = useCallback(
    (categoriaId: string, palabra: PalabraVenezolana) => {
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === categoriaId ? { ...cat, palabras: [...cat.palabras, palabra] } : cat,
        ),
      );
    },
    [],
  );

  const eliminarPalabra = useCallback(
    (categoriaId: string, indexPalabra: number) => {
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === categoriaId
            ? { ...cat, palabras: cat.palabras.filter((_, i) => i !== indexPalabra) }
            : cat,
        ),
      );
    },
    [],
  );

  const actualizarPalabra = useCallback(
    (categoriaId: string, indexPalabra: number, palabra: PalabraVenezolana) => {
      setCategorias((prev) =>
        prev.map((categoria) =>
          categoria.id === categoriaId
            ? {
                ...categoria,
                palabras: categoria.palabras.map((actual, index) =>
                  index === indexPalabra ? palabra : actual,
                ),
              }
            : categoria,
        ),
      );
    },
    [],
  );

  const eliminarCategoria = useCallback((categoriaId: string) => {
    setCategorias((prev) => prev.filter((cat) => cat.id !== categoriaId));
  }, []);

  return {
    categorias,
    cargado,
    errorCategorias,
    crearCategoria,
    agregarPalabra,
    actualizarPalabra,
    eliminarPalabra,
    eliminarCategoria,
  };
}
