import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ParticipateInput } from '../shared/model/participateInput.model';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['result.scss']
})
export class ResultComponent implements OnInit {
    userInput: ParticipateInput;
    price: number = NaN;

    constructor(private router: Router, private translateService: TranslateService) {
        const extras = this.router.getCurrentNavigation().extras
        if (extras.state && extras.state.price) {
            this.price = extras.state.price
        }
        if (extras.state && extras.state.userInput) {
            this.userInput = extras.state.userInput
        } else {
            this.router.navigate(['accessdenied'])
        }

    }

    ngOnInit() { }
}
