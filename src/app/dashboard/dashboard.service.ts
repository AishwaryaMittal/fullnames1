import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNamesRef: any;
  lastNamesRef: any;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,

    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    //this.searchHistoryRef.push({ firstName: firstName, lastName: lastName});
    this.firstNamesRef= this.db.list('firstNames');
    this.lastNamesRef= this.db.list('lastNames');
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
  getFirstNames(){
    return this.firstNamesRef.valueChanges(); 
  }
  getLastNames(){
    console.log("in last names");
   return this.lastNamesRef.valueChanges();  
  }
  recordSearch(firstName: string, lastName: string) {
    this.searchHistoryRef.push(
      {firstName: firstName, 
       lastName: lastName
      });
    console.log("Searched " + firstName + " " + lastName);
  }
}

