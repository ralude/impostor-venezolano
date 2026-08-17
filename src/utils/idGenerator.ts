let nextJugadorId = 1;

export function generarIdJugador(): string {
  return `jugador-${nextJugadorId++}`;
}

export function generarIdCategoria(): string {
  return `cat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
