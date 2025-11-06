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
    // This test will initially fail until we implement the component
    render(<ShimmerEffect />)
    
    const shimmerElement = screen.getByTestId('shimmer-effect')
    expect(shimmerElement).toHaveStyle('animation-duration: 2s')
  })
})