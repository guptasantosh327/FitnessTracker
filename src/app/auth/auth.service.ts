import {Injectable} from '@angular/core';
import {AuthData} from './auth-data.model';
import {User} from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import { ExerciseService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
@Injectable()
export class AuthService{

    constructor(private router:Router,
                private afAuth:AngularFireAuth,
                private exerciseService:ExerciseService,
                private snackbar:MatSnackBar,
                private uiService:UIService){}


    isAuthenticated=false;
    authchange= new Subject<boolean>();
    private user:User;

    AuthstatusListner(){
        this.afAuth.authState.subscribe(user=>{
            if(user){
                this.isAuthenticated=true;
                this.authchange.next(true);
                this.router.navigate(['/training']);
            }else{
                this.exerciseService.cancelSubscription();
                this.isAuthenticated=false;
                this.authchange.next(false);
                this.router.navigate(['/login']);
                
            }
        })
    }

    registeredUser(authData:AuthData){
        this.uiService.isLoadingChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email,authData.password)
                .then( result=>{
                    this.uiService.isLoadingChanged.next(false);
                })
                .catch(error=>{
                    this.uiService.isLoadingChanged.next(false);
                    this.uiService.showSnackBar(error.message,null,5000);     
                })
        
    }

    loginUser(authData:AuthData){
        this.uiService.isLoadingChanged.next(true);
        this.afAuth.signInWithEmailAndPassword(authData.email,authData.password)
        .then( result=>{
            this.uiService.isLoadingChanged.next(false);       
        })
        .catch(error=>{
            this.uiService.isLoadingChanged.next(false);
            this.uiService.showSnackBar(error.message,null,5000);
        })
      

    }
    logOut(){
        this.afAuth.signOut();  
    }
   
    isAuth(){
        return this.isAuthenticated!=false;
    }

   
    
    }



// if request.time < timestamp.date(2020, 8, 8);