import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
import "./Breadcrumbs.scss";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export default function Breadcrumbs(props: { items: BreadcrumbItem[] }) {
  const { items } = props;

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs-nav">
      <Container>
        <Breadcrumb>
          {items.map((item, index) => {
            const isActive = item.active || index === items.length - 1;
            
            return (
              <Breadcrumb.Item
                key={index}
                active={isActive}
                linkAs={isActive ? "span" : Link}
                linkProps={!isActive && item.href ? { to: item.href } : {}}
              >
                {item.label}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </Container>
    </nav>
  );
}
