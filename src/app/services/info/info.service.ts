import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    protected http: HttpClient
  ) { }

  private handleError( errorResponse: HttpErrorResponse ) {
    if ( errorResponse.error instanceof ErrorEvent) {
      console.error('cliente Side Error', errorResponse.error.message);
    } else {
      console.error('Server Side Error', errorResponse.error.message);
    }
    return throwError('there is a problem with the service. We are working to solve that..thx U');
  }

  checkApiKey(key: string){
    return this.http.get('https://api.com/check&key=' + key);
  }

  public createResource(key: string, sms: any  ): Observable<any> {
    return this.http.post<any>('https://api.com/send_message', sms, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': key
      })
    }).pipe(catchError(this.handleError));
  }

  getSendedMessages(key: string) {
    return this.http.get('https://api.com/sended_messages&key=' + key);
  }


}
