import { Module } from '@nestjs/common';
import { ImcController } from './imc.controller.js';
import { ImcService } from './imc.service.js';

@Module({
  controllers: [ImcController],
  providers: [ImcService],
})
export class ImcModule {}
