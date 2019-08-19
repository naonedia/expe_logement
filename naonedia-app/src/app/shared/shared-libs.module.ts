import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [NgbModule.forRoot(), FontAwesomeModule, BrowserAnimationsModule, DragDropModule],
    exports: [FormsModule, CommonModule, NgbModule, FontAwesomeModule, BrowserAnimationsModule, DragDropModule]
})

export class SharedLibsModule {
    static forRoot() {
        return {
            ngModule: SharedLibsModule
        };
    }
}
