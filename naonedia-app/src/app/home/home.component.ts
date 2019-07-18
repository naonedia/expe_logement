import { Component, AfterContentInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent {

    constructor(
        private router: Router,
        private translateService: TranslateService,
    ) { }
    goToModel() {
        this.router.navigate(['model']);
    }

}
