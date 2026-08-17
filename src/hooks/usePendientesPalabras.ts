import { useState } from 'react';

interface PalabraEnEdicion {
  palabra: string;
  palabraClaveImpostor: string;
  sinonimos: string[];
}

export function usePendientesPalabras() {
  const [palabrasPendientes, setPalabrasPendientes] = useState<PalabraEnEdicion[]>([]);

  const handleAgregarPalabra = (
    palabraInput: string,
    palabraClaveImpostor: string,
    sinonimos: string[],
    limpiarBusqueda: () => void,
  ) => {
    const palabra = palabraInput.trim();
    if (!palabra) return null;
    if (!palabraClaveImpostor.trim()) return null;

    const nueva: PalabraEnEdicion = {
      palabra,
      palabraClaveImpostor: palabraClaveImpostor.trim(),
      sinonimos,
    };
    setPalabrasPendientes((prev) => [...prev, nueva]);
    limpiarBusqueda();
    return nueva;
  };

  const limpiar = () => setPalabrasPendientes([]);

  return {
    palabrasPendientes,
    handleAgregarPalabra,
    limpiar,
  };
}
