import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng5SliderModule } from 'ng5-slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [NgbModule.forRoot(), FontAwesomeModule, Ng5SliderModule, BrowserAnimationsModule, DragDropModule],
    exports: [FormsModule, CommonModule, NgbModule, FontAwesomeModule, Ng5SliderModule, BrowserAnimationsModule, DragDropModule]
})

export class ChatBotSharedLibsModule {
    static forRoot() {
        return {
            ngModule: ChatBotSharedLibsModule
        };
    }
}
