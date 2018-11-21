import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of} from 'rxjs'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstNamesRef: any[];
  lastNamesRef: any[];
  fullNamesRef: any[];
  isExist: Boolean;
  constructor(private dashboardService: DashboardService, private db: AngularFireDatabase) {
    this.searches = [];
  }

  /*constructor(private dashboardService: DashboardService) {
    this.searches = [];
  }
  */
/*
  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }
*/
  ngOnInit() {
  }
  getData(){
    
    this.dashboardService.getFirstNames().subscribe((firstNames: any) =>{
    this.firstNamesRef=firstNames;
      console.log(" this is the firstNames");
      //console.log(firstNames);
      console.log(" this is the firstNames");
    }
    );
  }

  getLastNameData(){
    
    this.dashboardService.getLastNames().subscribe((lastNames: any) =>{
    this.lastNamesRef=lastNames;
      console.log(" this is the lastNames");
      //console.log(lastNames);
      console.log(" this is the lastNames");
    }
    );
    }


  getFullNameData(){
    
    console.log(" this is the Full Names");
    //console.log(this.getData()+this.getLastNameData());
    }

    searchHistory() {
      this.dashboardService.getSearchHistory().subscribe( (history: any) => {
        this.searches = history;
      });
    }
  
  
    addName(firstName: string, lastName: string) {
      this.db.list('names/first-names').set(firstName, true);
      this.db.list('names/last-names').set(lastName, true);
      console.log(firstName + ' ' + lastName + 'added successfully.');
    }
  
    searchFullName(firstName: string, lastName: string) {
      console.log("searching " + firstName + " " + lastName);
      this.dashboardService.recordSearch(firstName, lastName);
      this.getName(firstName, lastName).subscribe(isExist => {
        this.isExist = isExist;
      });
    }
  
    getName(firstName: string, lastName: string) {
      var fn = this.db.object('names/first-names/' + firstName).snapshotChanges();
      var ln = this.db.object('names/last-names/' + lastName).snapshotChanges();
  
      return fn.switchMap(fn1 => 
        ln.switchMap(ln1 => {
          return of((fn1.payload.val() === true) && (ln1.payload.val() === true));
        })
      );
    }
    
}
