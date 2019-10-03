import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from '../shared';
import { EstimateInput } from '../shared/model/estimateInput.model';
import { ParticipateInput } from '../shared/model/participateInput.model';
import { Stats } from '../shared/model/stats.model';

@Injectable({ providedIn: 'root' })
export class PredictService {
    headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });
    public resourceUrl = `/api`;

    constructor(protected http: HttpClient) { }

    estimate(userInput: EstimateInput, req?: any): Observable<any> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.post<any>(
                `${this.resourceUrl}/estimate`,
                userInput,
                { headers: this.headers, params: options, observe: 'response' }
            ).subscribe(response => observer.next(response.body), error => observer.error());
        });
    }

    participate(userInput: ParticipateInput, req?: any): Observable<any> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.post<any>(
                `${this.resourceUrl}/participate`,
                userInput,
                { headers: this.headers, params: options, observe: 'response' }
            ).subscribe(response => observer.next(response.body), error => observer.error());
        });
    }

    stats(stats: Stats, req?: any): Observable<any> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.post<any>(
                `${this.resourceUrl}/stats`,
                stats,
                { headers: this.headers, params: options, observe: 'response' }
            ).subscribe(response => observer.next(response.body), error => observer.error());
        });
    }
}
