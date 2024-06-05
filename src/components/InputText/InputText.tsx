'use client';

import { useState } from 'react';
import styles from './InputText.module.css';

interface InputProps {
  name: string;
  label: string;
  value: string;
  type: string;
  maxLength?: number;
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  name,
  label,
  value,
  type,
  maxLength,
  action,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={action}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.inputText}
        maxLength={maxLength}
      />
      <label
        className={`${styles.floatingLabel} ${
          isFocused || value ? styles.focused : ''
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputText;
