import { useState } from 'react';

import type { Jugador } from '@/utils/gameLogic';
import type { PalabraVenezolana } from '@/data/palabras';

export function useRevelar(
  id: string,
  jugadores: Jugador[],
  palabraActual: PalabraVenezolana | null,
  onRevelar: (id: string) => void,
) {
  const [revelado, setRevelado] = useState(false);

  const jugador = jugadores.find((j) => j.id === id);
  const esImpostor = jugador?.esImpostor ?? false;

  const handleRevelar = () => {
    setRevelado(true);
    onRevelar(id);
  };

  return {
    jugador,
    palabraActual,
    esImpostor,
    revelado,
    handleRevelar,
  };
}
