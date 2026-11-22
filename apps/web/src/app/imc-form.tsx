"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type Resultado = { imc: number; classificacao: string };

export function ImcForm() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function calcular(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setResultado(null);
    try {
      const res = await fetch(`${API_URL}/imc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          peso: Number(peso.replace(",", ".")),
          altura: Number(altura.replace(",", ".")),
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        setErro([].concat(body.message).join("; "));
      } else {
        setResultado(body);
      }
    } catch {
      setErro("Não foi possível conectar à API.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={calcular} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>Peso</span>
        <span className={styles.inputWrap}>
          <input
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            inputMode="decimal"
            placeholder="70"
            required
          />
          <span className={styles.unit}>kg</span>
        </span>
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Altura</span>
        <span className={styles.inputWrap}>
          <input
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            inputMode="decimal"
            placeholder="1.75"
            required
          />
          <span className={styles.unit}>m</span>
        </span>
      </label>
      <button type="submit" disabled={carregando}>
        {carregando ? "Calculando..." : "Calcular"}
      </button>
      <div aria-live="polite">
        {resultado && (
          <div className={styles.result}>
            <span className={styles.resultLabel}>Seu IMC</span>
            <span className={styles.resultValue}>
              {resultado.imc.toFixed(2)}
              <small> kg/m²</small>
            </span>
            <span className={styles.badge}>{resultado.classificacao}</span>
          </div>
        )}
        {erro && <p className={styles.error}>{erro}</p>}
      </div>
    </form>
  );
}
