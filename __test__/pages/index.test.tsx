/**
 * @jest-environment jsdom
*/

import React from "react";
// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home", () => {
  test("should render the heading", () => {
    render(<Home />);
    expect(
      screen.getByText("Restez motivé pour apprendre")
    ).toBeInTheDocument();
  });
} );
