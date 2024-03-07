import { Module } from '@nestjs/common';
import { YouComController } from './you-com.controller';
import { YouComService } from './you-com.service';

@Module({
  controllers: [YouComController],
  providers: [YouComService]
})
export class YouComModule {}
