import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
    render(<ShimmerEffect speed="normal" />)
    
    const shimmerElement = screen.getByTestId('shimmer-effect')
    const shimmerOverlay = shimmerElement.querySelector('div')
    
    expect(shimmerOverlay).toBeInTheDocument()
    expect(shimmerOverlay).toHaveClass('absolute', 'inset-0')
  })
})