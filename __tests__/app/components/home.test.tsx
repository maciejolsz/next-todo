import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from "@/app/components/home";
import { describe, expect } from "@jest/globals";

describe('Home', () => {
  it('renders a home', () => {
    render(<Home />)

    const heading = screen.findByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
