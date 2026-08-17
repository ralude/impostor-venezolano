import { createContext, useContext, type ReactNode } from 'react';

import { usePartida, type PartidaState, type PartidaActions } from '@/hooks/usePartida';
import { useCategoriasCustom, type CategoriaCustom } from '@/hooks/useCategoriasCustom';

type PartidaContextValue = PartidaState &
  PartidaActions &
  ReturnType<typeof useCategoriasCustom> & {
    categoriasCustom: CategoriaCustom[];
    isHydrated: boolean;
  };

const PartidaContext = createContext<PartidaContextValue | null>(null);

export function PartidaProvider({ children }: { children: ReactNode }) {
  const custom = useCategoriasCustom();
  const partida = usePartida(custom.categorias);

  const value: PartidaContextValue = {
    ...partida,
    ...custom,
    categoriasCustom: custom.categorias,
    isHydrated: partida.jugadoresCargados && custom.cargado,
  };

  return <PartidaContext.Provider value={value}>{children}</PartidaContext.Provider>;
}

export function usePartidaContext() {
  const ctx = useContext(PartidaContext);
  if (!ctx) {
    throw new Error('usePartidaContext debe usarse dentro de PartidaProvider');
  }
  return ctx;
}
