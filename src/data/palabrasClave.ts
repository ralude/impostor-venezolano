const PALABRAS_CLAVE: Record<string, string> = {
  Arepa: 'maíz',
  Cachapa: 'budare',
  Hallaca: 'navidad',
  'Pabellón Criollo': 'bandera',
  Tequeño: 'fiesta',
  Empanada: 'fritura',
  Chicha: 'arroz',
  Guarapo: 'caña',
  Papelón: 'limón',
  Mandoca: 'Zulia',
  Cachito: 'panadería',
  Sancocho: 'fogón',
  Casabe: 'yuca',
  Quesillo: 'caramelo',
  Tostones: 'plátano',
  'Reina Pepiada': 'aguacate',
  Mondongo: 'tripa',
  Pastelito: 'merienda',
  Guasacaca: 'salsa',
  Golfeado: 'anís',
  Cotufa: 'cine',
  'Pan de Jamón': 'navidad',
  'Asado Negro': 'caramelo',
  'Dulce de Lechosa': 'almíbar',
  Cocada: 'playa',
  Chamo: 'juventud',
  Pana: 'amistad',
  Chévere: 'aprobación',
  Burda: 'cantidad',
  Ladilla: 'molestia',
  Corotos: 'pertenencias',
  Vaina: 'asunto',
  Chalequeo: 'broma',
  Bochinche: 'desorden',
  Arrecho: 'intensidad',
  Vacilar: 'diversión',
  Chimbo: 'decepción',
  Catire: 'rubio',
  Musiú: 'extranjero',
  Jeva: 'pareja',
  Boleta: 'indiscreto',
  Pela: 'castigo',
  Guachafita: 'desorden',
  Mariquera: 'tontería',
  Rosca: 'favoritismo',
  Gafo: 'torpeza',
  Sifrino: 'privilegio',
  Vivo: 'astucia',
  Sapo: 'delator',
  Naguará: 'asombro',
  Tepuy: 'meseta',
  'Gran Sabana': 'tepuyes',
  Morichal: 'palmeras',
  Llanos: 'ganado',
  'Médanos de Coro': 'dunas',
  'Caño': 'canal',
  'Páramo': 'frío',
  'Salto Ángel': 'cascada',
  Selva: 'humedad',
  'El Ávila': 'montaña',
  'Los Roques': 'archipiélago',
  Cueva: 'oscuridad',
  Valle: 'montañas',
  'Pico Bolívar': 'altura',
  'Delta del Orinoco': 'desembocadura',
  Moriche: 'palmera',
  Turpial: 'amarillo',
  Araguaney: 'amarillo',
  Samán: 'sombra',
  Cardón: 'espinas',
  Cují: 'sequía',
  Frailejón: 'páramo',
  Cambur: 'potasio',
  Lechosa: 'semillas',
  Parchita: 'ácida',
  Chigüire: 'roedor',
  Guacamaya: 'colores',
  Cacao: 'chocolate',
  'Oso Frontino': 'anteojos',
  Merey: 'semilla',
  Joropo: 'zapateo',
  'Tambores de San Juan': 'junio',
  Cuatro: 'cuerdas',
  Maracas: 'sonajero',
  'Calipso de El Callao': 'carnaval',
  'Alma Llanera': 'himno',
  Gaita: 'Zulia',
  Tonada: 'ordeño',
  Parranda: 'calle',
  Aguinaldo: 'diciembre',
  Chinchorro: 'descanso',
  Liquiliqui: 'gala',
  Alpargatas: 'suela',
  Cholas: 'playa',
  Totuma: 'recipiente',
  Curiara: 'río',
  'Sombrero de Cogollo': 'palma',
  Pocillo: 'café',
  Budare: 'maíz',
  Cava: 'hielo',
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
