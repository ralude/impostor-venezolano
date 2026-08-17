import { obtenerPalabraClavePredefinida } from '@/data/palabrasClave';

export interface PalabraVenezolana {
  palabra: string;
  categoria: string;
  palabraClaveImpostor: string;
  pistas?: string[];
  sinonimos?: string[];
}

type PalabraBase = Omit<PalabraVenezolana, 'palabraClaveImpostor'>;

export const CATEGORIAS = [
  'Comida y Bebida',
  'Expresiones',
  'Lugares',
  'Naturaleza',
  'Música y Tradición',
  'Objetos y Vestimenta',
] as const;

const PALABRAS_BASE: PalabraBase[] = [
  // ── Comida y Bebida (25) ──
  {
    palabra: 'Arepa',
    categoria: 'Comida y Bebida',
    pistas: ['Es redonda y dorada', 'Se rellena con lo que quieras', 'No falta en la mesa venezolana'],
  },
  {
    palabra: 'Cachapa',
    categoria: 'Comida y Bebida',
    pistas: ['Dulce y de maiz tierno', 'Se dobla como un panqueque', 'Con queso de mano sabe mejor'],
  },
  {
    palabra: 'Hallaca',
    categoria: 'Comida y Bebida',
    pistas: ['Se envuelve en hoja de platano', 'Prota de las navidades', 'Lleva guiso, aceitunas y alcaparras'],
  },
  {
    palabra: 'Pabellón Criollo',
    categoria: 'Comida y Bebida',
    pistas: ['Plato nacional por excelencia', 'Lleva caraotas negras', 'Arroz, carne mechada y tajadas'],
  },
  {
    palabra: 'Tequeño',
    categoria: 'Comida y Bebida',
    pistas: ['Deditos de queso envueltos', 'Estrella de toda fiesta', 'Fritos y crujientes por fuera'],
  },
  {
    palabra: 'Empanada',
    categoria: 'Comida y Bebida',
    pistas: ['Media luna frita', 'De maiz o de trigo', 'En la calle con cafe es desayuno'],
  },
  {
    palabra: 'Chicha',
    categoria: 'Comida y Bebida',
    pistas: ['Bebida blanca y dulce', 'De arroz o de pasta', 'Se vende en vasos grandes en la calle'],
  },
  {
    palabra: 'Guarapo',
    categoria: 'Comida y Bebida',
    pistas: ['Jugo de cana de azucar', 'Verde y refrescante', 'Lo exprimen en un molino'],
  },
  {
    palabra: 'Papelón',
    categoria: 'Comida y Bebida',
    pistas: ['Panela de cana solidificada', 'Se diluye para hacer jugo', 'Con limon es una bebida clasica'],
  },
  {
    palabra: 'Mandoca',
    categoria: 'Comida y Bebida',
    pistas: ['Anillo de maiz frito', 'Dulce y oscura por el papelon', 'Tipica del Zulia para el desayuno'],
  },
  {
    palabra: 'Cachito',
    categoria: 'Comida y Bebida',
    pistas: ['Pan enrollado con jamon', 'Suave y un poco dulce', 'Desayuno clasico de panaderia'],
  },
  {
    palabra: 'Sancocho',
    categoria: 'Comida y Bebida',
    pistas: ['Sopa espesa y sustanciosa', 'De gallina, res o pescado', 'Levanta a cualquiera de una cruda'],
  },
  {
    palabra: 'Casabe',
    categoria: 'Comida y Bebida',
    pistas: ['Torta plana de yuca', 'Crujiente y ancestral', 'Lo hacian los indigenas en budare'],
  },
  {
    palabra: 'Quesillo',
    categoria: 'Comida y Bebida',
    pistas: ['Flan venezolano con huevo', 'Lleva caramelo por encima', 'Postre de toda reunion familiar'],
  },
  {
    palabra: 'Tostones',
    categoria: 'Comida y Bebida',
    pistas: ['Platano verde aplastado y frito', 'Se aplana dos veces', 'Acompanante crujiente por excelencia'],
  },
  {
    palabra: 'Reina Pepiada',
    categoria: 'Comida y Bebida',
    pistas: ['Relleno cremoso para arepa', 'Lleva pollo y aguacate', 'Un clásico de las areperas'],
  },
  {
    palabra: 'Mondongo',
    categoria: 'Comida y Bebida',
    pistas: ['Sopa de panza de res', 'Plato fuerte de fin de semana', 'Se sirve con casabe o arepa'],
  },
  {
    palabra: 'Pastelito',
    categoria: 'Comida y Bebida',
    pistas: ['Empanada pequena y ovalada', 'Frita en la calle por las mananas', 'De queso, carne o caraotas'],
  },
  {
    palabra: 'Guasacaca',
    categoria: 'Comida y Bebida',
    pistas: ['Salsa verde y fresca', 'Acompaña parrillas y empanadas', 'Lleva aguacate o cilantro'],
  },
  {
    palabra: 'Golfeado',
    categoria: 'Comida y Bebida',
    pistas: ['Pan dulce enrollado', 'Lleva papelón y queso', 'Se disfruta con café'],
  },
  {
    palabra: 'Cotufa',
    categoria: 'Comida y Bebida',
    pistas: ['Maíz reventado y crujiente', 'Se come en el cine', 'Puede ser dulce o salada'],
  },
  {
    palabra: 'Pan de Jamón',
    categoria: 'Comida y Bebida',
    pistas: ['Pan enrollado con jamón y aceitunas', 'Protagonista de la mesa navideña', 'Se comparte en diciembre'],
  },
  {
    palabra: 'Asado Negro',
    categoria: 'Comida y Bebida',
    pistas: ['Carne de res en salsa oscura', 'El dulzor del papelon lo caracteriza', 'Plato de celebracion en Caracas'],
  },
  {
    palabra: 'Dulce de Lechosa',
    categoria: 'Comida y Bebida',
    pistas: ['Fruta verde cocida en almibar', 'Postre de Semana Santa', 'Cristalizada y tierna por dentro'],
  },
  {
    palabra: 'Cocada',
    categoria: 'Comida y Bebida',
    pistas: ['Bebida batida de coco', 'Cremosa y helada', 'Refrescante en la playa'],
  },

  // ── Expresiones (25) ──
  {
    palabra: 'Chamo',
    categoria: 'Expresiones',
    pistas: ['Forma carinosa de llamar a alguien', 'Equivalente a "chico"', 'Se usa mucho entre amigos'],
  },
  {
    palabra: 'Pana',
    categoria: 'Expresiones',
    pistas: ['Tu mejor amigo o amiga', 'Vale mas que un conocido', 'Con el cuentas para todo'],
  },
  {
    palabra: 'Chévere',
    categoria: 'Expresiones',
    pistas: ['Algo que esta muy bien', 'Palabra de aprobacion total', 'Lo contrario de "malo"'],
  },
  {
    palabra: 'Burda',
    categoria: 'Expresiones',
    pistas: ['Mucho o demasiado de algo', 'Se usa para exagerar', 'Intensificador venezolano'],
  },
  {
    palabra: 'Ladilla',
    categoria: 'Expresiones',
    pistas: ['Algo fastidioso o molesto', 'No tiene nada que ver con insectos', 'Se usa cuando algo cansa'],
  },
  {
    palabra: 'Corotos',
    categoria: 'Expresiones',
    pistas: ['Tus cosas o pertenencias', 'El desorden de tu cuarto', 'Tambien son los muebles viejos'],
  },
  {
    palabra: 'Vaina',
    categoria: 'Expresiones',
    pistas: ['Palabra comodin para todo', 'Puede ser buena o mala', 'Todo el mundo la usa constantemente'],
  },
  {
    palabra: 'Chalequeo',
    categoria: 'Expresiones',
    pistas: ['Burla intensa y continua', 'Entre amigos es normal', 'Se disfruta en grupo'],
  },
  {
    palabra: 'Bochinche',
    categoria: 'Expresiones',
    pistas: ['Multitud o mucha gente junta', 'Caos de personas', 'Cuando el concierto esta full'],
  },
  {
    palabra: 'Arrecho',
    categoria: 'Expresiones',
    pistas: ['Molesto, enojado o sorprendente', 'Palabra de doble sentido', 'La usan en toda Venezuela'],
  },
  {
    palabra: 'Vacilar',
    categoria: 'Expresiones',
    pistas: ['Excelente, de gran calidad', 'Lo contrario de ordinario', 'Tambien describe a alguien elegante'],
  },
  {
    palabra: 'Chimbo',
    categoria: 'Expresiones',
    pistas: ['Falso o de mala calidad', 'No es lo autentico', 'Un producto de imitacion'],
  },
  {
    palabra: 'Catire',
    categoria: 'Expresiones',
    pistas: ['Persona de cabello rubio o claro', 'Apodo comun en Venezuela', 'Sin ofensa, es carinoso'],
  },
  {
    palabra: 'Musiú',
    categoria: 'Expresiones',
    pistas: ['Persona extranjera o blanca', 'De "monsieur" deformado', 'Los abuelos lo decian mucho'],
  },
  {
    palabra: 'Jeva',
    categoria: 'Expresiones',
    pistas: ['Novia o mujer', 'Se usa entre jovenes', 'Tu pareja romantica'],
  },
  {
    palabra: 'Boleta',
    categoria: 'Expresiones',
    pistas: ['Actuar mal o faltar el respeto', 'Pasar verguenza en publico', 'Tambien es no cumplir algo'],
  },
  {
    palabra: 'Pela',
    categoria: 'Expresiones',
    pistas: ['Paliza o golpiza', 'Puede ser fisica o en un juego', 'Ganarle a alguien por mucho'],
  },
  {
    palabra: 'Guachafita',
    categoria: 'Expresiones',
    pistas: ['Alboroto, broma y diversion', 'Ambiente festivo y desordenado', 'Risa y relajo puro'],
  },
  {
    palabra: 'Mariquera',
    categoria: 'Expresiones',
    pistas: ['Tonteria o cosa sin importancia', 'Algo trivial o ridiculo', 'No vale la pena preocuparse'],
  },
  {
    palabra: 'Rosca',
    categoria: 'Expresiones',
    pistas: ['Grupo cerrado de personas influyentes', 'Circulo exclusivo de poder', 'Quien tiene las conexiones'],
  },
  {
    palabra: 'Gafo',
    categoria: 'Expresiones',
    pistas: ['Persona despistada o ingenua', 'Se usa como insulto leve', 'También puede ser cariñoso entre amigos'],
  },
  {
    palabra: 'Sifrino',
    categoria: 'Expresiones',
    pistas: ['Persona de gustos costosos', 'Cuida mucho su apariencia', 'Palabra de clase social y estilo'],
  },
  {
    palabra: 'Vivo',
    categoria: 'Expresiones',
    pistas: ['Listo e inteligente', 'No se deja enganar', 'Ve las cosas antes que otros'],
  },
  {
    palabra: 'Sapo',
    categoria: 'Expresiones',
    pistas: ['Persona que delata a otros', 'Soplón en el barrio', 'Nadie le confía secretos'],
  },
  {
    palabra: 'Naguará',
    categoria: 'Expresiones',
    pistas: ['Expresión de sorpresa', 'Muy usada en Lara', 'Equivale a “qué impresionante”'],
  },

  // ── Lugares (15) ──
  {
    palabra: 'Tepuy',
    categoria: 'Lugares',
    pistas: ['Montana de cima plana', 'Millones de anos de antiguedad', 'El mas famoso es el Roraima'],
  },
  {
    palabra: 'Gran Sabana',
    categoria: 'Lugares',
    pistas: ['Paisaje de tepuyes', 'Está en el estado Bolívar', 'Canaima forma parte de esta región'],
  },
  {
    palabra: 'Morichal',
    categoria: 'Lugares',
    pistas: ['Caño o arroyo rodeado de moriches', 'Vegetación densa y húmeda', 'Refugio de fauna en los Llanos'],
  },
  {
    palabra: 'Llanos',
    categoria: 'Lugares',
    pistas: ['Extension plana interminable', 'Tierra de ganado y vaqueros', 'El horizonte se pierde de vista'],
  },
  {
    palabra: 'Médanos de Coro',
    categoria: 'Lugares',
    pistas: ['Dunas de arena en Venezuela', 'Están en el estado Falcón', 'El viento cambia su forma'],
  },
  {
    palabra: 'Caño',
    categoria: 'Lugares',
    pistas: ['Brazo de rio o canal natural', 'Agua dulce entre la vegetacion', 'Se navega en curiara'],
  },
  {
    palabra: 'Páramo',
    categoria: 'Lugares',
    pistas: ['Zona fria de alta montana', 'Vegetacion rala y frailejones', 'Niebla y frio constante'],
  },
  {
    palabra: 'Salto Ángel',
    categoria: 'Lugares',
    pistas: ['La caída de agua más alta del mundo', 'Está en el estado Bolívar', 'También se conoce como Kerepakupai Vená'],
  },
  {
    palabra: 'Selva',
    categoria: 'Lugares',
    pistas: ['Bosque tropical denso', 'Amazonia venezolana', 'Arboles gigantes y rios caudalosos'],
  },
  {
    palabra: 'El Ávila',
    categoria: 'Lugares',
    pistas: ['Montaña que acompaña a Caracas', 'También se llama Waraira Repano', 'Se ve desde gran parte de la capital'],
  },
  {
    palabra: 'Los Roques',
    categoria: 'Lugares',
    pistas: ['Archipiélago de aguas turquesas', 'Está en el mar Caribe', 'Destino de playas y cayos'],
  },
  {
    palabra: 'Cueva',
    categoria: 'Lugares',
    pistas: ['Caverna subterranea natural', 'Oscuridad total y formaciones rocosas', 'Hogar de guacharos y murcielagos'],
  },
  {
    palabra: 'Valle',
    categoria: 'Lugares',
    pistas: ['Terreno bajo entre montanas', 'Zona fertil y habitada', 'Rodeado de cerros verdes'],
  },
  {
    palabra: 'Pico Bolívar',
    categoria: 'Lugares',
    pistas: ['Cumbre más alta de Venezuela', 'Está en la Sierra Nevada', 'Puede recibir nieve en temporada fría'],
  },
  {
    palabra: 'Delta del Orinoco',
    categoria: 'Lugares',
    pistas: ['Desembocadura del Orinoco', 'Laberinto de canos e islas', 'Tierra de los Warao'],
  },

  // ── Naturaleza (15) ──
  {
    palabra: 'Moriche',
    categoria: 'Naturaleza',
    pistas: ['Palmera de los morichales', 'De ella sale el moriche', 'Abundante en Los Llanos'],
  },
  {
    palabra: 'Turpial',
    categoria: 'Naturaleza',
    pistas: ['Ave nacional de Venezuela', 'Tiene plumaje amarillo y negro', 'Su canto es muy reconocido'],
  },
  {
    palabra: 'Araguaney',
    categoria: 'Naturaleza',
    pistas: ['Arbol nacional de flores amarillas', 'Florece entre febrero y abril', 'Amarillo intenso que anuncia la lluvia'],
  },
  {
    palabra: 'Samán',
    categoria: 'Naturaleza',
    pistas: ['Arbol de sombra amplia y fresca', 'Sus ramas se extienden como paraguas', 'Refugio perfecto del sol tropical'],
  },
  {
    palabra: 'Cardón',
    categoria: 'Naturaleza',
    pistas: ['Cactus gigante del desierto', 'Resiste climas aridos', 'Formas caprichosas en la peninsula'],
  },
  {
    palabra: 'Cují',
    categoria: 'Naturaleza',
    pistas: ['Arbol espinudo del llano', 'Resiste la sequia extrema', 'Sus ramas dan sombra escasa'],
  },
  {
    palabra: 'Frailejón',
    categoria: 'Naturaleza',
    pistas: ['Planta característica de los páramos', 'Sus hojas parecen aterciopeladas', 'Ayuda a conservar el agua'],
  },
  {
    palabra: 'Cambur',
    categoria: 'Naturaleza',
    pistas: ['Banana pequena y dulce', 'Mas pequeno que el platano', 'Fruta de todos los dias'],
  },
  {
    palabra: 'Lechosa',
    categoria: 'Naturaleza',
    pistas: ['Fruta tropical grande y dulce', 'Naranja por dentro, verde por fuera', 'Se come en desayunos y batidas'],
  },
  {
    palabra: 'Parchita',
    categoria: 'Naturaleza',
    pistas: ['Fruta acida y aromatica', 'Amarilla o morada por fuera', 'Jugo refrescante de verano'],
  },
  {
    palabra: 'Chigüire',
    categoria: 'Naturaleza',
    pistas: ['El roedor más grande del mundo', 'Vive cerca del agua', 'Es común en los Llanos'],
  },
  {
    palabra: 'Guacamaya',
    categoria: 'Naturaleza',
    pistas: ['Ave de colores intensos', 'Se ve en ciudades y bosques', 'Tiene pico curvo'],
  },
  {
    palabra: 'Cacao',
    categoria: 'Naturaleza',
    pistas: ['Semilla de la que nace el chocolate', 'Venezuela produce el mejor del mundo', 'Fruto ovalado de arbol tropical'],
  },
  {
    palabra: 'Oso Frontino',
    categoria: 'Naturaleza',
    pistas: ['Único oso de Sudamérica', 'Tiene marcas claras alrededor de los ojos', 'Habita en los Andes'],
  },
  {
    palabra: 'Merey',
    categoria: 'Naturaleza',
    pistas: ['Fruto tropical con semilla afuera', 'La semilla se tuesta y se come', 'Crece en arboles grandes'],
  },

  // ── Música y Tradición (10) ──
  {
    palabra: 'Joropo',
    categoria: 'Música y Tradición',
    pistas: ['Musica y baile nacional', 'Ritmo rapido con cuatro y arpa', 'Se baila zapateado'],
  },
  {
    palabra: 'Tambores de San Juan',
    categoria: 'Música y Tradición',
    pistas: ['Celebración con música y baile', 'Se realiza en junio', 'Es una tradición afrovenezolana viva'],
  },
  {
    palabra: 'Cuatro',
    categoria: 'Música y Tradición',
    pistas: ['Guitarra pequena de cuatro cuerdas', 'Instrumento nacional por excelencia', 'Acompana el joropo y la tonada'],
  },
  {
    palabra: 'Maracas',
    categoria: 'Música y Tradición',
    pistas: ['Sonajas hechas de tapara', 'Se agitan al ritmo de la musica', 'Dan el sonido caracteristico del joropo'],
  },
  {
    palabra: 'Calipso de El Callao',
    categoria: 'Música y Tradición',
    pistas: ['Música y baile del estado Bolívar', 'Suena especialmente en Carnaval', 'Tiene raíces afrocaribeñas'],
  },
  {
    palabra: 'Alma Llanera',
    categoria: 'Música y Tradición',
    pistas: ['Canción emblemática venezolana', 'Habla de los paisajes del llano', 'Se interpreta con orgullo nacional'],
  },
  {
    palabra: 'Gaita',
    categoria: 'Música y Tradición',
    pistas: ['Música navideña zuliana', 'Tambora, furro y charrasca', 'Diciembre no es igual sin ella'],
  },
  {
    palabra: 'Tonada',
    categoria: 'Música y Tradición',
    pistas: ['Canto llanero melancolico', 'Solo voz y cuatro', 'Canta el vaquero a la orilla del rio'],
  },
  {
    palabra: 'Parranda',
    categoria: 'Música y Tradición',
    pistas: ['Fiesta con musica y baile', 'Celebracion espontanea y ruidosa', 'Aguinaldos y villancicos'],
  },
  {
    palabra: 'Aguinaldo',
    categoria: 'Música y Tradición',
    pistas: ['Villancico venezolano', 'Se canta en diciembre', 'Con cuatro, maracas y voces alegres'],
  },

  // ── Objetos y Vestimenta (10) ──
  {
    palabra: 'Chinchorro',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Hamaca tejida a mano', 'Se cuelga para dormir o descansar', 'Hecho con fibra natural o nylon'],
  },
  {
    palabra: 'Liquiliqui',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Traje tipico masculino', 'Blanco con botones de tejido', 'Se usa en fiestas tradicionales'],
  },
  {
    palabra: 'Alpargatas',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Calzado rustico de suela de goma', 'Los usan los campesinos', 'Comodas y frescas para el campo'],
  },
  {
    palabra: 'Cholas',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Calzado abierto y cómodo', 'Se usa en casa o en la playa', 'Tiene una tira sobre el pie'],
  },
  {
    palabra: 'Totuma',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Recipiente hecho de tapara', 'Fruto seco que sirve de taza', 'Ancestral y ecologica'],
  },
  {
    palabra: 'Curiara',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Canoa hecha de un solo tronco', 'Navegación tradicional indígena', 'Se usa en ríos y caños'],
  },
  {
    palabra: 'Sombrero de Cogollo',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Sombrero tejido a mano', 'Tipico del llano venezolano', 'Protege del sol intenso'],
  },
  {
    palabra: 'Pocillo',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Taza pequeña para bebidas calientes', 'Se usa mucho para tomar café', 'Puede ser de cerámica'],
  },
  {
    palabra: 'Budare',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Plancha para cocinar sobre el fuego', 'Se usa para arepas y cachapas', 'Puede ser de barro o metal'],
  },
  {
    palabra: 'Cava',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Recipiente aislante para conservar bebidas', 'Se llena con hielo', 'Acompaña paseos y reuniones'],
  },
];

export const PALABRAS: PalabraVenezolana[] = PALABRAS_BASE.map((palabra) => {
  const palabraClaveImpostor = obtenerPalabraClavePredefinida(palabra.palabra);
  if (!palabraClaveImpostor) {
    throw new Error(`Falta la palabra clave de "${palabra.palabra}".`);
  }
  return { ...palabra, palabraClaveImpostor };
});
