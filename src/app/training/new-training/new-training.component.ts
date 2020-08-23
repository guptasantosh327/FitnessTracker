import { Component, OnInit, OnDestroy} from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import {AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore';
import {  Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit ,OnDestroy{
  isLoadingSub:Subscription;
  exerciseSub:Subscription;
  exercises:Exercise[];
  isLoading=false;
  private exerciseCollection:AngularFirestoreCollection<any>;
  

  constructor(private exerciseService:ExerciseService ,private db:AngularFirestore ,private uiService:UIService) { }

  ngOnInit(): void {
    this.isLoadingSub=this.uiService.isLoadingChanged
                          .subscribe(loading=>{
                            this.isLoading=loading;
                          })

   this.onFetchingExercises();
   this.exerciseSub=this.exerciseService.exercisesChanged
                        .subscribe(exercise=>{ 
                           this.exercises=exercise;  
                             })                                          

    }
    onFetchingExercises(){
      this.exerciseService.getExercise();
     
    }
    ngOnDestroy(){
      this.exerciseSub.unsubscribe();
      this.isLoadingSub.unsubscribe();
    }

  
  onTrainingStart(form:NgForm){
    this.exerciseService.startExercise(form.value.exercise);
  }

}
