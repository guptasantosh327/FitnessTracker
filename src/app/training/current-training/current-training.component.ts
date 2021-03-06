import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent} from './stop-training.component';
import { ExerciseService } from '../exercise.service';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress=0;
  timer=0;
  constructor( private dialog:MatDialog , private exerciseService:ExerciseService) { }

  ngOnInit(): void {
   this.onStartorResume();
  
  }

  onStartorResume(){
    const step=this.exerciseService.getRunningExercise().duration/100 *1000
    this.timer= setInterval(()=>{
      this.progress=this.progress+1;
      if(this.progress>=100){  
        this.exerciseService.completedExercise(); 
        clearInterval(this.timer);
      }
    },step);
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef=this.dialog.open( StopTrainingComponent,{
     data:{
       progress:this.progress,
     }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.exerciseService.cancelExercise(this.progress);
      } else{
        this.onStartorResume();
        
      }
    })
  }
  

}
