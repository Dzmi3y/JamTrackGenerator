import React, { useEffect, useRef, useState } from "react";
import styles from "./CollapsibleContainer.module.css";

interface AnimatedContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  isOpen,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const prevIsOpenRef = useRef(isOpen);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (prevIsOpenRef.current === isOpen) return;

    prevIsOpenRef.current = isOpen;

    if (!isOpen) {
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setShouldRender(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
