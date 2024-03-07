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
        await ctx.reply('ا‎لسلام عليكم ورحمة الله وبركاته');
        await ctx.reply('Пожалуйста введите /quran чтобы получить рандомный аят из Корана');
        await ctx.reply('Пожалуйста введите /surah <сура> чтобы получить суру из Корана');
        await ctx.reply('Прошу прощения братья и сёстры, что могут быть ошибки, ибо ответ генерируется искусственным интеллектом, поэтому пишите большой текст или длинное голосовое сообщение, чтобы ответ был более точным');
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
        this.quranService.voiceMessage(ctx);
    }
}
