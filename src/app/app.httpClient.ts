import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {HTTP_CONFIG} from "./app.constant";
import {AuthenticationHelper} from "./app.authentication";

@Injectable()
export class HttpClientHelper {
    baseUrl: String = HTTP_CONFIG.baseUrl;

    constructor(private http: Http,
                private authService: AuthenticationHelper) {
        this.http = http;
    }

    /**
     * createAuthorizationHeader -
     * send 2 keys -
     * content-type : application / Json
     * Authorization : auth_token <token>
     * function to create Authorization header.
     */

    createAuthorizationHeader(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.tokenKey + ' ' + this.authService.getToken());
        return headers;
    }

    /**
     * Performs a request with `get` http method.
     *
     * @param url
     */

    get (url): Observable<any> {
        url = this.baseUrl + url;
        const headers = this.createAuthorizationHeader();
        return this.http.get(url, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    postPreLogin(url, data): Observable<any> {
        let body = JSON.stringify(data);
        let headers = this.createAuthorizationHeader();
        url = this.baseUrl + url;
        return this.http.post(url, body, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    /**
     * Performs a request with `post` http method.
     * @param url
     * @param data
     */
    post(url, data): Observable<any> {
        const body = JSON.stringify(data);
        const headers = this.createAuthorizationHeader();
        url = this.baseUrl + url;
        return this.http.post(url, body, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    /**
     * Performs a request with `put` http method.
     * @param url
     * @param data
     */
    put(url, data): Observable<any> {
        const body = JSON.stringify(data);
        const headers = this.createAuthorizationHeader();
        url = this.baseUrl + url;
        return this.http.put(url, body, {headers: headers})
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    /**
     * Performs a request with `delete` http method.
     * @param url
     */
    delete(url: string): Observable<any> {
        let options: RequestOptions;
        const headers = this.createAuthorizationHeader();
        options = new RequestOptions({headers: headers});
        return this.http.delete(this.baseUrl + url, options)
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    /**
     * Converts response into json.
     */
    extractResponse(res: Response) {
        const body = res.json();
        return body;
    }

    /**
     *  Handles error comming in response.
     */

    private handleError(error: Response): Observable<any> {
        let result = error.json();
        if (!result || !result.error_message) {
            result.error_message = 'Something went wrong.';
        }
        else {
            if (result.error_code === '102' || result.error_code === '103') {
                this.authService.removeLoggedIn();
            }
        }
        return Observable.throw(result || 'Server error');
    }

}
