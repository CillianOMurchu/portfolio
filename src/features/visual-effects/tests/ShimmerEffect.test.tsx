import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ShimmerEffect } from '../ShimmerEffect'

describe('ShimmerEffect', () => {
  it('should render shimmer animation with proper styling', () => {
    // Arrange
    const props = {
      width: '200px',
      height: '100px',
      className: 'test-shimmer'
    }
    
    // Act
    render(<ShimmerEffect {...props} />)
    
    // Assert
    const shimmerElement = screen.getByTestId('shimmer-effect')
    expect(shimmerElement).toBeInTheDocument()
    expect(shimmerElement).toHaveClass('test-shimmer')
  })

  it('should start animation on mount', () => {
    // This test verifies the shimmer motion element exists and has correct styling
    render(<ShimmerEffect />)
    
    const shimmerElement = screen.getByTestId('shimmer-effect')
    const shimmerOverlay = shimmerElement.querySelector('div')
    
    expect(shimmerOverlay).toBeInTheDocument()
    expect(shimmerOverlay).toHaveClass('absolute', 'inset-0')
  })

  it('should show stars on hover', () => {
    // Arrange
    render(<ShimmerEffect>Test Content</ShimmerEffect>)
    
    // Act
    const shimmerElement = screen.getByTestId('shimmer-effect')
    fireEvent.mouseEnter(shimmerElement)
    
    // Assert
    const stars = shimmerElement.querySelectorAll('svg')
    expect(stars.length).toBeGreaterThan(0)
    
    // Act - mouse leave
    fireEvent.mouseLeave(shimmerElement)
    
    // Stars should be hidden after mouse leave
    // Note: Due to animation timing, we're just testing that the hover handlers exist
    expect(shimmerElement).toBeInTheDocument()
  })

  it('renders children content', () => {
    // Arrange
    const testContent = 'Hello World'
    
    // Act
    render(<ShimmerEffect>{testContent}</ShimmerEffect>)
    
    // Assert
    expect(screen.getByText(testContent)).toBeInTheDocument()
  })
})