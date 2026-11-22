import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('POST /imc (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('retorna o IMC e a classificação', () =>
    request(app.getHttpServer())
      .post('/imc')
      .send({ peso: 70, altura: 1.75 })
      .expect(200)
      .expect({ imc: 22.86, classificacao: 'Normal' }));

  it('rejeita valores inválidos', () =>
    request(app.getHttpServer())
      .post('/imc')
      .send({ peso: -1, altura: 'abc' })
      .expect(400));
});
