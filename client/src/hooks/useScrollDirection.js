// hooks/useScrollDirection.js (or inside Header.jsx)
import { useState, useEffect } from "react";

const useScrollDirection = () => {
  const [scrollUp, setScrollUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollUp(false); // Scrolling down
      } else if (currentScrollY < lastScrollY) {
        setScrollUp(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", updateScrollDir);

    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [lastScrollY]);

  return scrollUp;
};

export default useScrollDirection;
