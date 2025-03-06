import { act, renderHook } from "@testing-library/react";
import { useConfirmationDialog } from "./confirmation-dialog.hook";
import { createEmptyLookup, Lookup } from "#common/models";

describe('useConfirmationDialog specs', () => {
  it('should return an object: isOpen with default value and onClose and onOpenDialog as functions', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const defaultOpen: boolean = false;
    expect(result.current.isOpen).toEqual(defaultOpen);
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should return an object: itemToDelete with default value and onAccept and onOpenDialog as functions', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const defaultItemToDelete: Lookup = createEmptyLookup();
    expect(result.current.itemToDelete).toEqual(defaultItemToDelete);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update isOpen to false when calling onClose', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  it('should update itemToDelete to empty item when calling onAccept', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should update isOpen and itemToDelete when calling onOpenDialog', () => {
    // Arrange
    const item: Lookup = {
      id: '1',
      name: 'test name'
    }

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(item);
  });
});
