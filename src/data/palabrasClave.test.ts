import { PALABRAS } from '@/data/palabras';
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
});
