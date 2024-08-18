import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Home', () => {

  it('Should be rendered', () => {
    render(<Home />);
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  })

});
