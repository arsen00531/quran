import { Module } from '@nestjs/common';
import { QuranModule } from './quran/quran.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAiModule } from './open-ai/open-ai.module';
import { YouComModule } from './you-com/you-com.module';
import * as LocalSession from 'telegraf-session-local';

const sessions = new LocalSession({ database: 'sessions_db.json' });

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('BOT_TOKEN'),
        middlewares: [sessions.middleware()]
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuranModule,
    OpenAiModule,
    YouComModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
