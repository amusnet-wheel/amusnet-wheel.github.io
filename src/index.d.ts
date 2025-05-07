import { TemplateResult } from '@lit'

declare type Settings = {
    version: string
    wheelSectors: string[],
    prizes: {[prizeName: string]: number}
}

declare type AppContext = {
    render(view: TemplateResult): void
}

declare type ViewController = (ctx: AppContext) => void