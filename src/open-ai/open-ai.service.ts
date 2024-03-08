import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unlink } from 'fs/promises';
import OpenAI from 'openai';
import * as FormData from 'form-data';
import { createReadStream } from 'fs';
import axios from 'axios';
import { join } from 'path';

@Injectable()
export class OpenAiService {
    public openai: OpenAI;
    constructor(
        private readonly configService: ConfigService,
    ) {
        this.openai = new OpenAI({
            apiKey: this.configService.get('OPEN_AI_API_KEY'),
        });
    }

    async getOpenAIAnswer(prompt: string) {
        try {
            const chatResponse = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "user", content: prompt },
                ],
            })
    
            return chatResponse.choices[0].message.content
        } catch (error) {
            console.log(error);
        }
    }

    async getOpenAITranslation(fileName: string) {
        try {
            const formData = new FormData()
            formData.append("model", 'whisper-1')
            formData.append("file", createReadStream(join('public', `${fileName}.ogg`)))
            const response = await axios.post(
                'https://api.openai.com/v1/audio/translations',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${this.configService.get('OPEN_AI_API_KEY')}`,
                        "Content-Type": `multipart/form/data; boundary=${formData.getBoundary()}`
                    }
                }
            )
            await unlink(join('public', `${fileName}.ogg`))

            const message = `Напиши номер суры и аята по этому тексту ${response.data.text}`

            const chatResponse = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "user", content: message },
                ],
            })

            return chatResponse.choices[0].message.content
        } catch (error) {
            console.log(error);
        }
    }
}
