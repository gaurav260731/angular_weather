import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
  }

  login(username, password):Subject<any> {
    const val =  new Subject();  
     this.http.get(`http://localhost/api/User/login.php?username=${username}&password=${password}`).subscribe((data:any) =>{
      val.next(data);
    });
    return val;
  }
}