import { Command, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { QuranService } from './quran.service';
import { commands } from './quran.command';
import { Message, Update as UpdateType } from 'telegraf/typings/core/types/typegram';

@Update()
export class QuranUpdate {
    constructor(
        private readonly quranService: QuranService,
        @InjectBot()
        private readonly bot: Telegraf<Context>,
    ) {
        this.bot.telegram.setMyCommands(commands)
    }

    @Start()
    async startCommand(ctx: Context) {
        this.quranService.startCommand(ctx);
    }

    @Command('quran')
    async quranCommand(ctx: Context) {
        return this.quranService.quranCommand(ctx);
    }

    @Command('surah')
    async surahCommand(ctx: Context) {
        return this.quranService.surahCommand(ctx);
    }

    @On('voice')
    voiceMessage(ctx: Context<UpdateType.MessageUpdate<Message.VoiceMessage>>) {
        return this.quranService.voiceMessage(ctx);
    }

    @On('audio')
    audioMessage(ctx: Context<UpdateType.MessageUpdate<Message.AudioMessage>>) {
        return this.quranService.audioMessage(ctx);
    }
}
