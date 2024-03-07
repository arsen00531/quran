import { Module } from '@nestjs/common';
import { QuranService } from './quran.service';
import { QuranUpdate } from './quran.update';
import { OpenAiModule } from 'src/open-ai/open-ai.module';

@Module({
  imports: [OpenAiModule],
  providers: [QuranService, QuranUpdate],
  controllers: []
})
export class QuranModule {}
