import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api/api.service';
import { LoginService } from './login.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  username:any;
  password:any;
  val:any;
  public user: User;

  constructor(private router:Router,private auth:ApiService,private loginService: LoginService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  validateLogin() {
    if(this.user.username && this.user.password) {
        this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if(result['status'] === 'success') {
          this.router.navigate(['/']);
        } else {
          alert('Wrong username password');
        }
         
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }
  }

  login() {
    //console.log(this.username);
    //console.log(this.password);
    this.auth.login(this.username, this.password).subscribe((data:any)=>{ 
        this.val = JSON.stringify(data.status)
        if(data.status == true) {
          this.router.navigateByUrl('/');
        }else {
          alert(data.message);
          this.router.navigateByUrl('/login');
        }
    });
    console.log('value');
    //this.router.navigateByUrl('/');
  }

}
