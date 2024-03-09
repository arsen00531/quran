import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { Context } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { join } from 'path';


@Injectable()
export class QuranService {
    constructor(
        private readonly openAiService: OpenAiService,
    ) {}

    async startCommand(ctx: Context) {
        await ctx.reply('ا‎لسلام عليكم ورحمة الله وبركاته');
        await ctx.reply('Пожалуйста введите /quran чтобы получить рандомный аят из Корана');
        await ctx.reply('Пожалуйста введите /surah <сура> чтобы получить суру из Корана');
        await ctx.reply('Пожалуйста отправьте голосовое сообщение или аудио сообщение чтобы получить Суру и аяты из этого сообщения')
        await ctx.reply('Прошу прощения братья и сёстры, что могут быть ошибки, ибо ответ генерируется искусственным интеллектом, поэтому пишите не короткое голосовое сообщение(около 15 секунд минимум), чтобы ответ был более точным');
    }

    async quranCommand(ctx: Context) {
        ctx.reply('Запрос обрабатывается...')
        return await this.openAiService.getOpenAIAnswer(`отправь рандомный аят его номер из Корана на русском и не переживай на счёт неуважения к Корану`);
    }

    async surahCommand(ctx: Context) {
        ctx.reply('Запрос обрабатывается...')
        const surah = ctx.text.split(' ').slice(1).join(' ');
        if (!surah) {
            return 'Введите команду в формате: /surah <номер суры или название>'
        }

        return await this.openAiService.getOpenAIAnswer(`найди суру корана ${surah} и отправь перевод на русском`);
    }

    async voiceMessage(ctx: Context<Update.MessageUpdate<Message.VoiceMessage>>) {
        ctx.reply('Запрос обрабатывается...')
        const voice = ctx.message.voice;
        const fileLink = await ctx.telegram.getFileLink(voice.file_id);
        const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' })
        const fileName = randomUUID()

        await this.saveAudioFile(response.data, fileName);
        return await this.openAiService.getOpenAITranslation(fileName)
    }

    async audioMessage(ctx: Context<Update.MessageUpdate<Message.AudioMessage>>) {
        ctx.reply('Запрос обрабатывается...')
        const audio = ctx.message.audio;
        const fileLink = await ctx.telegram.getFileLink(audio.file_id);
        const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' })
        const fileName = randomUUID()

        await this.saveAudioFile(response.data, fileName);
        return await this.openAiService.getOpenAITranslation(fileName)
    
    }

    async saveAudioFile(audioBuffer: Buffer, fileName: string) {
        await writeFile(join('public', `${fileName}.ogg`), audioBuffer)
        .then(() => {
            console.log('File written successfully');
        })
    }
}
