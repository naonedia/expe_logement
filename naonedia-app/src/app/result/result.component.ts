import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ParticipateInput } from '../shared/model/participateInput.model';
import { PredictService } from '../service';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['result.scss']
})
export class ResultComponent {
    userInput: ParticipateInput;
    price: number = NaN;

    constructor(private router: Router, private predictService: PredictService, private translateService: TranslateService) {
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

    onSubmit() {
        this.predictService.participate(this.userInput).subscribe(res => {
            this.router.navigate(['/result'],{ state: { userInput: this.userInput } });
        });
    }
}
