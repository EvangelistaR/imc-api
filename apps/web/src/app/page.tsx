import { ImcForm } from "./imc-form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1 className={styles.title}>Calculadora de IMC</h1>
        <p className={styles.subtitle}>IMC = peso (kg) / altura² (m)</p>
        <ImcForm />
      </section>
    </main>
  );
}
