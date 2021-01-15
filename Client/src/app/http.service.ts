import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const PORT = process.env.PORT || 3000;

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  getSteamInfo(steamURL: string) {
    return this.http.get<any>('http://localhost:' + PORT + '/steamsearch/'+ steamURL);
  }

  //getUserLibrary(){};
}
