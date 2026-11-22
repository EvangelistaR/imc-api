# Calculadora de IMC

API em [Nest.js](https://nestjs.com) que calcula o Índice de Massa Corporal (IMC) no backend, com documentação Swagger.

```
IMC = peso (kg) / altura² (m)
```

| IMC                    | Classificação |
| ---------------------- | ------------- |
| menor que 18,5         | Magreza       |
| de 18,5 a 24,9         | Normal        |
| acima de 24,9 até 30   | Sobrepeso     |
| maior que 30           | Obesidade     |

O IMC é arredondado para 2 casas decimais antes de classificar (30,00 é Sobrepeso; 30,01 é Obesidade).

## Requisitos

- Node.js 20+ e npm

## Como executar

```bash
npm install
npm run start:dev      # desenvolvimento, com reload
```

Para produção:

```bash
npm run build
npm run start:prod
```

A aplicação sobe em `http://localhost:3000` (altere com a variável `PORT`).

| URL                              | O que é                      |
| -------------------------------- | ---------------------------- |
| `POST http://localhost:3000/imc` | Endpoint de cálculo          |
| `http://localhost:3000/docs`     | Documentação Swagger da API  |
| `http://localhost:3000/docs-json`| Especificação OpenAPI (JSON) |

## API

### `POST /imc`

Corpo (JSON):

| Campo    | Tipo   | Descrição                         |
| -------- | ------ | --------------------------------- |
| `peso`   | número | Peso em kg (> 0, máx. 700)        |
| `altura` | número | Altura em metros (> 0, máx. 3)    |

```bash
curl -X POST http://localhost:3000/imc \
  -H 'Content-Type: application/json' \
  -d '{"peso": 70, "altura": 1.75}'
```

Resposta `200`:

```json
{ "imc": 22.86, "classificacao": "Normal" }
```

Resposta `400` para valores inválidos:

```json
{
  "message": ["peso deve ser maior que zero", "altura deve ser um número"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Testes

```bash
npm test           # unitários
npm run test:e2e   # ponta a ponta
```

## Estrutura

```
src/
  main.ts                  # bootstrap, validação e Swagger
  app.module.ts
  imc/
    imc.controller.ts      # POST /imc
    imc.service.ts         # cálculo e classificação
    calcular-imc.dto.ts    # validação da entrada
test/app.e2e-spec.ts       # testes e2e
```
