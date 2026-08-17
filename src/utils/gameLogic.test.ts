import type { CategoriaCustom } from '@/hooks/useCategoriasCustom';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import {
  calcularImpostoresRecomendados,
  contarPalabrasDisponibles,
  elegirImpostores,
  elegirPalabra,
  type Jugador,
} from '@/utils/gameLogic';

const JUGADORES: Jugador[] = ['Ana', 'Luis', 'María', 'José'].map((nombre, index) => ({
  id: String(index),
  nombre,
  esImpostor: false,
  palabraRevelada: true,
}));

const CATEGORIA_CUSTOM: CategoriaCustom = {
  id: 'custom-1',
  nombre: 'Amigos',
  palabras: [
    {
      palabra: 'Reunión',
      categoria: 'Amigos',
      palabraClaveImpostor: 'grupo',
    },
  ],
};

describe('gameLogic', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('asigna exactamente la cantidad solicitada y reinicia revelados', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const resultado = elegirImpostores(JUGADORES, 2);

    expect(resultado.filter((jugador) => jugador.esImpostor)).toHaveLength(2);
    expect(resultado.every((jugador) => !jugador.palabraRevelada)).toBe(true);
  });

  it('elige palabras de categorías personalizadas', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const resultado = elegirPalabra(['Amigos'], [CATEGORIA_CUSTOM]);

    expect(resultado?.palabra.palabra).toBe('Reunión');
    expect(resultado?.palabra.palabraClaveImpostor).toBe('grupo');
  });

  it('rechaza pools vacíos y palabras personalizadas sin clave válida', () => {
    const categoriaSinClave: CategoriaCustom = {
      ...CATEGORIA_CUSTOM,
      palabras: [{ ...CATEGORIA_CUSTOM.palabras[0], palabraClaveImpostor: '' }],
    };

    expect(elegirPalabra(['Vacía'], [])).toBeNull();
    expect(contarPalabrasDisponibles(['Amigos'], [categoriaSinClave])).toBe(0);
  });

  it('rechaza una clave que también reciben los jugadores como sinónimo', () => {
    const categoriaConColision: CategoriaCustom = {
      ...CATEGORIA_CUSTOM,
      palabras: [
        {
          palabra: 'Coche',
          categoria: 'Amigos',
          palabraClaveImpostor: 'carro',
          sinonimos: ['Carro'],
        },
      ],
    };

    expect(contarPalabrasDisponibles(['Amigos'], [categoriaConColision])).toBe(0);
  });

  it('calcula una recomendación proporcional con mínimo de uno', () => {
    expect(calcularImpostoresRecomendados(3)).toBe(1);
    expect(calcularImpostoresRecomendados(8)).toBe(2);
  });
});
