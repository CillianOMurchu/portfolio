// Quick test to verify dynamic icon system
import { allIcons, techIconMap } from './3dBall.const';

console.log('🧪 Testing Dynamic Icon System');
console.log('allIcons length:', allIcons.length);
console.log('allIcons:', allIcons.map(icon => icon.name));
console.log('techIconMap keys:', Object.keys(techIconMap));
console.log('Has angular?', 'angular' in techIconMap);

// Try to load angular icon
if ('angular' in techIconMap) {
  console.log('Attempting to load angular icon...');
  techIconMap['angular']()
    .then(module => {
      console.log('✅ Angular icon loaded:', module.default);
    })
    .catch(error => {
      console.error('❌ Angular icon failed to load:', error);
    });
} else {
  console.log('❌ Angular not found in techIconMap');
}