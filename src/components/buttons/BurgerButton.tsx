import React from 'react';
import styles from './Buttons.module.css';

const BurgerButton = ({ handleDropdown }: { handleDropdown: () => void }) => {
  return (
    <label className={styles.burgerBar} htmlFor="check">
      <input
        type="checkbox"
        id="check"
        className={styles.burgerCheck}
        onChange={handleDropdown}
      />

      <span className={styles.burgerTop}></span>
      <span className={styles.burgerMiddle}></span>
      <span className={styles.burgerBottom}></span>
    </label>
  );
};

export default BurgerButton;
