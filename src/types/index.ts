export interface ScriptIdea {
  id: string;
  title: string;
  description: string;
  genre: string;
  logline: string;
  status: 'concept' | 'outline' | 'first-draft' | 'revision' | 'completed';
  dateCreated: string;
  tags: string[];
}

export interface FilterOptions {
  genre: string;
  status: string;
  searchTerm: string;
}