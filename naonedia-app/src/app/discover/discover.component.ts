import { Component } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['discover.scss']
})
export class DiscoverComponent {
    lang: boolean

    constructor(private router: Router, private translateService: TranslateService) {
        this.lang = this.translateService.currentLang == 'en'

        this.translateService.onLangChange.subscribe((params: LangChangeEvent) => {
            this.lang = this.translateService.currentLang == 'en'
        });
    }

}
