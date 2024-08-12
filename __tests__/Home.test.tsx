import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Home', () => {

  it('Should have Docs text', () => {
    render(<Home />);
    const myElement = screen.getByText('Docs');
    expect(myElement).toBeInTheDocument();
  })

});
