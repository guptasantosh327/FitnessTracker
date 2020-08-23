import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summary-training',
  templateUrl: './summary-training.component.html',
  styleUrls: ['./summary-training.component.css']
})
export class SummaryTrainingComponent implements OnInit ,AfterViewInit,OnDestroy{

  postExerciseSub:Subscription;
  displayedColumns=['date','name','duration','calories','state']
  dataSource= new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  
  constructor(private exerciseService:ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.completedOrCancelExercise();
    this.postExerciseSub=this.exerciseService.postExerciseChanged
                              .subscribe(exercise=>{
                                this.dataSource.data=exercise;
                              })
   
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }
  doFilter(filtervalue:string){
    this.dataSource.filter=filtervalue.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.postExerciseSub.unsubscribe();
  }
}
