import { Component, Input, OnInit, OnChanges, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { moment } from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public internalVal = null;
  token:any;
  messageresponse:string;
 
  constructor(private cookie:CookieService,private _logindata:DataService,
  private route:ActivatedRoute,private router:Router,private _http:HttpClient) { 

    // router.events.subscribe(event => {
    //   if(event instanceof NavigationStart) {
    //     if(!this.cookie.get('token')){
    //       this.router.navigate(['login']);
    //     }
    //     else{
    //       return;
    //     }
    //   }
    // });

    // if(!localStorage.getItem('csrftoken')){
    //   console.log("NO TOKEN IN APP");
    //   this.router.navigate(['']);
    // }
    
  }
 

  ngOnInit(){

    this.router.navigate(['dashboard/bayhome']);

  
    this.submit();
    // this.cookie.get('csrftoken')
  //   console.log(this.cookie.get('csrftoken'));
  //   if (this.cookie.get('csrftoken')) {
  //     this.log = !this.log;
  // } else {
  //     this.log = this.log;
  // }
    // console.log('CALL ALWAYS')
    // this._http.get('assets/json/config.json').subscribe(data=>{
    //   console.log(data);

    // })
    
  }

  submit(){
    let loginData = {email:"bay@amat.com",password:'bay123'};
    console.log('LOGINOBJ',loginData);
   this._logindata.callLogin(loginData).subscribe(data =>{
     console.log('ABCD0',data);
     this.token = data;
     console.log('LOGINOBJ in APP',this.token);
     if (this.token.token) {
       const expiresAt = moment().add(this.token.expiresIn,'second');

       localStorage.setItem('csrftoken', this.token.token);
       localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
       // this.cookie.set("csrftoken",this.token.token);
       console.log('local token',localStorage.getItem('csrftoken'))
       
     }
   }, (err)=> {
       this.messageresponse = "Please check your email or password";
   })
 }
 


  // changeOfRoutes(){
  //   console.log("activate function called");
  //   if(!localStorage.getItem('csrftoken')){
  //     console.log("NO TOKEN IN APP");
  //     this.router.navigate(['']);
  //   }
  // }

  // logout(){
  //   this.cookie.deleteAll();
  //   this.router.navigate(['']);
  // }

  

  






  /*if (!$cookies.get('token')) {
      $rootScope.action = true;
  } else {
      $rootScope.action = false;
  }*/


}
