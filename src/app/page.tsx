import MultiStepForm from '@/components/MultiStepForm';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <MultiStepForm />
    </main>
  );
}
