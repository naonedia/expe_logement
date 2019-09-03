import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-explain',
    templateUrl: './explain.component.html',
    styleUrls: ['explain.scss']
})
export class ExplainComponent {

    constructor(private router: Router, private translateService: TranslateService) { }
}
