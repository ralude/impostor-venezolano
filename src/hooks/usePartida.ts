import { useCallback, useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CATEGORIAS, type PalabraVenezolana } from '@/data/palabras';
import type { CategoriaCustom } from '@/hooks/useCategoriasCustom';
import {
  type Jugador,
  type PalabraElegida,
  elegirImpostores,
  elegirPalabra,
  calcularImpostoresRecomendados,
} from '@/utils/gameLogic';
import { generarIdJugador } from '@/utils/idGenerator';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { MAX_JUGADORES, MAX_NOMBRE_JUGADOR, MIN_JUGADORES } from '@/utils/constants';

export type Fase = 'setup' | 'configuracion' | 'jugando' | 'todosRevelados';

export interface PartidaState {
  fase: Fase;
  jugadores: Jugador[];
  palabraActual: PalabraVenezolana | null;
  palabraMostrada: string | null;
  primerHabladorId: string | null;
  numImpostores: number;
  categoriasFiltradas: string[];
  jugadoresCargados: boolean;
  errorJugadores: string | null;
}

export interface PartidaActions {
  agregarJugador: (nombre: string) => void;
  editarJugador: (id: string, nombre: string) => void;
  eliminarJugador: (id: string) => void;
  setNumImpostores: (n: number) => void;
  setCategoriasFiltradas: (cats: string[]) => void;
  iniciarPartida: () => boolean;
  revelarPalabra: (id: string) => void;
  irAConfiguracion: () => void;
  terminarPartida: () => void;
}

export function usePartida(categoriasCustom: CategoriaCustom[]): PartidaState & PartidaActions {
  const [fase, setFase] = useState<Fase>('setup');
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [palabraActual, setPalabraActual] = useState<PalabraVenezolana | null>(null);
  const [palabraMostrada, setPalabraMostrada] = useState<string | null>(null);
  const [primerHabladorId, setPrimerHabladorId] = useState<string | null>(null);
  const [numImpostores, setNumImpostores] = useState(1);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState<string[]>([...CATEGORIAS]);
  const [jugadoresCargados, setJugadoresCargados] = useState(false);
  const [cargaJugadoresExitosa, setCargaJugadoresExitosa] = useState(false);
  const [errorJugadores, setErrorJugadores] = useState<string | null>(null);
  const categoriasDisponiblesPrevias = useRef(new Set<string>(CATEGORIAS));

  useEffect(() => {
    const disponibles = new Set([...CATEGORIAS, ...categoriasCustom.map((cat) => cat.nombre)]);

    setCategoriasFiltradas((prev) => {
      const siguientes = prev.filter((nombre) => disponibles.has(nombre));
      for (const nombre of disponibles) {
        if (!categoriasDisponiblesPrevias.current.has(nombre)) siguientes.push(nombre);
      }
      return [...new Set(siguientes)];
    });

    categoriasDisponiblesPrevias.current = disponibles;
  }, [categoriasCustom]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.JUGADORES)
      .then((raw) => {
        if (raw) {
          try {
            const guardados: unknown = JSON.parse(raw);
            if (Array.isArray(guardados)) {
              setJugadores(
                guardados
                  .map((item: unknown) => {
                    if (typeof item === 'string') return item;
                    if (
                      item &&
                      typeof item === 'object' &&
                      'nombre' in item &&
                      typeof item.nombre === 'string'
                    ) {
                      return item.nombre;
                    }
                    return null;
                  })
                  .filter(
                    (nombre): nombre is string =>
                      typeof nombre === 'string' &&
                      nombre.trim().length > 0 &&
                      nombre.trim().length <= MAX_NOMBRE_JUGADOR,
                  )
                  .slice(0, MAX_JUGADORES)
                  .map((nombre) => ({
                    id: generarIdJugador(),
                    nombre,
                    esImpostor: false,
                    palabraRevelada: false,
                  })),
              );
            }
          } catch {
            throw new Error('Los jugadores guardados tienen un formato inválido.');
          }
        }
      })
      .then(() => setCargaJugadoresExitosa(true))
      .catch(() => setErrorJugadores('No se pudieron cargar los jugadores guardados.'))
      .finally(() => setJugadoresCargados(true));
  }, []);

  useEffect(() => {
    if (!jugadoresCargados || !cargaJugadoresExitosa) return;
    AsyncStorage.setItem(
      STORAGE_KEYS.JUGADORES,
      JSON.stringify(jugadores.map((j) => j.nombre)),
    ).catch(() => setErrorJugadores('No se pudieron guardar los jugadores.'));
  }, [jugadores, jugadoresCargados, cargaJugadoresExitosa]);

  const agregarJugador = useCallback((nombre: string) => {
    const trimmed = nombre.trim();
    if (!trimmed || trimmed.length > MAX_NOMBRE_JUGADOR) return;
    setJugadores((prev) => {
      if (prev.length >= MAX_JUGADORES) return prev;
      return [
        ...prev,
        { id: generarIdJugador(), nombre: trimmed, esImpostor: false, palabraRevelada: false },
      ];
    });
  }, []);

  const editarJugador = useCallback((id: string, nombre: string) => {
    const trimmed = nombre.trim();
    if (!trimmed || trimmed.length > MAX_NOMBRE_JUGADOR) return;
    setJugadores((prev) => prev.map((j) => (j.id === id ? { ...j, nombre: trimmed } : j)));
  }, []);

  const eliminarJugador = useCallback((id: string) => {
    setJugadores((prev) => prev.filter((jugador) => jugador.id !== id));
  }, []);

  const irAConfiguracion = useCallback(() => {
    setFase('configuracion');
    setNumImpostores(calcularImpostoresRecomendados(jugadores.length));
  }, [jugadores.length]);

  const iniciarPartida = useCallback(() => {
    if (
      jugadores.length < MIN_JUGADORES ||
      numImpostores < 1 ||
      numImpostores > jugadores.length - 2 ||
      categoriasFiltradas.length === 0
    ) {
      return false;
    }

    const elegida: PalabraElegida | null = elegirPalabra(
      categoriasFiltradas,
      categoriasCustom,
    );
    if (!elegida) return false;

    const conImpostores = elegirImpostores(jugadores, numImpostores);
    setJugadores(conImpostores);
    setPalabraActual(elegida.palabra);
    setPalabraMostrada(elegida.palabraMostrada);
    setPrimerHabladorId(null);
    setFase('jugando');
    return true;
  }, [jugadores, numImpostores, categoriasFiltradas, categoriasCustom]);

  const revelarPalabra = useCallback(
    (id: string) => {
      setJugadores((prev) => {
        if (fase !== 'jugando') return prev;
        const objetivo = prev.find((jugador) => jugador.id === id);
        if (!objetivo || objetivo.palabraRevelada) return prev;

        const updated = prev.map((j) =>
          j.id === id ? { ...j, palabraRevelada: true } : j,
        );
        const todosListos = updated.length > 0 && updated.every((j) => j.palabraRevelada);
        if (todosListos) {
          const randomIndex = Math.floor(Math.random() * updated.length);
          setPrimerHabladorId(updated[randomIndex].id);
          setFase('todosRevelados');
        }
        return updated;
      });
    },
    [fase],
  );

  const terminarPartida = useCallback(() => {
    setJugadores((prev) =>
      prev.map((jugador) => ({
        ...jugador,
        esImpostor: false,
        palabraRevelada: false,
      })),
    );
    setPalabraActual(null);
    setPalabraMostrada(null);
    setPrimerHabladorId(null);
    setFase('configuracion');
  }, []);

  return {
    fase,
    jugadores,
    palabraActual,
    palabraMostrada,
    primerHabladorId,
    numImpostores,
    categoriasFiltradas,
    jugadoresCargados,
    errorJugadores,
    agregarJugador,
    editarJugador,
    eliminarJugador,
    setNumImpostores,
    setCategoriasFiltradas,
    iniciarPartida,
    revelarPalabra,
    irAConfiguracion,
    terminarPartida,
  };
}
