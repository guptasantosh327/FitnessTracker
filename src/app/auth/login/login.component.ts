import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy {
  isLoading=false;
  isLoadingSub:Subscription;
  constructor(private authService:AuthService, private uiService:UIService) { }

  ngOnInit(): void {
    this.isLoadingSub=this.uiService.isLoadingChanged.subscribe(isloadingStatus=>{
                            this.isLoading=isloadingStatus;
                          })
    
  }
  onSubmit(form:NgForm){
    this.authService.loginUser({
      email:form.value.email,
      password:form.value.password
    })
  }
  ngOnDestroy(){
    this.isLoadingSub.unsubscribe();
  }

}
