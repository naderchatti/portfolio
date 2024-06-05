import styles from './PrimaryButton.module.css';

interface PrimaryButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit';
  action?: () => void;
}

const PrimaryButton = ({ children, type, action }: PrimaryButtonProps) => {
  return (
    <button className={styles.button} type={type} onClick={action}>
      {children}
    </button>
  );
};

export default PrimaryButton;
