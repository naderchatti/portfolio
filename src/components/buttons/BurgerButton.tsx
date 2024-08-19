import React, { forwardRef } from 'react';
import styles from './Buttons.module.css';

const BurgerButton = forwardRef<
  HTMLInputElement,
  { handleDropdown: () => void }
>(({ handleDropdown }, ref) => {
  return (
    <label className={styles.burgerBar} htmlFor="check">
      <input
        type="checkbox"
        id="check"
        className={styles.burgerCheck}
        onChange={handleDropdown}
        ref={ref}
      />

      <span className={styles.burgerTop}></span>
      <span className={styles.burgerMiddle}></span>
      <span className={styles.burgerBottom}></span>
    </label>
  );
});

BurgerButton.displayName = 'BurgerButton';

export default BurgerButton;
