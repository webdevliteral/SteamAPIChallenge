import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-steamsearch',
  templateUrl: './steamsearch.component.html',
  styleUrls: ['./steamsearch.component.css']
})
export class SteamsearchComponent implements OnInit {
  steamUserInfo: any[] = [];
  steamUserObject: any = {};
  steamUserLibrary: any = [];
  steamURL: string = '';
  sortedGames: any[] = [];
  suggestedGames: any[] = [];
  saniURL: string = 'steam://run/';

  constructor(private _http: HttpService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getSteamInfo() {
    this._http.getSteamInfo(this.steamURL).subscribe(data => {
      if(this.steamURL != null){
        this.steamUserInfo = data;
        this.steamUserObject = this.steamUserInfo[0];
        this.steamUserLibrary = this.steamUserInfo[1];
        this.convertPlaytime();
        this.sortedGames = this.sortSuggested();
        this.suggestGames();
      } else {
        console.log('No user found.');
      }
    });
  }

  convertPlaytime() {
    for (var i = 0; i < this.steamUserLibrary.length; i++) {
      this.steamUserLibrary[i].playTime /= 60;
      this.steamUserLibrary[i].playTime = this.steamUserLibrary[i].playTime.toFixed(2);
      this.steamUserLibrary[i].playTime2 /= 60;
      this.steamUserLibrary[i].playTime2 = this.steamUserLibrary[i].playTime2.toFixed(2);
    };
  }

  sortSuggested() {
    var sortedGameList: Object[];
    sortedGameList = this.steamUserLibrary.sort((game1:any, game2:any) => {
      if(Number(game1.playTime) > Number(game2.playTime)){
        return -1;
      };

      if(Number(game1.playTime) < Number(game2.playTime)){
        return 1;
      };

      return 0;
    });
    return sortedGameList;
  }

  suggestGames() {
    var recentlyPlayed: any[] = [];
    this.suggestedGames = [];
    //check games with low playtime and not recently played
    //display suggestions
    for(var i = 0; i < this.sortedGames.length; i++){
      if(this.sortedGames[i].playTime2 > 0){
        recentlyPlayed.push(this.sortedGames[i]);
      }
    }
    for(var i = 0; i < 5; i++){
      if(this.sortedGames != null){
        this.suggestedGames.push(this.sortedGames[i]);
      } else {
        console.log('Games have not been sorted yet. Cant make a suggestion.');
      } 
    }
  }

  getSanitizedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
