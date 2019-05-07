import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    constructor(
        private translateService: TranslateService) {
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languages = this.translateService.getLangs();
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    changeLanguage(languageKey: string) {
        this.translateService.use(languageKey);
    }
}
