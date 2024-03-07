import { Controller, Get } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
    constructor(
        private readonly openAiService: OpenAiService,
    ) {}

    @Get()
    getOpenAIResponse(prompt: string) {
        return this.openAiService.getOpenAIAnswer(prompt);
    }
}
