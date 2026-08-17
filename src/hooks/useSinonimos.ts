import { useCallback, useEffect, useRef, useState } from 'react';

import { buscarSinonimos } from '@/utils/sinonimosApi';

export type EstadoSinonimos = 'idle' | 'fetching' | 'success' | 'error';

export function useSinonimos() {
  const [sinonimos, setSinonimos] = useState<string[]>([]);
  const [estadoSinonimos, setEstadoSinonimos] = useState<EstadoSinonimos>('idle');
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  const handleBuscarSinonimos = useCallback(async (palabra: string) => {
    const limpia = palabra.trim();
    if (!limpia) return;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setEstadoSinonimos('fetching');
    try {
      const resultados = await buscarSinonimos(limpia, controller.signal);
      if (controller.signal.aborted) return;
      setSinonimos(resultados);
      setEstadoSinonimos(resultados.length > 0 ? 'success' : 'error');
    } catch {
      if (controller.signal.aborted) return;
      setEstadoSinonimos('error');
    }
  }, []);

  const quitarSinonimo = useCallback((index: number) => {
    setSinonimos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const agregarSinonimoManual = useCallback((texto: string) => {
    const limpio = texto.trim();
    if (!limpio) return;
    setSinonimos((prev) => {
      if (prev.some((s) => s.toLowerCase() === limpio.toLowerCase())) return prev;
      return [...prev, limpio];
    });
  }, []);

  const resetSinonimos = useCallback(() => {
    requestRef.current?.abort();
    setSinonimos([]);
    setEstadoSinonimos('idle');
  }, []);

  return {
    sinonimos,
    setSinonimos,
    estadoSinonimos,
    handleBuscarSinonimos,
    quitarSinonimo,
    agregarSinonimoManual,
    resetSinonimos,
  };
}
