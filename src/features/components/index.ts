import { InteractiveIconSystem, type InteractiveIconData } from '../components/InteractiveIconSystem';
import { techInfoData } from '../data/techInfo';

// Convert our tech info data to the format expected by InteractiveIconSystem
export const iconSystemData: InteractiveIconData = techInfoData;

export { AnimatedLine } from './AnimatedLine';
export { InfoPanel } from './InfoPanel';
export { InteractiveIconSystem } from './InteractiveIconSystem';
export { DiagonalDescriptions } from './DiagonalDescriptions';
export { HolographicProjector } from './HolographicProjector';