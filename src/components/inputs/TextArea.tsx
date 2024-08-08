import React from 'react';
import styles from './Inputs.module.css';

type InputTextProps = {
  placeholder: string;
  value: string;
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const InputText = ({
  placeholder,
  value,
  name,
  onChange,
  required = false,
}: InputTextProps) => {
  return (
    <textarea
      required={required}
      placeholder={placeholder}
      className={styles.textArea}
      value={value}
      onChange={onChange}
      name={name}
      rows={8}
    />
  );
};

export default InputText;
