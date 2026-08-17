import { PALABRAS, type PalabraVenezolana } from '@/data/palabras';
import type { CategoriaCustom } from '@/hooks/useCategoriasCustom';
import { esPalabraClaveValida } from '@/data/palabrasClave';

export interface Jugador {
  id: string;
  nombre: string;
  esImpostor: boolean;
  palabraRevelada: boolean;
}

export interface PalabraElegida {
  palabra: PalabraVenezolana;
  palabraMostrada: string;
}

export function elegirImpostores(jugadores: Jugador[], numImpostores: number): Jugador[] {
  const indices = jugadores.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const impostorIndices = new Set(indices.slice(0, numImpostores));

  return jugadores.map((j, i) => ({
    ...j,
    esImpostor: impostorIndices.has(i),
    palabraRevelada: false,
  }));
}

export function elegirPalabra(
  categorias: string[],
  categoriasCustom: CategoriaCustom[],
): PalabraElegida | null {
  const poolEstatico =
    categorias.length === 0
      ? PALABRAS
      : PALABRAS.filter((p) => categorias.includes(p.categoria));

  const poolCustom =
    categorias.length === 0
      ? categoriasCustom.flatMap((c) => c.palabras).filter(tieneClaveValida)
      : categoriasCustom
          .filter((c) => categorias.includes(c.nombre))
          .flatMap((c) => c.palabras)
          .filter(tieneClaveValida);

  const pool = [...poolEstatico, ...poolCustom];
  if (pool.length === 0) return null;

  const index = Math.floor(Math.random() * pool.length);
  const palabra = pool[index];

  const palabraMostrada = elegirPalabraMostrada(palabra);

  return { palabra, palabraMostrada };
}

export function contarPalabrasDisponibles(
  categorias: string[],
  categoriasCustom: CategoriaCustom[],
): number {
  const estaticas = PALABRAS.filter((p) => categorias.includes(p.categoria)).length;
  const personalizadas = categoriasCustom
    .filter((categoria) => categorias.includes(categoria.nombre))
    .reduce(
      (total, categoria) => total + categoria.palabras.filter(tieneClaveValida).length,
      0,
    );

  return estaticas + personalizadas;
}

function tieneClaveValida(palabra: PalabraVenezolana): boolean {
  return esPalabraClaveValida(
    palabra.palabraClaveImpostor,
    palabra.palabra,
    palabra.sinonimos,
  );
}

function elegirPalabraMostrada(palabra: PalabraVenezolana): string {
  if (!palabra.sinonimos || palabra.sinonimos.length === 0) {
    return palabra.palabra;
  }

  const usarSinonimo = Math.random() < 0.5;
  if (!usarSinonimo) {
    return palabra.palabra;
  }

  const indexSinonimo = Math.floor(Math.random() * palabra.sinonimos.length);
  return palabra.sinonimos[indexSinonimo];
}

export function calcularImpostoresRecomendados(total: number): number {
  return Math.max(1, Math.ceil(total / 4));
}
