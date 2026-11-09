import { useState, useCallback } from 'react';

export function useDoorAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  const openDoors = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDoors = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleDoors = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openDoors,
    closeDoors,
    toggleDoors,
  };
}

