export type Lang = 'en' | 'es'

export interface Dictionary {
  nav: {
    home: string
    apod: string
    solarSystem: string
    marsRover: string
    neo: string
    epic: string
    donki: string
    eonet: string
  }
  home: {
    eyebrow: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    statusBar: { signalLive: string; apod: string; neoTracked: string; roversOnline: string }
    apodPreviewLabel: string
    openFeed: string
    modulesHeading: string
    modulesTag: string
    cards: {
      solarSystem: { title: string; description: string; tag: string }
      apod: { title: string; tag: string }
      marsRover: { title: string; tag: string }
      neo: { title: string; description: string; tag: string }
      epic: { title: string; tag: string }
      donki: { title: string; tag: string }
      eonet: { title: string; tag: string }
    }
  }
  apod: {
    eyebrow: string
    title: string
    loading: string
    surpriseMe: string
    viewFullResolution: string
    mediaImage: string
    mediaVideo: string
  }
  solarSystem: {
    eyebrow: string
    title: string
    subtitle: string
    loading: string
    imageLabelSuffix: string
    stats: {
      diameter: string
      distance: string
      orbitalPeriod: string
      moons: string
    }
    units: {
      km: string
      millionKm: string
      earthYears: string
      earthDays: string
      satellite: string
      satellites: string
    }
    planetNames: Record<string, string>
    descriptions: Record<string, string>
  }
  marsRover: {
    eyebrow: string
    title: string
    active: string
    complete: string
    earthDate: string
    allCameras: string
    loading: string
    empty: string
    frames: (count: number) => string
  }
  neo: {
    eyebrow: string
    title: string
    subtitle: string
    loading: string
    empty: string
    hazardous: string
    safePass: string
    hazardBadge: string
    diameter: string
    missDistance: string
    velocity: string
  }
  epic: {
    eyebrow: string
    title: string
    subtitle: string
    loading: string
    empty: string
  }
  donki: {
    eyebrow: string
    title: string
    subtitle: string
    loading: string
    empty: string
    all: string
    flares: string
    cmes: string
    storms: string
  }
  eonet: {
    eyebrow: string
    title: string
    subtitle: string
    loading: string
    empty: string
  }
  common: {
    signalLost: string
    retryTransmission: string
  }
}

const en: Dictionary = {
  nav: {
    home: 'Home',
    apod: 'Picture of the Day',
    solarSystem: 'Solar System',
    marsRover: 'Mars Rovers',
    neo: 'Near-Earth',
    epic: 'Earth',
    donki: 'Space Weather',
    eonet: 'Natural Events',
  },
  home: {
    eyebrow: 'NASA OPEN DATA',
    title: 'Explore the universe, one API call at a time',
    subtitle:
      "A portfolio journey through NASA's open datasets — daily cosmic photography, planetary telemetry, Martian panoramas and the rocks whistling past our doorstep.",
    ctaPrimary: 'Start exploring →',
    ctaSecondary: 'Tour the planets',
    statusBar: {
      signalLive: 'SIGNAL LIVE',
      apod: 'APOD',
      neoTracked: 'NEO TRACKED',
      roversOnline: 'ROVERS ONLINE',
    },
    apodPreviewLabel: 'PICTURE OF THE DAY',
    openFeed: 'open feed →',
    modulesHeading: 'Seven ways in',
    modulesTag: '07 MODULES',
    cards: {
      solarSystem: {
        title: 'Solar System',
        description: 'Orbit the Sun and pull live telemetry on all eight planets — diameter, distance, period, moons.',
        tag: 'ORBITS →',
      },
      apod: { title: 'Picture of the Day', tag: 'APOD →' },
      marsRover: { title: 'Mars Rovers', tag: 'ROVERS →' },
      neo: {
        title: 'Near-Earth Objects',
        description: "Track today's close approaches on a live radar.",
        tag: 'RADAR →',
      },
      epic: { title: 'Earth from Space', tag: 'EARTH →' },
      donki: { title: 'Space Weather', tag: 'WEATHER →' },
      eonet: { title: 'Natural Events', tag: 'EVENTS →' },
    },
  },
  apod: {
    eyebrow: 'APOD',
    title: 'Astronomy Picture of the Day',
    loading: 'Contacting NASA archive...',
    surpriseMe: '🎲 Surprise me',
    viewFullResolution: '↗ View full resolution',
    mediaImage: '🖼 IMAGE',
    mediaVideo: '▶ VIDEO',
  },
  solarSystem: {
    eyebrow: 'ORBITAL MAP',
    title: 'The Solar System',
    subtitle: 'Tap a planet to inspect its telemetry.',
    loading: 'Charting orbits...',
    imageLabelSuffix: '· NASA',
    stats: {
      diameter: 'Diameter',
      distance: 'Distance from Sun',
      orbitalPeriod: 'Orbital period',
      moons: 'Moons',
    },
    units: {
      km: 'km',
      millionKm: 'million km',
      earthYears: 'earth years',
      earthDays: 'earth days',
      satellite: 'satellite',
      satellites: 'satellites',
    },
    planetNames: {
      mercury: 'Mercury',
      venus: 'Venus',
      earth: 'Earth',
      mars: 'Mars',
      jupiter: 'Jupiter',
      saturn: 'Saturn',
      uranus: 'Uranus',
      neptune: 'Neptune',
    },
    descriptions: {
      mercury:
        'The smallest and innermost planet, Mercury has no atmosphere to retain heat — temperatures swing from 430°C by day to -180°C at night.',
      venus:
        'Venus is the hottest planet in the solar system thanks to a runaway greenhouse effect, with a surface hot enough to melt lead beneath thick sulfuric-acid clouds.',
      earth:
        'Our home — the only known world with liquid surface water and life, protected by a magnetic field and a nitrogen-oxygen atmosphere.',
      mars: 'The "Red Planet" owes its color to iron oxide dust. It hosts Olympus Mons, the tallest volcano in the solar system, and is the current focus of NASA rover exploration.',
      jupiter:
        'The largest planet by far, Jupiter is a ball of hydrogen and helium with a storm — the Great Red Spot — wider than Earth that has raged for centuries.',
      saturn:
        'Famous for its dazzling ring system made of ice and rock, Saturn is the least dense planet — it would float in water if a bathtub were big enough.',
      uranus:
        'Uranus rotates on its side, likely from an ancient collision, giving it extreme seasons that each last roughly 21 years.',
      neptune:
        'The most distant planet has the fastest winds in the solar system, clocked at over 2,000 km/h, and was the first predicted by math before it was ever observed.',
    },
  },
  marsRover: {
    eyebrow: 'SURFACE OPS',
    title: 'Mars Rover Photos',
    active: 'ACTIVE',
    complete: 'COMPLETE',
    earthDate: 'EARTH DATE',
    allCameras: 'ALL',
    loading: 'Downlinking imagery...',
    empty: 'No photos for this date/camera combination — try another Earth date.',
    frames: (count) => `${count} FRAMES`,
  },
  neo: {
    eyebrow: 'CLOSE APPROACH',
    title: 'Near-Earth Objects',
    subtitle: 'Every asteroid tracked making a close approach on a given day, closest first.',
    loading: 'Scanning near-Earth space...',
    empty: 'No tracked objects for this date.',
    hazardous: 'Hazardous',
    safePass: 'Safe pass',
    hazardBadge: 'HAZARD',
    diameter: 'Diameter',
    missDistance: 'Miss dist',
    velocity: 'Velocity',
  },
  epic: {
    eyebrow: 'DSCOVR · EPIC',
    title: 'Earth from a Million Miles Away',
    subtitle: "Full-disk photos of Earth captured daily by NASA's EPIC camera aboard the DSCOVR satellite.",
    loading: 'Downloading Earth imagery...',
    empty: 'No imagery available for this date.',
  },
  donki: {
    eyebrow: 'SPACE WEATHER',
    title: 'Solar Activity',
    subtitle: 'Solar flares, coronal mass ejections and geomagnetic storms from the last 30 days.',
    loading: 'Reading solar telemetry...',
    empty: 'No space weather events in this window.',
    all: 'All',
    flares: 'Flares',
    cmes: 'CMEs',
    storms: 'Storms',
  },
  eonet: {
    eyebrow: 'EARTH OBSERVATORY',
    title: 'Natural Events',
    subtitle: 'Wildfires, storms, volcanoes and other events currently tracked on Earth.',
    loading: 'Loading active events...',
    empty: 'No open events right now.',
  },
  common: {
    signalLost: 'Signal lost. The request to NASA failed.',
    retryTransmission: 'Retry transmission',
  },
}

const es: Dictionary = {
  nav: {
    home: 'Inicio',
    apod: 'Foto del Día',
    solarSystem: 'Sistema Solar',
    marsRover: 'Róvers de Marte',
    neo: 'Cercanos a la Tierra',
    epic: 'Tierra',
    donki: 'Clima Espacial',
    eonet: 'Eventos Naturales',
  },
  home: {
    eyebrow: 'DATOS ABIERTOS DE LA NASA',
    title: 'Explora el universo, una llamada a la API a la vez',
    subtitle:
      'Un recorrido de portafolio por los conjuntos de datos abiertos de la NASA — fotografía cósmica diaria, telemetría planetaria, panoramas marcianos y las rocas que pasan silbando junto a nuestra puerta.',
    ctaPrimary: 'Empezar a explorar →',
    ctaSecondary: 'Recorrer los planetas',
    statusBar: {
      signalLive: 'SEÑAL EN VIVO',
      apod: 'APOD',
      neoTracked: 'NEO RASTREADOS',
      roversOnline: 'RÓVERS EN LÍNEA',
    },
    apodPreviewLabel: 'FOTO DEL DÍA',
    openFeed: 'abrir feed →',
    modulesHeading: 'Siete maneras de entrar',
    modulesTag: '07 MÓDULOS',
    cards: {
      solarSystem: {
        title: 'Sistema Solar',
        description: 'Orbita el Sol y consulta telemetría en vivo de los ocho planetas — diámetro, distancia, período, lunas.',
        tag: 'ÓRBITAS →',
      },
      apod: { title: 'Foto del Día', tag: 'APOD →' },
      marsRover: { title: 'Róvers de Marte', tag: 'RÓVERS →' },
      neo: {
        title: 'Objetos Cercanos a la Tierra',
        description: 'Rastrea los acercamientos de hoy en un radar en vivo.',
        tag: 'RADAR →',
      },
      epic: { title: 'La Tierra desde el Espacio', tag: 'TIERRA →' },
      donki: { title: 'Clima Espacial', tag: 'CLIMA →' },
      eonet: { title: 'Eventos Naturales', tag: 'EVENTOS →' },
    },
  },
  apod: {
    eyebrow: 'APOD',
    title: 'Foto Astronómica del Día',
    loading: 'Contactando el archivo de la NASA...',
    surpriseMe: '🎲 Sorpréndeme',
    viewFullResolution: '↗ Ver en resolución completa',
    mediaImage: '🖼 IMAGEN',
    mediaVideo: '▶ VIDEO',
  },
  solarSystem: {
    eyebrow: 'MAPA ORBITAL',
    title: 'El Sistema Solar',
    subtitle: 'Toca un planeta para inspeccionar su telemetría.',
    loading: 'Trazando órbitas...',
    imageLabelSuffix: '· NASA',
    stats: {
      diameter: 'Diámetro',
      distance: 'Distancia al Sol',
      orbitalPeriod: 'Período orbital',
      moons: 'Lunas',
    },
    units: {
      km: 'km',
      millionKm: 'millones de km',
      earthYears: 'años terrestres',
      earthDays: 'días terrestres',
      satellite: 'satélite',
      satellites: 'satélites',
    },
    planetNames: {
      mercury: 'Mercurio',
      venus: 'Venus',
      earth: 'Tierra',
      mars: 'Marte',
      jupiter: 'Júpiter',
      saturn: 'Saturno',
      uranus: 'Urano',
      neptune: 'Neptuno',
    },
    descriptions: {
      mercury:
        'El planeta más pequeño e interior del sistema solar. Mercurio no tiene atmósfera que retenga el calor — la temperatura varía entre 430°C de día y -180°C de noche.',
      venus:
        'Venus es el planeta más caliente del sistema solar gracias a un efecto invernadero descontrolado, con una superficie lo bastante caliente para derretir plomo bajo espesas nubes de ácido sulfúrico.',
      earth:
        'Nuestro hogar — el único mundo conocido con agua líquida en la superficie y vida, protegido por un campo magnético y una atmósfera de nitrógeno y oxígeno.',
      mars: 'El "Planeta Rojo" debe su color al óxido de hierro. Alberga el Monte Olimpo, el volcán más alto del sistema solar, y es el foco actual de la exploración con róvers de la NASA.',
      jupiter:
        'El planeta más grande por lejos, Júpiter es una bola de hidrógeno y helio con una tormenta — la Gran Mancha Roja — más ancha que la Tierra, que ha durado siglos.',
      saturn:
        'Famoso por su deslumbrante sistema de anillos de hielo y roca, Saturno es el planeta menos denso — flotaría en el agua si hubiera una bañera lo bastante grande.',
      uranus:
        'Urano rota de costado, probablemente por una colisión antigua, lo que le da estaciones extremas que duran cada una unos 21 años.',
      neptune:
        'El planeta más distante tiene los vientos más rápidos del sistema solar, superando los 2.000 km/h, y fue el primero predicho matemáticamente antes de ser observado.',
    },
  },
  marsRover: {
    eyebrow: 'OPERACIONES DE SUPERFICIE',
    title: 'Fotos del Róver de Marte',
    active: 'ACTIVO',
    complete: 'COMPLETADO',
    earthDate: 'FECHA TERRESTRE',
    allCameras: 'TODAS',
    loading: 'Descargando imágenes...',
    empty: 'No hay fotos para esta combinación de fecha/cámara — prueba con otra fecha terrestre.',
    frames: (count) => `${count} IMÁGENES`,
  },
  neo: {
    eyebrow: 'ACERCAMIENTO CERCANO',
    title: 'Objetos Cercanos a la Tierra',
    subtitle: 'Todos los asteroides que se acercan a la Tierra en una fecha dada, ordenados por cercanía.',
    loading: 'Escaneando el espacio cercano...',
    empty: 'No hay objetos rastreados para esta fecha.',
    hazardous: 'Peligroso',
    safePass: 'Paso seguro',
    hazardBadge: 'PELIGRO',
    diameter: 'Diámetro',
    missDistance: 'Distancia',
    velocity: 'Velocidad',
  },
  epic: {
    eyebrow: 'DSCOVR · EPIC',
    title: 'La Tierra a un Millón de Millas',
    subtitle: 'Fotos de la Tierra completa capturadas a diario por la cámara EPIC de la NASA a bordo del satélite DSCOVR.',
    loading: 'Descargando imágenes de la Tierra...',
    empty: 'No hay imágenes disponibles para esta fecha.',
  },
  donki: {
    eyebrow: 'CLIMA ESPACIAL',
    title: 'Actividad Solar',
    subtitle: 'Erupciones solares, eyecciones de masa coronal y tormentas geomagnéticas de los últimos 30 días.',
    loading: 'Leyendo telemetría solar...',
    empty: 'No hay eventos de clima espacial en esta ventana.',
    all: 'Todos',
    flares: 'Erupciones',
    cmes: 'CMEs',
    storms: 'Tormentas',
  },
  eonet: {
    eyebrow: 'OBSERVATORIO TERRESTRE',
    title: 'Eventos Naturales',
    subtitle: 'Incendios, tormentas, volcanes y otros eventos rastreados actualmente en la Tierra.',
    loading: 'Cargando eventos activos...',
    empty: 'No hay eventos abiertos en este momento.',
  },
  common: {
    signalLost: 'Señal perdida. La solicitud a la NASA falló.',
    retryTransmission: 'Reintentar transmisión',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { en, es }
