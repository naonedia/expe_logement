import { NgModule } from '@angular/core';
import { ChatBotSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NumberDirective } from './util/numbers-only.directive';

@NgModule({
    imports: [ChatBotSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, NumberDirective],
    exports: [ChatBotSharedLibsModule, FindLanguageFromKeyPipe, TranslateModule, NumberDirective]
})

export class ChatBotSharedCommonModule {}
