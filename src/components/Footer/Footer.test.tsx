import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer content correctly", () => {
    render(<Footer />);

    const heladosPalacin = screen.getAllByText(/Helados Palacín/i);
    expect(heladosPalacin.length).toBeGreaterThan(0);
    expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
  });

  it("displays current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
