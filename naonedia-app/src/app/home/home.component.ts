import { Component, AfterContentInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent {
    ytIframe: any;

    constructor(
        private router: Router,
        private translateService: TranslateService,
        private embedService: EmbedVideoService
    ) {
        this.ytIframe = this.embedService.embed('https://www.youtube.com/embed/f1xz5KeYmX0?rel=0&amp;showinfo=1');
    }
    goToModel() {
        this.router.navigate(['model']);
    }

}
