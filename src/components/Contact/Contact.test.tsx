import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "./Contact";

describe("Contact", () => {
  it("renders contact page correctly", () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    const contactoElements = screen.getAllByText(/Contacto/i);
    expect(contactoElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Xavier Palacín Ayuso/i)).toBeInTheDocument();
  });

  it("displays contact information", () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByText(/cubiczx@hotmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/github.com\/cubiczx\/react-e-commerce/i)).toBeInTheDocument();
  });

  it("renders contact form", () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });
});
