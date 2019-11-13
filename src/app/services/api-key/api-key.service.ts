import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  apiKey: string;

  constructor() { }

  public getKey(){
    return localStorage.getItem('api-key');
  }

  public setKey(key: string){
    localStorage.setItem('api-key', key);
  }

  public deleteKey(){
    localStorage.removeItem('api-key');
  }
}
