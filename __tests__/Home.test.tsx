import Home from '@/app/page';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the SignedIn and SignedOut components from @clerk/nextjs
jest.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Home', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('Should be rendered', () => {
    render(<Home />);
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  });

  it('Should display the correct title', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Flashcard SaaS')).toBeInTheDocument();
  });

  it('Should display the correct subtitle', () => {
    render(<Home />);
    const subtitle = "A SaaS for creating flashcards from your text";
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it('Should render the Get Started button for all users', () => {
    render(<Home />);
    const buttons = screen.getAllByText('Get Started');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  it('Should navigate to /generate when signed-in Get Started button is clicked', () => {
    render(<Home />);
    const button = screen.getAllByText('Get Started')[0];
    fireEvent.click(button);
    expect(push).toHaveBeenCalledWith('/generate');
  });

  it('Should navigate to /sign-up when signed-out Get Started button is clicked', () => {
    render(<Home />);
    const button = screen.getAllByText('Get Started')[1];
    fireEvent.click(button);
    expect(push).toHaveBeenCalledWith('/sign-up');
  });

  it('Should render the FeatureSection component', () => {
    render(<Home />);
    const featureSection = screen.getByTestId('feature-section');
    expect(featureSection).toBeInTheDocument();
  });

  it('Should render the PricingSection component', () => {
    render(<Home />);
    const pricingSection = screen.getByTestId('pricing-section');
    expect(pricingSection).toBeInTheDocument();
  });
});