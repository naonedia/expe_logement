import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HealthcheckService } from '../service';

@Component({
    selector: 'app-healthcheck',
    templateUrl: './healthcheck.component.html'
})

export class HealthcheckComponent implements OnInit{

    constructor(private router: Router, private translateService: TranslateService, private healthcheckService: HealthcheckService) {}
    
    status: any

    ngOnInit() {
        this.status.api = false
        this.status.ors = false
        this.status.pelias = false

        this.healthcheckService.getAPIServiceHealthcheck().subscribe(res => {
            this.status.api = res == 'ok'
        });

        this.healthcheckService.getOpenRouteServiceHealthcheck().subscribe(res => {
            this.status.ors = res.status == 'ready'
        });

        this.healthcheckService.getPeliasServiceHealthcheck().subscribe(res => {
            this.status.pelias = res.includes('green')
        });
    }
}