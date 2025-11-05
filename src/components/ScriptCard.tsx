import React from 'react';
import { motion } from 'framer-motion';
import type { ScriptIdea } from '../types';

interface ScriptCardProps {
  script: ScriptIdea;
  index: number;
}

const statusColors = {
  concept: 'bg-yellow-100 text-yellow-800',
  outline: 'bg-blue-100 text-blue-800',
  'first-draft': 'bg-purple-100 text-purple-800',
  revision: 'bg-orange-100 text-orange-800',
  completed: 'bg-green-100 text-green-800',
};

const ScriptCard: React.FC<ScriptCardProps> = ({ script, index }) => {
  return (
    <motion.div
      className="script-card"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{script.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[script.status]}`}>
          {script.status.replace('-', ' ')}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 leading-relaxed">{script.description}</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Logline:</h4>
        <p className="text-gray-700 italic">{script.logline}</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
          {script.genre}
        </span>
        {script.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="text-sm text-gray-500">
        Created: {new Date(script.dateCreated).toLocaleDateString()}
      </div>
    </motion.div>
  );
};

export default ScriptCard;