import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
    imports: [NgbModule.forRoot(), FontAwesomeModule, Ng5SliderModule],
    exports: [FormsModule, CommonModule, NgbModule, FontAwesomeModule, Ng5SliderModule]
})

export class ChatBotSharedLibsModule {
    static forRoot() {
        return {
            ngModule: ChatBotSharedLibsModule
        };
    }
}
