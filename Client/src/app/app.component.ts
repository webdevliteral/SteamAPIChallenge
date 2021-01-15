import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({ //Component Decorator - always use @
  selector: 'app-root',
  templateUrl: './app.component.html', //direct to the html portion of component
  styleUrls: ['./app.component.css'] //css for specific component
})

export class AppComponent{

  constructor(private _http: HttpService) {}
  //results: any[] = [];
  title = 'SteamSuggest';
  //curSearch: string = '';
  //newSearch: string = '';
  //hasSearched: boolean = false;



  


}





// In HTML, routerLink specifices the target page/destination
