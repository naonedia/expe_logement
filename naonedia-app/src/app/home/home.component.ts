import { Component, AfterContentInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent {
    cssStyle;

    constructor(private router: Router, private translateService: TranslateService, private sanitization: DomSanitizer) {}

    @HostListener('window:scroll', ['$event'])
    doSomething(event) {
        const scrolledY = window.pageYOffset;
        this.cssStyle = this.sanitization.bypassSecurityTrustStyle('background-position : left ' + (scrolledY) + 'px');
      }

    goToModel() {
        this.router.navigate(['model']);
    }

}
