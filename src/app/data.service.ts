import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Response,RequestOptions,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import "rxjs/Rx";
import {IConsoles} from "./dashboardhome/consolesInterface"
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class DataService {


  //apiRoot: string = "http://49.204.68.18:8871";

   apiRoot: string = "http://152.135.122.61:8871";

  //apiRoot: string = "http://127.0.0.1:8000";

  //  idToken = localStorage.getItem('csrftoken');
  //  options = { headers: new HttpHeaders({'Authorization': 'JWT '+ this.idToken}) };

  

constructor(private http:HttpClient,private cookie:CookieService) {
}
  
   
    // getConsoles():Observable<any>{
    //   return this.http.get('assets/json/consoles.json').map((response:Response)=>{
    //     console.log(response);
    //     return response;
        
    //   }).catch(this.handleError);
    // }

    getConsoles():Observable<IConsoles[]>{
      return this.http.get(this.apiRoot+'/api/getconsoles/').map((response:Response)=>{
        return response;
        
      }).catch(this.handleError);
    }


    getTools():Observable<any>{
    return this.http.get(this.apiRoot+'/api/test_tool_list/').map((response:Response)=>{
        return response;
      }).catch(this.handleError);
    }
    
    getAllTools():Observable<any>{
      return this.http.get(this.apiRoot+'/api/gettools').map((response:Response)=>{
        return response;
      }).catch(this.handleError);
    }

    sendIdGetToolPage(id){
      return this.http.get(this.apiRoot+'/api/test_tool_detail/'+id+'/').map((response:Response)=>{
        return response;
      }).catch(this.handleError)
    }

    sendIdGetUsers(id){
      return this.http.post(this.apiRoot+'/api/tools/'+id+'/user_utilization/',id).map((response:Response)=>{
        return response;
      }).catch(this.handleError);
    }

    sendIdGetProjects(id){
      return this.http.post(this.apiRoot+'/api/tools/'+ id + '/project_utilization/',id).map((response:Response)=>{
      return response;
      }).catch(this.handleError);
    }
    getAllprojects(){
      return this.http.get(this.apiRoot+'/api/projects').map((response:Response)=>{
          console.log('all projects',response);
          return response;

      }).catch(this.handleError);
    }
    saveNewProjects(data){
      // console.log(data);
      return this.http.post(this.apiRoot+'/api/projects/',data).map((response:Response)=>{
        return response;
      }).catch(this.handleError)
    }
    assignprojects(data,id){
      console.log(data,"this is object");
      console.log(id,"this is project id");
      return this.http.post(this.apiRoot+'/api/projects/'+id+'/assign-users/',data).map((response:Response)=>{
        return response;
      })
    }
    getlabtrends(pickers){
 
      let startdate=pickers.startDate;
      let enddate=pickers.endDate;
     
      return this.http.get(this.apiRoot+'/api/api_trends_overall/?start_date=' + 
      startdate.format('YYYY-MM-DD') +'&end_date='+ enddate.format('YYYY-MM-DD')).map((response:Response)=>{
        // console.log(response.trend,"waht is the contant")
        return response;
      })
    
    }
    projectedited(data){
      console.log(data,"wht is the data here coming");
      return this.http.put(this.apiRoot+'/api/projects/'+data.id+'/',data).map((response:Response)=>{
        return response;
      })
    
    }
    toolassignusers(data,id){
      console.log(data,"tool details");
      console.log(id,"this is users id");
      return this.http.post(this.apiRoot+'/api/tools/'+id+'/users/',data).map((response:Response)=>{
        return response;
      })
    }
    
    toolprojects(data,id){
      console.log(data,"tool details");
      console.log(id,"this is users id");
      return this.http.post(this.apiRoot+'/api/tools/'+id+'/assign-projects/',data).map((response:Response)=>{
        return response;
      })
    }
    
  

   callLogin(data){
   return this.http.post(this.apiRoot+'/api-token-auth/',data).map((response:Response)=>{
    return response;
    }).catch(this.handleError)
  }


  UpdateBays(data){
    return this.http.put(this.apiRoot+"/api/movebaytools/",data).map((response:Response)=>{
      return response;
    }).catch(this.handleError)
  }

  toolCategoryList(){
    return this.http.get(this.apiRoot+'/api/tool_category_list/').map((response:Response)=>{
      return response;
    }).catch(this.handleError)
  }

  updateConsoles(data){
    return this.http.put(this.apiRoot+"/api/updatebay/"+data.id+'/',data).map((response:Response)=>{
      return response;
      }).catch(this.handleError)
  }


  getToolUtilization(id){
    return this.http.post(this.apiRoot+"/api/tools/"+ id +'/utilization/',id).map((response:Response)=>{
      return response;
    }).catch(this.handleError)
  }

  getQtrToolUtilization(id){
    return this.http.put(this.apiRoot+"/api/tools/"+ id +'/tool_utilization_qtr/',id).map((response:Response)=>{
      return response;
    })
  }

  changestatus(data){
    return this.http.put(this.apiRoot+"/api/changestatus/",data).map((response:Response)=>{
      return response;
    }).catch(this.handleError)
  }

  sendDateGetTrends(trend){
    return this.http.put(this.apiRoot+'/api/tools/'+ trend.id +'/trend/?start_date='+ trend.startDate +'&end_date='+ trend.endDate,
    trend).map((response:Response)=>{
      return response;
    }).catch(this.handleError)
  }

  getOwners(){
		return this.http.get(this.apiRoot+'/api/gettoolowners/').map((response:Response)=>{
      return response;
    }).catch(this.handleError)
  }
  
  getToolCategory(){
    return this.http.get(this.apiRoot+'/api/gettoolcat/').map((response:Response)=>{
      return response;
    }).catch(this.handleError)
}

saveNewTools(data){
    return this.http.post(this.apiRoot+'/api/savenewtools/',data).map((response:Response)=>{
      return response;
    }).catch(this.handleError)
}

// loggedIn(){
//   return !!localStorage.getItem('csrftoken');
// }

getToken(){
  return localStorage.getItem('csrftoken');
}

dashboardCumulative(){
  return this.http.get(this.apiRoot+'/api/tools/'+'lab_utilization/').map((response:Response)=>{
    return response;
  })
}

dashboardQuaterly(){
  return this.http.get(this.apiRoot+'/api/tools/'+'lab_utilization_qtr/').map((response:Response)=>{
    return response;
  })
}

swapTools(data){
  return this.http.put(this.apiRoot+'/api/swaptools/',data).map((response:Response)=>{
    return response;
  }).catch(this.handleError)
}


getProjectReport(): Observable<any> {
  return this.http.get(this.apiRoot+'/api/export_project_xls').map((response: Response)=> {
      // const todos = response.json();
      // return todos.map((todo) => new Todo(todo));
    return response;
    })
}


sendDateGetReprts(data) {
  console.log(data.startDate);
  console.log(data.endDate);
  return this.http.post(this.apiRoot+'/api/export_tool_xls/?start_date=' + data.startDate +'&end_date='+ data.endDate,data).map((response:Response)=>{
    return response;
  })
}

getAllusers():Observable<any>{
     
  return this.http.get(this.apiRoot+'/api/user/user_info').map((response:Response)=>{
        return response;
  }).catch(this.handleError);
}

getProjectList(){
  return this.http.get(this.apiRoot+'/api/getprojects/').map((response:Response)=>{
    return response;
  }).catch(this.handleError)
}

saveNewuser(data){
  return this.http.post(this.apiRoot+'/api/user/user_info/',data).map((response:Response)=>{
    return response;
  }).catch(this.handleError)
}
getgroups(){

  return this.http.get(this.apiRoot+'/api/user/usergroup/').map((response:Response)=>{
    return response;
  })

}




  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}
  
    
