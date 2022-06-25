/**
 * @jest-environment jsdom
*/

import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../../../components/Layout/nav";

describe("Nav", () => {
    test("should render the heading", () => {
        render(<Nav />);
        expect(
            screen.getByText(/A quoi ça sert ?/i)
          ).toBeInTheDocument();
    });
    });