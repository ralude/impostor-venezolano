export const MIN_JUGADORES = 3;
export const MAX_JUGADORES = 20;
export const MAX_NOMBRE_JUGADOR = 30;

export const MENSAJES = {
  MINIMO_JUGADORES: {
    titulo: 'Mínimo de jugadores',
    cuerpo: `Necesitas al menos ${MIN_JUGADORES} jugadores.`,
  },
} as const;

export const COLORES = {
  BACKGROUND: '#0B1210',
  PRIMARY: '#00F0C8',
  ON_SURFACE: '#DFE8E4',
  ON_SURFACE_VARIANT: '#9DB4AD',
  SURFACE_CONTAINER: '#16211E',
  ERROR: '#FFB4AB',
} as const;

export const HEADER_TITLE_SIZE = 'text-3xl font-bold text-on-surface';
