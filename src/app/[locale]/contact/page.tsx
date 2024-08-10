'use client';

import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import InputText from '@/components/inputs/InputText';
import TextArea from '@/components/inputs/TextArea';
import Link from 'next/link';
import { TfiEmail, TfiGithub, TfiLinkedin, TfiTwitter } from 'react-icons/tfi';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import BarsLoader from '@/components/loaders/BarsLoader';
import { useTranslation } from '@/context/TranslationContext';

const Contact = () => {
  const { useTranslations } = useTranslation();
  const t = useTranslations('Contact');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [formRef, isFormVisible] = useIntersectionObserver();
  const [socialsRef, isSocialsVisible] = useIntersectionObserver();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'subject':
        setSubject(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    setLoading(true);
    const res = await fetch('https://email-sender.chatti-tkd.workers.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!res.ok) {
      setShowErrorMessage(true);
      setLoading(false);
      throw new Error('Failed to send message');
    }

    setShowSuccessMessage(true);
    setLoading(false);
    resetForm();
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.contactSection}>
        <div className={styles.contactWrapper}>
          <form
            ref={formRef as React.RefObject<HTMLFormElement>}
            onSubmit={handleSubmit}
            className={`${styles.contactCard} ${
              isFormVisible ? styles.animate : ''
            }`}
          >
            <span className={styles.subtitle}>{t('subtitle')}</span>
            <h1 className={styles.title}>{t('title')}</h1>
            <InputText
              required
              type="text"
              placeholder={t('namePlaceholder')}
              value={name}
              onChange={handleChange}
              name="name"
            />
            <InputText
              required
              type="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={handleChange}
              name="email"
            />
            <InputText
              required
              type="text"
              placeholder={t('subjectPlaceholder')}
              value={subject}
              onChange={handleChange}
              name="subject"
            />
            <TextArea
              required
              placeholder={t('messagePlaceholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
            />
            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <BarsLoader
                  color="var(--inverse-icon-color)"
                  size={'1.25rem'}
                />
              ) : (
                <span>{t('sendButton')}</span>
              )}
            </PrimaryButton>
            {showSuccessMessage && (
              <div className={styles.successMessage}>{t('successMessage')}</div>
            )}
            {showErrorMessage && (
              <div className={styles.errorMessage}>{t('errorMessage')}</div>
            )}
          </form>
          <div
            ref={socialsRef as React.RefObject<HTMLDivElement>}
            className={`${styles.socials} ${
              isSocialsVisible ? styles.animate : ''
            }`}
          >
            <Link
              href="https://www.linkedin.com/in/naderchatti"
              target="_blank"
              className={styles.socialItem}
            >
              <div className={styles.leftSide}>
                <TfiLinkedin size={'1rem'} color="var(--default-icon-color)" />
                <span>LinkedIn</span>
              </div>
              <Image
                src="/icons/ph_arrow-up-right-light.png"
                alt="linkedin"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href="https://github.com/chattinader"
              target="_blank"
              className={styles.socialItem}
            >
              <div className={styles.leftSide}>
                <TfiGithub size={'1rem'} color="var(--default-icon-color)" />
                <span>Github</span>
              </div>
              <Image
                src="/icons/ph_arrow-up-right-light.png"
                alt="linkedin"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href="https://twitter.com/naderchatti"
              target="_blank"
              className={styles.socialItem}
            >
              <div className={styles.leftSide}>
                <TfiTwitter size={'1rem'} color="var(--default-icon-color)" />
                <span>Twitter</span>
              </div>
              <Image
                src="/icons/ph_arrow-up-right-light.png"
                alt="linkedin"
                width={20}
                height={20}
              />
            </Link>
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              target="_blank"
              className={styles.socialItem}
            >
              <div className={styles.leftSide}>
                <TfiEmail size={'1rem'} color="var(--default-icon-color)" />
                <span>Email</span>
              </div>
              <Image
                src="/icons/ph_arrow-up-right-light.png"
                alt="linkedin"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
