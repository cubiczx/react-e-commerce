import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders breadcrumb items correctly", () => {
    const items = [
      { label: "Inicio", href: "/" },
      { label: "Productos", active: true }
    ];

    render(<Breadcrumbs items={items} />);

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Productos")).toBeInTheDocument();
  });
});
