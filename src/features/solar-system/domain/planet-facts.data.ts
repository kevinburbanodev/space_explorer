import type { Planet } from './planet.entity'

/**
 * Orbital/physical facts are static (NASA doesn't expose a "planets" REST endpoint) —
 * the NASA Image and Video Library API is layered on top in infrastructure/ to fetch
 * a real photo per planet.
 */
export const PLANET_FACTS: Omit<Planet, 'imageUrl'>[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    order: 1,
    type: 'Terrestrial',
    diameterKm: 4879,
    distanceFromSunAu: 0.39,
    orbitalPeriodDays: 88,
    moons: 0,
    color: '#b3aca4',
    description:
      'The smallest and innermost planet, Mercury has no atmosphere to retain heat — temperatures swing from 430°C by day to -180°C at night.',
  },
  {
    id: 'venus',
    name: 'Venus',
    order: 2,
    type: 'Terrestrial',
    diameterKm: 12104,
    distanceFromSunAu: 0.72,
    orbitalPeriodDays: 225,
    moons: 0,
    color: '#e6c27a',
    description:
      'Venus is the hottest planet in the solar system thanks to a runaway greenhouse effect, with a surface hot enough to melt lead beneath thick sulfuric-acid clouds.',
  },
  {
    id: 'earth',
    name: 'Earth',
    order: 3,
    type: 'Terrestrial',
    diameterKm: 12742,
    distanceFromSunAu: 1,
    orbitalPeriodDays: 365,
    moons: 1,
    color: '#3d8bff',
    description:
      'Our home — the only known world with liquid surface water and life, protected by a magnetic field and a nitrogen-oxygen atmosphere.',
  },
  {
    id: 'mars',
    name: 'Mars',
    order: 4,
    type: 'Terrestrial',
    diameterKm: 6779,
    distanceFromSunAu: 1.52,
    orbitalPeriodDays: 687,
    moons: 2,
    color: '#c1440e',
    description:
      'The "Red Planet" owes its color to iron oxide dust. It hosts Olympus Mons, the tallest volcano in the solar system, and is the current focus of NASA rover exploration.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    order: 5,
    type: 'Gas giant',
    diameterKm: 139820,
    distanceFromSunAu: 5.2,
    orbitalPeriodDays: 4333,
    moons: 95,
    color: '#d8ae82',
    description:
      'The largest planet by far, Jupiter is a ball of hydrogen and helium with a storm — the Great Red Spot — wider than Earth that has raged for centuries.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    order: 6,
    type: 'Gas giant',
    diameterKm: 116460,
    distanceFromSunAu: 9.58,
    orbitalPeriodDays: 10759,
    moons: 146,
    color: '#e3cf9f',
    description:
      'Famous for its dazzling ring system made of ice and rock, Saturn is the least dense planet — it would float in water if a bathtub were big enough.',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    order: 7,
    type: 'Ice giant',
    diameterKm: 50724,
    distanceFromSunAu: 19.18,
    orbitalPeriodDays: 30687,
    moons: 28,
    color: '#9fe3e0',
    description:
      'Uranus rotates on its side, likely from an ancient collision, giving it extreme seasons that each last roughly 21 years.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    order: 8,
    type: 'Ice giant',
    diameterKm: 49244,
    distanceFromSunAu: 30.07,
    orbitalPeriodDays: 60190,
    moons: 16,
    color: '#4d6bff',
    description:
      'The most distant planet has the fastest winds in the solar system, clocked at over 2,000 km/h, and was the first predicted by math before it was ever observed.',
  },
]
