import { Exercise } from "./exercise.model";
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription, throwError } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable()
export class ExerciseService{

    private subscription:Subscription[]=[];
    trainingStarted= new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    postExerciseChanged= new Subject<Exercise[]>();

    private exerciseCollection:AngularFirestoreCollection<any>;
    private availableExercise:Exercise[]=[];
    private runningExercise:Exercise;
    private postExercises:Exercise[]=[];

    constructor(private db:AngularFirestore,private uiService:UIService){}

    getExercise(){
        this.exerciseCollection= this.db.collection('availableExercises');
        this.subscription.push(this.exerciseCollection.snapshotChanges()
                              .pipe(map( dataArray=>{
                                // throw(new Error());
                                    return dataArray.map( doc =>{
                                    const data = doc.payload.doc.data();
                                    const id= doc.payload.doc.id;
                                    return { id,...data};
                              })
                            })
                            )
                            .subscribe(arr=>{
                                this.availableExercise=arr;
                                this.exercisesChanged.next(this.availableExercise);
                            },error=>{
                                this.uiService.showSnackBar('Fetching Failed! Try Again after some time',null,3000);
                                this.exercisesChanged.next(null);
                            })   )               

                              
    }

    startExercise(selectedId:string){
        this.availableExercise.find(ex=>{
            if(ex.id===selectedId){
                this.runningExercise=ex;
            }
            
        });
        this.trainingStarted.next({...this.runningExercise});  

    }

    completedExercise(){
        this.onAddDataToDatabase({...this.runningExercise ,date:new Date() ,state:'Completed'})
        this.runningExercise=null;
        this.trainingStarted.next(null);
    }
    cancelExercise(progress:number){
        this.onAddDataToDatabase({...this.runningExercise ,
            duration:this.runningExercise.duration * (progress/100),
            calories:this.runningExercise.calories * (progress/100),
            date:new Date() ,
            state:'Cancelled'})
        this.runningExercise=null;
        this.trainingStarted.next(null);

    }

    getRunningExercise(){
        return {...this.runningExercise};
    }

    completedOrCancelExercise(){
        this.subscription.push(this.db.collection('postExercise').valueChanges()
        .subscribe(
            (exercise:Exercise[])=>{
                this.postExercises=exercise;
                this.postExerciseChanged.next(this.postExercises);
            }
        ))
    }

    private onAddDataToDatabase(exercise:Exercise){
        this.db.collection('postExercise').add(exercise);
    }

    cancelSubscription(){
        this.subscription.forEach(sub=>sub.unsubscribe())
    }
}