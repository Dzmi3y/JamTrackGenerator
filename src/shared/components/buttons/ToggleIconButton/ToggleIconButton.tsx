import React, { useState } from "react";
import styles from "./ToggleIconButton.module.css";

interface ToggleIconButtonProps {
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  className?: string;
  size?: number;
  color?: string;
}

const ToggleIconButton: React.FC<ToggleIconButtonProps> = ({
  isOpen: externalIsOpen,
  onChange,
  className = "",
  size = 24,
  color = "var(--color-pastel-cream)",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClick = (): void => {
    const newState = !isOpen;

    if (externalIsOpen === undefined) {
      setInternalIsOpen(newState);
    }

    if (onChange) {
      onChange(newState);
    }
  };

  const iconStyle = {
    "--icon-size": `${size}px`,
    "--icon-color": color,
  } as React.CSSProperties;

  return (
    <button
      className={`${styles.button} ${className} ${isOpen ? styles.open : ""}`}
      onClick={handleClick}
      aria-label={isOpen ? "Open" : "Close"}
      aria-expanded={isOpen}
      type="button"
      style={iconStyle}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className={styles.icon}>
        <span className={`${styles.line} ${styles.line1}`}></span>
        <span className={`${styles.line} ${styles.line2}`}></span>
        <span className={`${styles.line} ${styles.line3}`}></span>
      </div>
    </button>
  );
};

export default ToggleIconButton;
