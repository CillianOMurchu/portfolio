# Musical Red Velvet Background

A luxurious red velvet background with animated musical notes falling like rain. Perfect for music-related pages or creating an elegant, dynamic atmosphere.

## Components

### `RedVelvetBackground`
The main background component that combines a red velvet gradient with musical notes rain effect.

### `MusicalNotesRain`
A standalone component for just the musical notes rain effect, can be used with any background.

## Usage

### Basic Red Velvet Background
```tsx
import { RedVelvetBackground } from '@/features/visual-effects';

function MyMusicPage() {
  return (
    <RedVelvetBackground>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-white text-6xl font-bold">
          Music Player
        </h1>
      </div>
    </RedVelvetBackground>
  );
}
```

### Customized Background
```tsx
import { RedVelvetBackground } from '@/features/visual-effects';

function MyPage() {
  return (
    <RedVelvetBackground 
      noteCount={40}
      noteColor="text-rose-300"
      noteOpacity={0.8}
      rainSpeed="slow"
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white text-4xl mb-6">Welcome</h1>
        <p className="text-rose-100">Your content here...</p>
      </div>
    </RedVelvetBackground>
  );
}
```

### Standalone Musical Notes Rain
```tsx
import { MusicalNotesRain } from '@/features/visual-effects';

function MyPage() {
  return (
    <div className="relative bg-purple-900 min-h-screen">
      <MusicalNotesRain 
        noteCount={30}
        color="text-yellow-300"
        opacity={0.7}
        speed="fast"
      />
      <div className="relative z-10">
        Your content here...
      </div>
    </div>
  );
}
```

## Props

### `RedVelvetBackground`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to display over the background |
| `noteCount` | `number` | `25` | Number of falling musical notes |
| `noteColor` | `string` | `'text-rose-400'` | Tailwind color class for notes |
| `noteOpacity` | `number` | `0.6` | Opacity of the notes (0-1) |
| `rainSpeed` | `'slow' \| 'medium' \| 'fast'` | `'medium'` | Speed of falling animation |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `{}` | Additional inline styles |

### `MusicalNotesRain`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `noteCount` | `number` | `25` | Number of falling musical notes |
| `color` | `string` | `'text-rose-400'` | Tailwind color class for notes |
| `opacity` | `number` | `0.7` | Opacity of the notes (0-1) |
| `speed` | `'slow' \| 'medium' \| 'fast'` | `'medium'` | Speed of falling animation |
| `className` | `string` | `''` | Additional CSS classes |

## Musical Symbols Used

The component randomly selects from these musical symbols:
- ♪ (Eighth note)
- ♫ (Beamed eighth notes)
- ♬ (Beamed sixteenth notes)
- ♭ (Flat)
- ♯ (Sharp)
- 𝄞 (Treble clef)
- 𝄢 (Bass clef)
- ♩ (Quarter note)
- ♮ (Natural)

## Styling

### Background Gradient
The red velvet background features a complex gradient:
- **Base**: `from-slate-900 via-red-950 to-slate-950`
- **Overlay**: Radial gradients with red and purple hues
- **Texture**: Subtle diagonal lines for depth

### Animation
- Notes fall from top to bottom of viewport
- Random horizontal positions
- Slight rotation during fall
- Staggered timing for natural effect
- Fade in/out at start and end

## Performance

- Uses CSS animations for optimal performance
- Fixed positioning with pointer-events disabled
- Efficient re-rendering with React.memo patterns
- Lightweight DOM structure

## Examples

### Music Player Page
```tsx
<RedVelvetBackground 
  noteCount={35}
  noteColor="text-rose-300"
  rainSpeed="slow"
>
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-white text-7xl font-bold mb-4">🎵</h1>
    <h2 className="text-rose-200 text-3xl mb-8">Now Playing</h2>
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
      <p className="text-white text-xl">Song Title</p>
      <p className="text-rose-300">Artist Name</p>
    </div>
  </div>
</RedVelvetBackground>
```

### Portfolio Hero Section
```tsx
<RedVelvetBackground 
  noteCount={20}
  noteOpacity={0.4}
  className="h-screen"
>
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <h1 className="text-white text-8xl font-bold mb-4">
        Music Producer
      </h1>
      <p className="text-rose-200 text-xl">
        Creating soundscapes since 2020
      </p>
    </div>
  </div>
</RedVelvetBackground>
```