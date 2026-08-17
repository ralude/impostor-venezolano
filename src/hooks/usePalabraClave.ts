import { useCallback, useEffect, useRef, useState } from 'react';

import { esPalabraClaveValida } from '@/data/palabrasClave';
import { generarPalabraClave } from '@/utils/palabraClaveApi';

export type EstadoPalabraClave = 'idle' | 'fetching' | 'success' | 'error';

export function usePalabraClave() {
  const [palabraInput, setPalabraInput] = useState('');
  const [palabraClave, setPalabraClave] = useState('');
  const [estado, setEstado] = useState<EstadoPalabraClave>('idle');
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  const handleGenerar = useCallback(async (categoria?: string) => {
    const palabra = palabraInput.trim();
    if (!palabra) return;

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setEstado('fetching');
    setError(null);

    try {
      const generada = await generarPalabraClave(palabra, categoria, controller.signal);
      if (controller.signal.aborted) return;
      setPalabraClave(generada);
      setEstado('success');
    } catch (cause) {
      if (controller.signal.aborted) return;
      setError(cause instanceof Error ? cause.message : 'No se pudo generar la palabra clave.');
      setEstado('error');
    }
  }, [palabraInput]);

  const cambiarPalabra = useCallback((value: string) => {
    requestRef.current?.abort();
    setPalabraInput(value);
    setPalabraClave('');
    setEstado('idle');
    setError(null);
  }, []);

  const cambiarClave = useCallback((value: string) => {
    setPalabraClave(value);
    setEstado('idle');
    setError(null);
  }, []);

  const reset = useCallback(() => {
    requestRef.current?.abort();
    setPalabraInput('');
    setPalabraClave('');
    setEstado('idle');
    setError(null);
  }, []);

  const cargar = useCallback((palabra: string, clave: string) => {
    requestRef.current?.abort();
    setPalabraInput(palabra);
    setPalabraClave(clave);
    setEstado('idle');
    setError(null);
  }, []);

  return {
    palabraInput,
    palabraClave,
    estado,
    error,
    cambiarPalabra,
    cambiarClave,
    handleGenerar,
    claveValida: esPalabraClaveValida(palabraClave, palabraInput),
    cargar,
    reset,
  };
}
