import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  isAuth=false;
  @Output() sidenavlist= new EventEmitter<void>();
  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.authchange.subscribe( authStatus =>{
      this.isAuth=authStatus;
    })
  }

  onSidenavclose(){
    this.sidenavlist.emit();
  }

  onLogout(){
    this.authService.logOut();
    this.onSidenavclose();
  }

}
