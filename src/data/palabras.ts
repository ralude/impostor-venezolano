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
  'Musica y Tradicion',
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
    palabra: 'Pabellon Criollo',
    categoria: 'Comida y Bebida',
    pistas: ['Plato nacional por excelencia', 'Lleva caraotas negras', 'Arroz, carne mechada y tajadas'],
  },
  {
    palabra: 'Tequeno',
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
    palabra: 'Papelon',
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
    palabra: 'Chupe',
    categoria: 'Comida y Bebida',
    pistas: ['Sopa cremosa y abundante', 'De gallina o de pescado', 'Tiene papas, queso y huevo'],
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
    palabra: 'Bienmesabe',
    categoria: 'Comida y Bebida',
    pistas: ['Postre cremoso de coco', 'Su nombre ya dice que sabe bien', 'Tipico de la region central'],
  },
  {
    palabra: 'Conserva de Coco',
    categoria: 'Comida y Bebida',
    pistas: ['Dulce rallado y cocido con papelon', 'Se vende en las playas', 'Dulzor intenso y tropical'],
  },
  {
    palabra: 'Chicharron',
    categoria: 'Comida y Bebida',
    pistas: ['Piel de cerdo frita y crujiente', 'Se vende en bolsitas en la calle', 'Crujido que se oye a lo lejos'],
  },
  {
    palabra: 'Butifarra',
    categoria: 'Comida y Bebida',
    pistas: ['Embutido de carne de res o cerdo', 'Tipico de Barlovento', 'Se guisa o se asa a la parrilla'],
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
    palabra: 'Chevere',
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
    palabra: 'Bululu',
    categoria: 'Expresiones',
    pistas: ['Multitud o mucha gente junta', 'Caos de personas', 'Cuando el concierto esta full'],
  },
  {
    palabra: 'Arrecho',
    categoria: 'Expresiones',
    pistas: ['Molesto, enojado o sorprendente', 'Palabra de doble sentido', 'La usan en toda Venezuela'],
  },
  {
    palabra: 'Fino',
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
    palabra: 'Musiu',
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
    palabra: 'Buscon',
    categoria: 'Expresiones',
    pistas: ['Persona que busca aprovecharse', 'Oportunista por naturaleza', 'Siempre esta al acecho'],
  },
  {
    palabra: 'Pillo',
    categoria: 'Expresiones',
    pistas: ['Astuto o tramposo', 'Se sale con la suya', 'Puede ser jugueton o delincuente'],
  },
  {
    palabra: 'Vivo',
    categoria: 'Expresiones',
    pistas: ['Listo e inteligente', 'No se deja enganar', 'Ve las cosas antes que otros'],
  },
  {
    palabra: 'Chivo',
    categoria: 'Expresiones',
    pistas: ['Persona que delata a otros', 'Soplón en el barrio', 'Nadie le confia secretos'],
  },
  {
    palabra: 'Guaro',
    categoria: 'Expresiones',
    pistas: ['Persona del estado Lara', 'Gentilicio regional orgulloso', 'Tierra de musica y folklore'],
  },

  // ── Lugares (15) ──
  {
    palabra: 'Tepuy',
    categoria: 'Lugares',
    pistas: ['Montana de cima plana', 'Millones de anos de antiguedad', 'El mas famoso es el Roraima'],
  },
  {
    palabra: 'Sabana',
    categoria: 'Lugares',
    pistas: ['Llanura extensa con pocos arboles', 'Pastizal abierto bajo el sol', 'Dominante en Los Llanos'],
  },
  {
    palabra: 'Morichal',
    categoria: 'Lugares',
    pistas: ['Cano o arroyo rodeado de moriches', 'Vegetacion densa y humeda', 'Refugio de fauna en Los Llanos'],
  },
  {
    palabra: 'Llanos',
    categoria: 'Lugares',
    pistas: ['Extension plana interminable', 'Tierra de ganado y vaqueros', 'El horizonte se pierde de vista'],
  },
  {
    palabra: 'Medanos',
    categoria: 'Lugares',
    pistas: ['Dunas de arena en la costa', 'Arena movida por el viento', 'Paisaje desertico frente al mar'],
  },
  {
    palabra: 'Cano',
    categoria: 'Lugares',
    pistas: ['Brazo de rio o canal natural', 'Agua dulce entre la vegetacion', 'Se navega en curiara'],
  },
  {
    palabra: 'Paramo',
    categoria: 'Lugares',
    pistas: ['Zona fria de alta montana', 'Vegetacion rala y frailejones', 'Niebla y frio constante'],
  },
  {
    palabra: 'Salto',
    categoria: 'Lugares',
    pistas: ['Cascada o caida de agua', 'El mas alto del mundo esta aqui', 'Agua cayendo desde la altura'],
  },
  {
    palabra: 'Selva',
    categoria: 'Lugares',
    pistas: ['Bosque tropical denso', 'Amazonia venezolana', 'Arboles gigantes y rios caudalosos'],
  },
  {
    palabra: 'Cerro',
    categoria: 'Lugares',
    pistas: ['Elevacion menor que una montana', 'Colina rocosa o con vegetacion', 'Se sube a pie o en bicicleta'],
  },
  {
    palabra: 'Playa',
    categoria: 'Lugares',
    pistas: ['Arena y mar en la costa', 'Destino favorito del fin de semana', 'Sol, sal y brisa marina'],
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
    palabra: 'Cordillera',
    categoria: 'Lugares',
    pistas: ['Cadena de montanas', 'Los Andes venezolanos', 'Nieve perpetua en los picos altos'],
  },
  {
    palabra: 'Delta',
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
    palabra: 'Ceiba',
    categoria: 'Naturaleza',
    pistas: ['Árbol gigante y sagrado', 'Crece en regiones tropicales', 'Su tronco es grueso y majestuoso'],
  },
  {
    palabra: 'Araguaney',
    categoria: 'Naturaleza',
    pistas: ['Arbol nacional de flores amarillas', 'Florece entre febrero y abril', 'Amarillo intenso que anuncia la lluvia'],
  },
  {
    palabra: 'Saman',
    categoria: 'Naturaleza',
    pistas: ['Arbol de sombra amplia y fresca', 'Sus ramas se extienden como paraguas', 'Refugio perfecto del sol tropical'],
  },
  {
    palabra: 'Cardon',
    categoria: 'Naturaleza',
    pistas: ['Cactus gigante del desierto', 'Resiste climas aridos', 'Formas caprichosas en la peninsula'],
  },
  {
    palabra: 'Cuji',
    categoria: 'Naturaleza',
    pistas: ['Arbol espinudo del llano', 'Resiste la sequia extrema', 'Sus ramas dan sombra escasa'],
  },
  {
    palabra: 'Jobo',
    categoria: 'Naturaleza',
    pistas: ['Fruto pequeno amarillo o rojo', 'Arbol de sombra en el llano', 'Se come crudo o en dulce'],
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
    palabra: 'Coco',
    categoria: 'Naturaleza',
    pistas: ['Fruta de palmera tropical', 'Agua refrescante por dentro', 'Pulpa blanca y fibrosa'],
  },
  {
    palabra: 'Cafe',
    categoria: 'Naturaleza',
    pistas: ['Semilla aromatica de la montana', 'Bebida oscura y energizante', 'El guayoyo es su forma suave'],
  },
  {
    palabra: 'Cacao',
    categoria: 'Naturaleza',
    pistas: ['Semilla de la que nace el chocolate', 'Venezuela produce el mejor del mundo', 'Fruto ovalado de arbol tropical'],
  },
  {
    palabra: 'Yuca',
    categoria: 'Naturaleza',
    pistas: ['Raiz alargada y feculenta', 'Se hierve o se hace casabe', 'Alimento base indigena'],
  },
  {
    palabra: 'Merey',
    categoria: 'Naturaleza',
    pistas: ['Fruto tropical con semilla afuera', 'La semilla se tuesta y se come', 'Crece en arboles grandes'],
  },

  // ── Musica y Tradicion (10) ──
  {
    palabra: 'Joropo',
    categoria: 'Musica y Tradicion',
    pistas: ['Musica y baile nacional', 'Ritmo rapido con cuatro y arpa', 'Se baila zapateado'],
  },
  {
    palabra: 'Tambor',
    categoria: 'Musica y Tradicion',
    pistas: ['Instrumento de percusion ancestral', 'Fiesta de San Juan y Barlovento', 'Ritmo que se siente en el pecho'],
  },
  {
    palabra: 'Cuatro',
    categoria: 'Musica y Tradicion',
    pistas: ['Guitarra pequena de cuatro cuerdas', 'Instrumento nacional por excelencia', 'Acompana el joropo y la tonada'],
  },
  {
    palabra: 'Maracas',
    categoria: 'Musica y Tradicion',
    pistas: ['Sonajas hechas de tapara', 'Se agitan al ritmo de la musica', 'Dan el sonido caracteristico del joropo'],
  },
  {
    palabra: 'Arpa',
    categoria: 'Musica y Tradicion',
    pistas: ['Instrumento de cuerdas grande y triangular', 'Esencial en la musica llanera', 'Se toca sentado con las manos'],
  },
  {
    palabra: 'Fulia',
    categoria: 'Musica y Tradicion',
    pistas: ['Canto tradicional de Barlovento', 'Con tambores y voces', 'Ritmo afrovenezolano antiguo'],
  },
  {
    palabra: 'Gaita',
    categoria: 'Musica y Tradicion',
    pistas: ['Musica navidena zuliana', 'Tambora, furro y charrasca', 'Diciembre no es igual sin ella'],
  },
  {
    palabra: 'Tonada',
    categoria: 'Musica y Tradicion',
    pistas: ['Canto llanero melancolico', 'Solo voz y cuatro', 'Canta el vaquero a la orilla del rio'],
  },
  {
    palabra: 'Parranda',
    categoria: 'Musica y Tradicion',
    pistas: ['Fiesta con musica y baile', 'Celebracion espontanea y ruidosa', 'Aguinaldos y villancicos'],
  },
  {
    palabra: 'Aguinaldo',
    categoria: 'Musica y Tradicion',
    pistas: ['Villancico venezolano', 'Se canta en diciembre', 'Con cuatro, maracas y voces alegres'],
  },

  // ── Objetos y Vestimenta (10) ──
  {
    palabra: 'Chinchorro',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Hamaca tejida a mano', 'Se cuelga para dormir o descansar', 'Hecho con fibra natural o nylon'],
  },
  {
    palabra: 'Liqui Liqui',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Traje tipico masculino', 'Blanco con botones de tejido', 'Se usa en fiestas tradicionales'],
  },
  {
    palabra: 'Alpargatas',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Calzado rustico de suela de goma', 'Los usan los campesinos', 'Comodas y frescas para el campo'],
  },
  {
    palabra: 'Cotiza',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Zapato deportivo informal', 'Calzado urbano de uso diario', 'Los jovenes las usan mucho'],
  },
  {
    palabra: 'Totuma',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Recipiente hecho de tapara', 'Fruto seco que sirve de taza', 'Ancestral y ecologica'],
  },
  {
    palabra: 'Curiara',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Canoa hecha de un solo tronco', 'Navegacion tradicional indigena', 'Se usa en rios y canos'],
  },
  {
    palabra: 'Sombrero de Cogollo',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Sombrero tejido a mano', 'Tipico del llano venezolano', 'Protege del sol intenso'],
  },
  {
    palabra: 'Ruana',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Poncho de lana o tela', 'Abriga en el paramo', 'Se usa en los Andes'],
  },
  {
    palabra: 'Estera',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Tejido plano de fibra natural', 'Se usa como alfombra o asiento', 'Artesania indigena y campesina'],
  },
  {
    palabra: 'Petate',
    categoria: 'Objetos y Vestimenta',
    pistas: ['Estera tejida para dormir', 'Se enrolla para transportar', 'Hecho de palma o fibra vegetal'],
  },
];

export const PALABRAS: PalabraVenezolana[] = PALABRAS_BASE.map((palabra) => {
  const palabraClaveImpostor = obtenerPalabraClavePredefinida(palabra.palabra);
  if (!palabraClaveImpostor) {
    throw new Error(`Falta la palabra clave de "${palabra.palabra}".`);
  }
  return { ...palabra, palabraClaveImpostor };
});
