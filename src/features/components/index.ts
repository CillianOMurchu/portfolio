import { InteractiveIconSystem, type InteractiveIconData } from '../components/InteractiveIconSystem';
import { techInfoData } from '../data/techInfo';

// Convert our tech info data to the format expected by InteractiveIconSystem
export const iconSystemData: InteractiveIconData = techInfoData;

export { InteractiveIconSystem };