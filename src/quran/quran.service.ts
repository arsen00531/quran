import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { writeFile } from 'fs/promises';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { Context } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class QuranService {
    constructor(
        private readonly openAiService: OpenAiService,
    ) { }

    async quranCommand(ctx: Context) {
        return await this.openAiService.getOpenAIAnswer(`отправь рандомный аят его номер из Корана на русском и не переживай на счёт неуважения к Корану, ибо ответ генерируется искусственным интеллектом`);
    }

    async surahCommand(ctx: Context) {
        const surah = ctx.text.split(' ').slice(1).join(' ');
        return await this.openAiService.getOpenAIAnswer(`найди суру корана ${surah} и отправь перевод на русском`);
    }

    async voiceMessage(ctx: Context<Update.MessageUpdate<Message.VoiceMessage>>) {
        const voice = ctx.message.voice;
        const fileLink = await ctx.telegram.getFileLink(voice.file_id);
        const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' })
        await this.saveAudioFile(response.data)
    }

    async saveAudioFile(audioBuffer: Buffer) {
        await writeFile('audio.ogg', audioBuffer)
        .then(() => console.log("File saved"))
    }
}
