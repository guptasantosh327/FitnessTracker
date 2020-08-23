import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit ,OnDestroy{
  isLoading=false;
  isLoadingSub:Subscription;
  maxDate;
  constructor(private authService:AuthService ,private uiService:UIService) { }

  ngOnInit(): void {
    this.maxDate= new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    this.isLoadingSub=this.uiService.isLoadingChanged.subscribe(isloadingStatus=>{
      this.isLoading=isloadingStatus;
    })
  }

  ngOnDestroy(){
    this.isLoadingSub.unsubscribe();
  }
  onSubmit(form:NgForm){
    this.authService.registeredUser({
      email:form.value.email,
      password:form.value.password   
    })
    
  }

}
