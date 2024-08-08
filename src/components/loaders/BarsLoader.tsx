import styles from './Loaders.module.css';

const BarsLoader = ({
  color,
  size,
}: {
  color: string;
  size: number | string;
}) => {
  return (
    <div className={styles.barsLoader}>
      <span
        className={styles.bar}
        style={{
          backgroundColor: color,
          height:
            typeof size === 'number' ? size * 0.75 : `calc(${size} * 0.75)`,
        }}
      ></span>
      <span
        className={styles.bar}
        style={{ backgroundColor: color, height: size }}
      ></span>
      <span
        className={styles.bar}
        style={{
          backgroundColor: color,
          height:
            typeof size === 'number' ? size * 0.75 : `calc(${size} * 0.75)`,
        }}
      ></span>
    </div>
  );
};

export default BarsLoader;
