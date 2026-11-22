# Calculadora de IMC

Monorepo (npm workspaces) com:

- **`apps/api`**: API em [Nest.js](https://nestjs.com) que calcula o Índice de Massa Corporal (IMC) no backend, com documentação Swagger.
- **`apps/web`**: frontend em [Next.js](https://nextjs.org) (React) com um formulário que envia peso e altura para a API e exibe o resultado.

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

Na raiz do repositório:

```bash
npm install          # instala as dependências de todos os apps
npm run dev          # sobe API (3000) e frontend (3001) juntos
```

Ou separadamente: `npm run dev:api` e `npm run dev:web`.

Para produção:

```bash
npm run build
npm run start:prod -w apps/api
npm run start -w apps/web
```

| URL                               | O que é                      |
| --------------------------------- | ---------------------------- |
| `http://localhost:3001`           | Frontend (formulário de IMC) |
| `POST http://localhost:3000/imc`  | Endpoint de cálculo          |
| `http://localhost:3000/docs`      | Documentação Swagger         |
| `http://localhost:3000/docs-json` | Especificação OpenAPI (JSON) |

### Configuração

| Variável               | App | Padrão                  | Descrição                                            |
| ---------------------- | --- | ----------------------- | ---------------------------------------------------- |
| `PORT`                 | api | `3000`                  | Porta da API                                         |
| `CORS_ORIGIN`          | api | `http://localhost:3001` | Origens permitidas (separadas por vírgula)           |
| `NEXT_PUBLIC_API_URL`  | web | `http://localhost:3000` | URL da API, lida no build do frontend (`apps/web/.env.example`) |

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
npm test           # unitários (api)
npm run test:e2e   # ponta a ponta (api)
```

## Estrutura

```
apps/
  api/                       # Nest.js
    src/main.ts              # bootstrap, CORS, validação e Swagger
    src/imc/                 # controller, service e DTO do cálculo
    test/app.e2e-spec.ts     # testes e2e
  web/                       # Next.js
    src/app/page.tsx         # página
    src/app/imc-form.tsx     # formulário que chama a API
```
