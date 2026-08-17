const PALABRAS_CLAVE: Record<string, string> = {
  Arepa: 'maíz',
  Cachapa: 'budare',
  Hallaca: 'navidad',
  'Pabellon Criollo': 'bandera',
  Tequeno: 'fiesta',
  Empanada: 'fritura',
  Chicha: 'arroz',
  Guarapo: 'caña',
  Papelon: 'limón',
  Mandoca: 'Zulia',
  Cachito: 'panadería',
  Sancocho: 'fogón',
  Casabe: 'yuca',
  Quesillo: 'caramelo',
  Tostones: 'plátano',
  Chupe: 'sopa',
  Mondongo: 'tripa',
  Pastelito: 'merienda',
  Bienmesabe: 'coco',
  'Conserva de Coco': 'dulce',
  Chicharron: 'cochino',
  Butifarra: 'embutido',
  'Asado Negro': 'caramelo',
  'Dulce de Lechosa': 'almíbar',
  Cocada: 'playa',
  Chamo: 'juventud',
  Pana: 'amistad',
  Chevere: 'aprobación',
  Burda: 'cantidad',
  Ladilla: 'molestia',
  Corotos: 'pertenencias',
  Vaina: 'asunto',
  Chalequeo: 'broma',
  Bululu: 'gentío',
  Arrecho: 'intensidad',
  Fino: 'calidad',
  Chimbo: 'decepción',
  Catire: 'rubio',
  Musiu: 'extranjero',
  Jeva: 'pareja',
  Boleta: 'indiscreto',
  Pela: 'castigo',
  Guachafita: 'desorden',
  Mariquera: 'tontería',
  Rosca: 'favoritismo',
  Buscon: 'interés',
  Pillo: 'travieso',
  Vivo: 'astucia',
  Chivo: 'jefe',
  Guaro: 'Lara',
  Tepuy: 'meseta',
  Sabana: 'horizonte',
  Morichal: 'palmeras',
  Llanos: 'ganado',
  Medanos: 'arena',
  Cano: 'canal',
  Paramo: 'frío',
  Salto: 'cascada',
  Selva: 'humedad',
  Cerro: 'altura',
  Playa: 'costa',
  Cueva: 'oscuridad',
  Valle: 'montañas',
  Cordillera: 'picos',
  Delta: 'desembocadura',
  Moriche: 'palmera',
  Ceiba: 'gigante',
  Araguaney: 'amarillo',
  Saman: 'sombra',
  Cardon: 'espinas',
  Cuji: 'sequía',
  Jobo: 'fruta',
  Cambur: 'potasio',
  Lechosa: 'semillas',
  Parchita: 'ácida',
  Coco: 'tropical',
  Cafe: 'aroma',
  Cacao: 'chocolate',
  Yuca: 'raíz',
  Merey: 'semilla',
  Joropo: 'zapateo',
  Tambor: 'ritmo',
  Cuatro: 'cuerdas',
  Maracas: 'sonajero',
  Arpa: 'melodía',
  Fulia: 'velorio',
  Gaita: 'Zulia',
  Tonada: 'ordeño',
  Parranda: 'calle',
  Aguinaldo: 'diciembre',
  Chinchorro: 'descanso',
  'Liqui Liqui': 'gala',
  Alpargatas: 'suela',
  Cotiza: 'calzado',
  Totuma: 'recipiente',
  Curiara: 'río',
  'Sombrero de Cogollo': 'palma',
  Ruana: 'abrigo',
  Estera: 'tejido',
  Petate: 'descanso',
};

export function obtenerPalabraClavePredefinida(palabra: string): string | null {
  return PALABRAS_CLAVE[palabra] ?? null;
}

export function normalizarPalabra(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();
}

export function esPalabraClaveValida(
  clave: string,
  palabraSecreta: string,
  sinonimos: string[] = [],
): boolean {
  const limpia = clave.trim();
  if (!/^[\p{L}\p{M}]+(?:-[\p{L}\p{M}]+)*$/u.test(limpia)) return false;

  const claveNormalizada = normalizarPalabra(limpia);
  const secretaNormalizada = normalizarPalabra(palabraSecreta);
  const tokensSecretos = secretaNormalizada.split(/\s+/);
  const coincideConSinonimo = sinonimos.some(
    (sinonimo) => normalizarPalabra(sinonimo) === claveNormalizada,
  );
  return (
    claveNormalizada !== secretaNormalizada &&
    !tokensSecretos.includes(claveNormalizada) &&
    !coincideConSinonimo
  );
}
