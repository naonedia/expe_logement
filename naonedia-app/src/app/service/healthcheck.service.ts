import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { createRequestOption } from '../shared';

@Injectable({ providedIn: 'root' })
export class HealthcheckService {

    constructor(protected http: HttpClient) { }

    getOpenRouteServiceHealthcheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.get<any>(`/ors/healthcheck`, { params: options, observe: 'response' })
                .subscribe(response => observer.next(response.body), error => observer.error());
        });
    }

    getPeliasServiceHealthcheck(req?: any): Observable<string> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.get<any>(`/pelias/healthcheck`, { params: options, observe: 'response' })
                .subscribe(response => observer.next(response.body), error => observer.error());
        });
    }

    getAPIServiceHealthcheck(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.get<any>(`/api/healthcheck`, { params: options, observe: 'response' })
                .subscribe(response => observer.next(response.body), error => observer.error());
        });
    }
}
