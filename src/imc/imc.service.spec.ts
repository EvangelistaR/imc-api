import { ImcService } from './imc.service.js';

describe('ImcService', () => {
  const service = new ImcService();

  it('calcula peso / altura²', () => {
    expect(service.calcular(70, 1.75).imc).toBe(22.86);
  });

  it.each([
    [50, 1.8, 'Magreza'],
    [70, 1.75, 'Normal'],
    [85, 1.75, 'Sobrepeso'],
    [100, 1.7, 'Obesidade'],
  ])('peso %d / altura %d => %s', (peso, altura, esperado) => {
    expect(service.calcular(peso, altura).classificacao).toBe(esperado);
  });

  it('respeita os limites', () => {
    expect(service.classificar(18.49)).toBe('Magreza');
    expect(service.classificar(18.5)).toBe('Normal');
    expect(service.classificar(24.9)).toBe('Normal');
    expect(service.classificar(25)).toBe('Sobrepeso');
    expect(service.classificar(30)).toBe('Sobrepeso');
    expect(service.classificar(30.01)).toBe('Obesidade');
  });
});
