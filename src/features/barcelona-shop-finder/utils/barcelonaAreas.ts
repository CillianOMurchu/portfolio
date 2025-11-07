import type { BarcelonaArea } from '../types';

export const BARCELONA_AREAS: BarcelonaArea[] = [
  // Ciutat Vella District
  {
    id: 'gothic-quarter',
    name: 'Gothic Quarter (Barri Gòtic)',
    district: 'Ciutat Vella',
    coordinates: { lat: 41.3828, lng: 2.1764 },
    searchTerms: ['Gothic Quarter', 'Barri Gòtic', 'Barrio Gótico']
  },
  {
    id: 'el-raval',
    name: 'El Raval',
    district: 'Ciutat Vella',
    coordinates: { lat: 41.3794, lng: 2.1666 },
    searchTerms: ['El Raval', 'Raval']
  },
  {
    id: 'barceloneta',
    name: 'Barceloneta',
    district: 'Ciutat Vella',
    coordinates: { lat: 41.3755, lng: 2.1902 },
    searchTerms: ['Barceloneta', 'La Barceloneta']
  },
  {
    id: 'sant-pere',
    name: 'Sant Pere, Santa Caterina i la Ribera',
    district: 'Ciutat Vella',
    coordinates: { lat: 41.3849, lng: 2.1812 },
    searchTerms: ['Sant Pere', 'Santa Caterina', 'La Ribera', 'Born']
  },

  // Eixample District
  {
    id: 'eixample-left',
    name: 'Eixample Left (Esquerra)',
    district: 'Eixample',
    coordinates: { lat: 41.3874, lng: 2.1580 },
    searchTerms: ['Eixample Esquerra', 'Left Eixample', 'Eixample Izquierdo']
  },
  {
    id: 'eixample-right',
    name: 'Eixample Right (Dreta)',
    district: 'Eixample',
    coordinates: { lat: 41.3937, lng: 2.1682 },
    searchTerms: ['Eixample Dreta', 'Right Eixample', 'Eixample Derecho']
  },
  {
    id: 'sagrada-familia',
    name: 'Sagrada Família',
    district: 'Eixample',
    coordinates: { lat: 41.4036, lng: 2.1744 },
    searchTerms: ['Sagrada Família', 'Sagrada Familia']
  },

  // Gràcia District
  {
    id: 'gracia',
    name: 'Gràcia',
    district: 'Gràcia',
    coordinates: { lat: 41.4033, lng: 2.1585 },
    searchTerms: ['Gràcia', 'Gracia', 'Vila de Gràcia']
  },
  {
    id: 'camp-den-grassot',
    name: 'Camp d\'en Grassot i Gràcia Nova',
    district: 'Gràcia',
    coordinates: { lat: 41.4096, lng: 2.1626 },
    searchTerms: ['Camp d\'en Grassot', 'Gràcia Nova']
  },

  // Sants-Montjuïc District
  {
    id: 'sants',
    name: 'Sants',
    district: 'Sants-Montjuïc',
    coordinates: { lat: 41.3793, lng: 2.1402 },
    searchTerms: ['Sants']
  },
  {
    id: 'poble-sec',
    name: 'Poble Sec',
    district: 'Sants-Montjuïc',
    coordinates: { lat: 41.3727, lng: 2.1659 },
    searchTerms: ['Poble Sec', 'Pueblo Seco']
  },
  {
    id: 'montjuic',
    name: 'Montjuïc',
    district: 'Sants-Montjuïc',
    coordinates: { lat: 41.3644, lng: 2.1561 },
    searchTerms: ['Montjuïc', 'Montjuic']
  },

  // Les Corts District
  {
    id: 'les-corts',
    name: 'Les Corts',
    district: 'Les Corts',
    coordinates: { lat: 41.3869, lng: 2.1267 },
    searchTerms: ['Les Corts', 'Las Corts']
  },
  {
    id: 'pedralbes',
    name: 'Pedralbes',
    district: 'Les Corts',
    coordinates: { lat: 41.3954, lng: 2.1089 },
    searchTerms: ['Pedralbes']
  },

  // Sarrià-Sant Gervasi District
  {
    id: 'sarria',
    name: 'Sarrià',
    district: 'Sarrià-Sant Gervasi',
    coordinates: { lat: 41.4007, lng: 2.1186 },
    searchTerms: ['Sarrià', 'Sarria']
  },
  {
    id: 'sant-gervasi',
    name: 'Sant Gervasi',
    district: 'Sarrià-Sant Gervasi',
    coordinates: { lat: 41.4031, lng: 2.1389 },
    searchTerms: ['Sant Gervasi', 'San Gervasio']
  },
  {
    id: 'tres-torres',
    name: 'Les Tres Torres',
    district: 'Sarrià-Sant Gervasi',
    coordinates: { lat: 41.4065, lng: 2.1258 },
    searchTerms: ['Les Tres Torres', 'Tres Torres']
  },

  // Horta-Guinardó District
  {
    id: 'horta',
    name: 'Horta',
    district: 'Horta-Guinardó',
    coordinates: { lat: 41.4217, lng: 2.1631 },
    searchTerms: ['Horta']
  },
  {
    id: 'park-guell',
    name: 'El Carmel (Park Güell Area)',
    district: 'Horta-Guinardó',
    coordinates: { lat: 41.4145, lng: 2.1527 },
    searchTerms: ['El Carmel', 'Park Güell', 'Parque Güell']
  },

  // Nou Barris District
  {
    id: 'nou-barris',
    name: 'Nou Barris',
    district: 'Nou Barris',
    coordinates: { lat: 41.4456, lng: 2.1774 },
    searchTerms: ['Nou Barris', 'Nuevos Barrios']
  },

  // Sant Andreu District
  {
    id: 'sant-andreu',
    name: 'Sant Andreu',
    district: 'Sant Andreu',
    coordinates: { lat: 41.4350, lng: 2.1891 },
    searchTerms: ['Sant Andreu', 'San Andrés']
  },

  // Sant Martí District
  {
    id: 'poble-nou',
    name: 'Poble Nou',
    district: 'Sant Martí',
    coordinates: { lat: 41.4036, lng: 2.2017 },
    searchTerms: ['Poble Nou', 'Pueblo Nuevo', 'Poblenou']
  },
  {
    id: 'diagonal-mar',
    name: 'Diagonal Mar',
    district: 'Sant Martí',
    coordinates: { lat: 41.4097, lng: 2.2167 },
    searchTerms: ['Diagonal Mar']
  },
  {
    id: 'villa-olimpica',
    name: 'Vila Olímpica',
    district: 'Sant Martí',
    coordinates: { lat: 41.3895, lng: 2.1972 },
    searchTerms: ['Vila Olímpica', 'Villa Olímpica', 'Olympic Village']
  },

  // Extra Fun Areas! 🎉
  {
    id: 'tibidabo',
    name: 'Tibidabo',
    district: 'Sarrià-Sant Gervasi',
    coordinates: { lat: 41.4235, lng: 2.1196 },
    searchTerms: ['Tibidabo', 'Mount Tibidabo']
  },
  {
    id: 'badalona-border',
    name: 'Badalona Border Area',
    district: 'Sant Andreu',
    coordinates: { lat: 41.4500, lng: 2.2100 },
    searchTerms: ['Badalona Border', 'Near Badalona']
  },
  {
    id: 'zona-franca',
    name: 'Zona Franca',
    district: 'Sants-Montjuïc',
    coordinates: { lat: 41.3500, lng: 2.1200 },
    searchTerms: ['Zona Franca', 'Free Zone']
  },
  {
    id: 'valldaura',
    name: 'Vall d\'Hebron',
    district: 'Horta-Guinardó',
    coordinates: { lat: 41.4280, lng: 2.1460 },
    searchTerms: ['Vall d\'Hebron', 'Valle de Hebrón']
  },
  {
    id: 'camp-nou-area',
    name: 'Camp Nou Area',
    district: 'Les Corts',
    coordinates: { lat: 41.3809, lng: 2.1228 },
    searchTerms: ['Camp Nou', 'Stadium Area', 'FC Barcelona']
  },
  {
    id: 'bunkers-carmel',
    name: 'Bunkers del Carmel',
    district: 'Horta-Guinardó',
    coordinates: { lat: 41.4169, lng: 2.1566 },
    searchTerms: ['Bunkers del Carmel', 'Bunkers', 'Turó de la Rovira']
  },
  {
    id: 'ciutadella',
    name: 'Ciutadella Park Area',
    district: 'Ciutat Vella',
    coordinates: { lat: 41.3888, lng: 2.1855 },
    searchTerms: ['Ciutadella', 'Parc de la Ciutadella', 'Park Ciutadella']
  },
  {
    id: 'hospital-sant-pau',
    name: 'Hospital Sant Pau Area',
    district: 'Eixample',
    coordinates: { lat: 41.4145, lng: 2.1744 },
    searchTerms: ['Hospital Sant Pau', 'Sant Pau', 'Modernist Site']
  },
  {
    id: 'torre-agbar',
    name: 'Torre Agbar Area',
    district: 'Sant Martí',
    coordinates: { lat: 41.4036, lng: 2.1894 },
    searchTerms: ['Torre Agbar', 'Agbar Tower', 'Glòries']
  }
];

export const getAreaById = (id: string): BarcelonaArea | undefined => {
  return BARCELONA_AREAS.find(area => area.id === id);
};

export const getAreasByDistrict = (district: string): BarcelonaArea[] => {
  return BARCELONA_AREAS.filter(area => area.district === district);
};

export const getAllDistricts = (): string[] => {
  return Array.from(new Set(BARCELONA_AREAS.map(area => area.district))).sort();
};

export const searchAreas = (searchTerm: string): BarcelonaArea[] => {
  const lowercaseSearch = searchTerm.toLowerCase();
  return BARCELONA_AREAS.filter(area => 
    area.name.toLowerCase().includes(lowercaseSearch) ||
    area.district.toLowerCase().includes(lowercaseSearch) ||
    area.searchTerms.some(term => term.toLowerCase().includes(lowercaseSearch))
  );
};