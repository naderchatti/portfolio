import { works } from '@/common/data';
import styles from './WorkItem.module.css';

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = works.find((item) => item.id === params.id);
  if (!work) {
    return <div>Work not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{work.title}</h1>
        <p className={styles.description}>{work.description}</p>
      </section>
      <section className={styles.content}></section>
    </div>
  );
}
