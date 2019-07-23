import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared';

@Injectable({ providedIn: 'root' })
export class PeliasService {
    public resourceUrl = `http://${SERVER_API_URL}:4000/v1`;

    constructor(protected http: HttpClient) { }

    getAutoComplete(text: string, req?: any): Observable<any[]> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.get<any>(`${this.resourceUrl}/autocomplete?focus.point.lat=47.218371&focus.point.lon=-1.553621&text=${text}&size=10'`, { params: options, observe: 'response' })
                .subscribe(response => observer.next(response.body.features), error => observer.error());
        });
    }

    getAdress(longitude: number, latitude: number, req?: any): Observable<any[]> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.get<any>(`${this.resourceUrl}/reverse?point.lat=${latitude}&point.lon=${longitude}`,
                { params: options, observe: 'response' })
                .subscribe(response => (observer.next(response.body)), error => observer.error());
        });
    }
}
