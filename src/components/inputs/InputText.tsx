import React from 'react';
import styles from './Inputs.module.css';

type InputTextProps = {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText = ({
  type,
  placeholder,
  value,
  name,
  onChange,
}: InputTextProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.inputText}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default InputText;
