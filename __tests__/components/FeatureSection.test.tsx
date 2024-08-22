import FeatureSection from "@/components/FeatureSection";
import { render } from "@testing-library/react";

describe("FeatureSection", () => {
  it("renders without crashing", () => {
    render(<FeatureSection />);
  });

  it("displays the correct title", () => {
    const { getByText } = render(<FeatureSection />);
    expect(getByText("Features")).toBeInTheDocument();
  });

  it("renders the correct number of feature items", () => {
    const { getAllByTestId } = render(<FeatureSection />);
    const featureItems = getAllByTestId("feature-item");
    expect(featureItems.length).toBe(4);
  });

  it("renders the feature item titles correctly", () => {
    const { getByText } = render(<FeatureSection />);
    expect(getByText("Create Flashcards")).toBeInTheDocument();
    expect(getByText("Smart Flashcards")).toBeInTheDocument();
    expect(getByText("Study Flashcards From Anywhere")).toBeInTheDocument();
    expect(getByText("Easy To Use")).toBeInTheDocument();
  });

  // Add more tests as needed
});