import { Injectable } from '@nestjs/common';

export type Classificacao = 'Magreza' | 'Normal' | 'Sobrepeso' | 'Obesidade';

export interface ResultadoImc {
  imc: number;
  classificacao: Classificacao;
}

@Injectable()
export class ImcService {
  /** IMC = peso / altura² (peso em kg, altura em m). */
  calcular(peso: number, altura: number): ResultadoImc {
    const imc = Math.round((peso / altura ** 2) * 100) / 100;
    return { imc, classificacao: this.classificar(imc) };
  }

  classificar(imc: number): Classificacao {
    if (imc < 18.5) return 'Magreza';
    if (imc <= 24.9) return 'Normal';
    if (imc <= 30) return 'Sobrepeso';
    return 'Obesidade';
  }
}
