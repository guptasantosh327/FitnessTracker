import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  isAuth=false;
  authSubscription:Subscription
  @Output() sidenavopen= new EventEmitter<void>();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription=this.authService.authchange.subscribe(result=>{
      this.isAuth=result;
    })

  }
  onLogout(){
    this.authService.logOut();
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

  onSidenavToggle(){
    this.sidenavopen.emit();
  }

}
