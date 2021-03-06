import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  getSteamInfo(steamURL: string) {
    return this.http.get<any>('/steamsearch/'+ steamURL);
  }

  //getUserLibrary(){};
}
