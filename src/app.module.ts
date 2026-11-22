import { Module } from '@nestjs/common';
import { ImcModule } from './imc/imc.module.js';

@Module({
  imports: [ImcModule],
})
export class AppModule {}
