import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutUs from "./AboutUs";

describe("AboutUs", () => {
  it("renders about us page correctly", () => {
    render(
      <BrowserRouter>
        <AboutUs />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sobre Helados Palacín/i)).toBeInTheDocument();
    expect(screen.getByText(/Nuestra Historia/i)).toBeInTheDocument();
    expect(screen.getByText(/Nuestros Valores/i)).toBeInTheDocument();
  });

  it("displays founder information", () => {
    render(
      <BrowserRouter>
        <AboutUs />
      </BrowserRouter>
    );

    expect(screen.getByText(/Xavier Palacín Ayuso/i)).toBeInTheDocument();
  });
});
