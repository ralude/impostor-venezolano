import { CATEGORIAS, PALABRAS } from '@/data/palabras';
import { esPalabraClaveValida } from '@/data/palabrasClave';
import { describe, expect, it } from '@jest/globals';

describe('palabras clave incluidas', () => {
  it('cubren todo el catálogo con una única palabra segura', () => {
    expect(PALABRAS).toHaveLength(100);

    for (const palabra of PALABRAS) {
      expect(esPalabraClaveValida(palabra.palabraClaveImpostor, palabra.palabra)).toBe(true);
    }
  });

  it('rechaza puntuación y claves iguales a un sinónimo', () => {
    expect(esPalabraClaveValida('---', 'Arepa')).toBe(false);
    expect(esPalabraClaveValida('carro', 'Coche', ['Carro'])).toBe(false);
    expect(esPalabraClaveValida('maíz-tostado', 'Arepa')).toBe(true);
  });

  it('mantiene el balance, los reemplazos y el contenido sensible acordado', () => {
    const normalizadas = PALABRAS.map((item) =>
      item.palabra
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('es'),
    );
    const cantidades = new Map(
      CATEGORIAS.map((categoria) => [
        categoria,
        PALABRAS.filter((item) => item.categoria === categoria).length,
      ]),
    );

    expect(new Set(normalizadas).size).toBe(PALABRAS.length);
    expect(PALABRAS).toHaveLength(100);
    expect([...cantidades.values()]).toEqual([25, 25, 15, 15, 10, 10]);
    expect(normalizadas).toEqual(
      expect.arrayContaining(['mariquera', 'arrecho', 'musiu', 'jeva', 'chalequeo']),
    );
    expect(normalizadas).not.toEqual(
      expect.arrayContaining([
        'butifarra',
        'chupe',
        'bienmesabe',
        'conserva de coco',
        'chicharron',
        'buscon',
        'pillo',
        'chivo',
        'guaro',
        'bululu',
        'fino',
        'sabana',
        'medanos',
        'salto',
        'playa',
        'cerro',
        'cordillera',
        'delta',
        'ceiba',
        'coco',
        'cafe',
        'yuca',
        'jobo',
        'tambor',
        'arpa',
        'fulia',
        'cotiza',
        'petate',
        'ruana',
        'estera',
      ]),
    );
  });
});
