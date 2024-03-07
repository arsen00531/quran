import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { G4F } from 'g4f';

@Injectable()
export class OpenAiService {
    public g4f: G4F;
    constructor(
        private readonly configService: ConfigService,
    ) {
        this.g4f = new G4F();
    }

    async getOpenAIAnswer(prompt: string) {
        const messages = [
            { role: "user", content: prompt},
        ];
        return await this.g4f.chatCompletion(messages)
    }
}
