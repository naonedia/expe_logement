import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared';

@Injectable({ providedIn: 'root' })
export class ModelService {
    public resourceUrl = SERVER_API_URL + 'api/model';

    constructor(protected http: HttpClient) {}

    getModel(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return new Observable((observer) => {
            this.http.get<any>(`${this.resourceUrl}/getmodel`, { params: options, observe: 'response' })
            .subscribe(response => (observer.next(response.body)), error => observer.error());
        });
    }
}
