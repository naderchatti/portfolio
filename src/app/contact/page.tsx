'use client';

import InputText from '@/components/InputText/InputText';
import styles from './page.module.css';
import { useState } from 'react';
import TextArea from '@/components/TextArea/TextArea';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';

const Contact = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!data.name) {
      newErrors.name = 'Name is required!';
      isValid = false;
    }

    if (!validateEmail(data.email)) {
      newErrors.email = 'Invalid email!';
      isValid = false;
    }

    if (!data.message) {
      newErrors.message = 'Message is required!';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log(data);
      // Proceed with form submission logic here
    }
  };

  return (
    <div className={styles.main}>
      <h1>Contact</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputText
          label="Name"
          type="text"
          name="name"
          action={handleChange}
          value={data.name}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        <InputText
          label="Email"
          type="email"
          name="email"
          action={handleChange}
          value={data.email}
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}
        <TextArea
          label="Message"
          name="message"
          action={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          value={data.message}
        />
        {errors.message && (
          <span className={styles.errorText}>{errors.message}</span>
        )}
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </div>
  );
};

export default Contact;
