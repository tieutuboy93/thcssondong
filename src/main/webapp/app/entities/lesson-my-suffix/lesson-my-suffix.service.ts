import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LessonMySuffix } from './lesson-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LessonMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/lessons';

    constructor(private http: Http) { }

    create(lesson: LessonMySuffix): Observable<LessonMySuffix> {
        const copy = this.convert(lesson);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(lesson: LessonMySuffix): Observable<LessonMySuffix> {
        const copy = this.convert(lesson);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<LessonMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }
    queryByWeekIdForTeacher(weekId: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl + '/byweek/'}${weekId}`)
            .map((res: Response) => this.convertResponseLessonByTeacher(res));
    }
    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
    private convertResponseLessonByTeacher(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        // const result = [];
        // for (let i = 0; i < jsonResponse.length; i++) {
        //     result.push(this.convertItemFromServer(jsonResponse[i]));
        // }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
    /**
     * Convert a returned JSON object to LessonMySuffix.
     */
    private convertItemFromServer(json: any): LessonMySuffix {
        const entity: LessonMySuffix = Object.assign(new LessonMySuffix(), json);
        return entity;
    }

    /**
     * Convert a LessonMySuffix to a JSON which can be sent to the server.
     */
    private convert(lesson: LessonMySuffix): LessonMySuffix {
        const copy: LessonMySuffix = Object.assign({}, lesson);
        return copy;
    }
    convertOpen(json: any): LessonMySuffix[] {
        const result = [];
        for (let i = 0; i < json.length; i++) {
            result.push(this.convertItemFromServer(json[i]));
        }
        return result;
    }
}
