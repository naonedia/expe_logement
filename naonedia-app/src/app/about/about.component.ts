import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['about.scss']
})
export class AboutComponent {

    constructor(private router: Router, private translateService: TranslateService) { }

}
