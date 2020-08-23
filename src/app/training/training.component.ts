import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  newTraining=false;
  exerciseSub:Subscription;
  constructor(private exerciseService:ExerciseService) { }

  ngOnInit(): void {
    this.exerciseSub=this.exerciseService.trainingStarted
                  .subscribe( exercise =>{
                      if(exercise){
                        this.newTraining=true;
                      }else{
                        this.newTraining=false;
                      }
                  });
  }

  ngOnDestroy(){
    this.exerciseSub.unsubscribe();
  }
}
