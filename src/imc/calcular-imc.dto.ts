import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Max } from 'class-validator';

export class CalcularImcDto {
  @ApiProperty({ description: 'Peso em quilogramas (kg)', example: 70, maximum: 700 })
  @IsNumber({}, { message: 'peso deve ser um número' })
  @IsPositive({ message: 'peso deve ser maior que zero' })
  @Max(700, { message: 'peso deve ser no máximo 700 kg' })
  peso!: number;

  @ApiProperty({ description: 'Altura em metros (m)', example: 1.75, maximum: 3 })
  @IsNumber({}, { message: 'altura deve ser um número' })
  @IsPositive({ message: 'altura deve ser maior que zero' })
  @Max(3, { message: 'altura deve ser no máximo 3 m' })
  altura!: number;
}
