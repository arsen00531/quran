import { Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';

@Module({
  providers: [OpenAiService],
  controllers: [OpenAiController],
  exports: [OpenAiService]
})
export class OpenAiModule {}
