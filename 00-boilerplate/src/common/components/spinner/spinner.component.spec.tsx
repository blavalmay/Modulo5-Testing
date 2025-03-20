import * as tracker from "react-promise-tracker";
import { SpinnerComponent } from './spinner.component';
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock('react-promise-tracker');

describe('Spinner components specs', () => {
  it('should open the spinner modal when there is a promise in progress', () => {
    // Arrange
    vi.spyOn(tracker, 'usePromiseTracker').mockReturnValue({promiseInProgress: true});

    // Act
    render(<SpinnerComponent/>);
    const modalElement = screen.getByRole('presentation');

    // Assert
    expect(modalElement).toBeInTheDocument();
  });

  it('should not open the spinner modal when there is not a promise in progress', () => {
    // Arrange
    vi.spyOn(tracker, 'usePromiseTracker').mockReturnValue({promiseInProgress: false});

    // Act
    render(<SpinnerComponent/>);
    const modalElement = screen.queryByRole('presentation');

    // Assert
    expect(modalElement).not.toBeInTheDocument();
  });
});
