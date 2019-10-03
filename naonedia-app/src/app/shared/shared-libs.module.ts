import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
    imports: [NgbModule, FontAwesomeModule, BrowserAnimationsModule, DragDropModule, Ng5SliderModule],
    exports: [FormsModule, ReactiveFormsModule, CommonModule, NgbModule, FontAwesomeModule, BrowserAnimationsModule, DragDropModule, Ng5SliderModule]
})

export class SharedLibsModule {
    static forRoot() {
        return {
            ngModule: SharedLibsModule
        };
    }
}
