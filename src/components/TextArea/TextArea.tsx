'use client';

import { useState } from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
  name: string;
  label: string;
  value: string;
  action: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ name, label, value, action }: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={styles.textareaContainer}>
      <textarea
        name={name}
        value={value}
        onChange={action}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.textarea}
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

export default TextArea;
