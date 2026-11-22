import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CalcularImcDto } from './calcular-imc.dto.js';
import { ImcService, type ResultadoImc } from './imc.service.js';

@ApiTags('imc')
@Controller('imc')
export class ImcController {
  constructor(private readonly imcService: ImcService) {}

  @Post()
  @ApiOperation({ summary: 'Calcula o IMC e retorna a classificação' })
  @ApiOkResponse({
    description: 'IMC (2 casas decimais) e classificação',
    schema: {
      example: { imc: 22.86, classificacao: 'Normal' },
      properties: {
        imc: { type: 'number' },
        classificacao: {
          type: 'string',
          enum: ['Magreza', 'Normal', 'Sobrepeso', 'Obesidade'],
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Peso ou altura inválidos' })
  @HttpCode(200)
  calcular(@Body() { peso, altura }: CalcularImcDto): ResultadoImc {
    return this.imcService.calcular(peso, altura);
  }
}
