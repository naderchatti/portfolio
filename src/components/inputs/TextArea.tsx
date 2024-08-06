import React from 'react';
import styles from './Inputs.module.css';

type InputTextProps = {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const InputText = ({ placeholder, value, name, onChange }: InputTextProps) => {
  return (
    <textarea
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
