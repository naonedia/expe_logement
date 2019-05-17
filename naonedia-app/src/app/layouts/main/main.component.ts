import { Component, OnInit } from '@angular/core';
import { Router, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './main.component.html',
    styleUrls: ['main.scss']
})
export class MainComponent implements OnInit {
    title = 'naonedia-app';

    constructor(private translateService: TranslateService, private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }
}
