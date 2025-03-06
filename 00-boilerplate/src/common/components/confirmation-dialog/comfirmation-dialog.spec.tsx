import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialog component specs', () => {

  it('should be displayed when isOpen is true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Eliminar Empleado',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: <div></div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogElement = screen.getByRole('dialog');

    // Assert
    expect(dialogElement).toBeInTheDocument();
  });

  it('should be hidden when isOpen is false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: () => {},
      onClose: () => {},
      title: 'Eliminar Empleado',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: <div></div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should have title displayed when opened', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Eliminar Empleado',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: <div></div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogTitle = screen.getByRole('heading', { level: 2, name: /eliminar empleado/i });

    // Assert
    expect(dialogTitle).toBeInTheDocument();
  });

  it('should have children displayed when opened', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'Eliminar Empleado',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: <h3>Subtitulo</h3>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const dialogChildren = screen.getByRole('heading', { level: 3, name: /subtitulo/i });

    // Assert
    expect(dialogChildren).toBeInTheDocument();
  });

  it('should call onClose when clicking on "Cancelar" button', async () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: vi.fn(),
      title: 'Eliminar Empleado',
      labels: {
        closeButton: 'Cancelar',
        acceptButton: 'Aceptar',
      },
      children: <div></div>,
    };

    // Act
    render(<ConfirmationDialogComponent {...props}/>);

    const closeButton = screen.getByRole('button', { name: /cancelar/i });
    await userEvent.click(closeButton);

    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });
});

it('should call both onAccept and onClose when clicking on "Aceptar" button', async () => {
  // Arrange
  const props = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'Eliminar Empleado',
    labels: {
      closeButton: 'Cancelar',
      acceptButton: 'Aceptar',
    },
    children: <div></div>,
  };

  // Act
  render(<ConfirmationDialogComponent {...props}/>);

  const acceptButton = screen.getByRole('button', { name: /aceptar/i });
  await userEvent.click(acceptButton);

  // Assert
  expect(props.onAccept).toHaveBeenCalled();
  expect(props.onClose).toHaveBeenCalled();
});
