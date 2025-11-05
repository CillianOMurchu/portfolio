import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ScriptCard from './components/ScriptCard';
import type { ScriptIdea, FilterOptions } from './types';

// Sample data - replace with your actual script ideas
const sampleScripts: ScriptIdea[] = [
  {
    id: '1',
    title: 'The Digital Void',
    description: 'A psychological thriller about a programmer who discovers their reality is a simulation when they find glitches in everyday life.',
    genre: 'Sci-Fi Thriller',
    logline: 'When a software engineer starts noticing impossible glitches in reality, they must decide whether to embrace the truth or fight to maintain their simulated existence.',
    status: 'first-draft',
    dateCreated: '2024-10-15',
    tags: ['Virtual Reality', 'Philosophy', 'Technology']
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    description: 'A time-traveling drama where a historian accidentally changes the past and must navigate the consequences in multiple timelines.',
    genre: 'Drama',
    logline: 'A historian\'s attempt to witness a pivotal moment in history goes wrong, creating ripple effects across multiple timelines that threaten everything they hold dear.',
    status: 'concept',
    dateCreated: '2024-11-01',
    tags: ['Time Travel', 'History', 'Consequences']
  },
  {
    id: '3',
    title: 'The Last Garden',
    description: 'In a post-apocalyptic world, a botanist protects the last seed vault while forming an unlikely alliance with raiders.',
    genre: 'Post-Apocalyptic',
    logline: 'When civilization collapses, a botanist guarding the world\'s last seed vault must choose between isolation and trusting dangerous strangers to rebuild the world.',
    status: 'completed',
    dateCreated: '2024-09-20',
    tags: ['Survival', 'Nature', 'Hope']
  }
];

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    genre: '',
    status: '',
    searchTerm: ''
  });

  const genres = useMemo(() => {
    return Array.from(new Set(sampleScripts.map(script => script.genre)));
  }, []);

  const statuses = useMemo(() => {
    return Array.from(new Set(sampleScripts.map(script => script.status)));
  }, []);

  const filteredScripts = useMemo(() => {
    return sampleScripts.filter(script => {
      const matchesGenre = !filters.genre || script.genre === filters.genre;
      const matchesStatus = !filters.status || script.status === filters.status;
      const matchesSearch = !filters.searchTerm || 
        script.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        script.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        script.logline.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesGenre && matchesStatus && matchesSearch;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Portfolio"
        subtitle="A collection of creative stories and screenplay ideas, from concept to completion."
      />
      
      <main className="section-container py-12">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          genres={genres}
          statuses={statuses}
        />
        
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg text-gray-600">
            {filteredScripts.length} {filteredScripts.length === 1 ? 'script' : 'scripts'} found
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScripts.map((script, index) => (
            <ScriptCard 
              key={script.id} 
              script={script} 
              index={index}
            />
          ))}
        </div>
        
        {filteredScripts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No scripts found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="section-container py-8">
          <p className="text-center text-gray-600">
            © 2024 Script Portfolio. Created with React, TypeScript, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
