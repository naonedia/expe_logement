import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NumberDirective } from './util/numbers-only.directive';

@NgModule({
    imports: [SharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, NumberDirective],
    exports: [SharedLibsModule, FindLanguageFromKeyPipe, TranslateModule, NumberDirective]
})

export class SharedCommonModule {}
