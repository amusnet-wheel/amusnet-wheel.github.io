import { TemplateResult } from '@lit';
import page from '@page';

declare type Settings = {
    version: string;
    wheelSectors: string[];
    prizes: { [prizeName: string]: number };
    quizPrizes: { [prizeName: string]: number };
};

declare type AppContext = {
    render(view: TemplateResult): void,
    overlay(view: TemplateResult): void,
    page: typeof page,
};

declare type ViewController = (ctx: AppContext) => void;
