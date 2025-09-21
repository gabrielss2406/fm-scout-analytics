import { create } from 'zustand';

export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  club: string;
  overall: number;
  potential: number;
  value: string;
  moneyballScore: number;
  attributes: {
    pace: number;
    shooting: number;
    passing: number;
    defending: number;
    physical: number;
    technical: number;
    mental: number;
  };
}

interface PlayerStore {
  players: Player[];
  selectedPlayers: string[];
  filters: {
    position: string;
    ageMin: number;
    ageMax: number;
    overallMin: number;
    scoreMin: number;
  };
  searchTerm: string;
  setPlayers: (players: Player[]) => void;
  setSelectedPlayers: (ids: string[]) => void;
  setFilters: (filters: Partial<PlayerStore['filters']>) => void;
  setSearchTerm: (term: string) => void;
  getFilteredPlayers: () => Player[];
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  players: [],
  selectedPlayers: [],
  filters: {
    position: 'all',
    ageMin: 16,
    ageMax: 40,
    overallMin: 50,
    scoreMin: 0,
  },
  searchTerm: '',
  
  setPlayers: (players) => set({ players }),
  setSelectedPlayers: (ids) => set({ selectedPlayers: ids }),
  setFilters: (newFilters) => set(state => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  getFilteredPlayers: () => {
    const { players, filters, searchTerm } = get();
    return players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.club.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = filters.position === 'all' || player.position === filters.position;
      const matchesAge = player.age >= filters.ageMin && player.age <= filters.ageMax;
      const matchesOverall = player.overall >= filters.overallMin;
      const matchesScore = player.moneyballScore >= filters.scoreMin;
      
      return matchesSearch && matchesPosition && matchesAge && matchesOverall && matchesScore;
    });
  },
}));