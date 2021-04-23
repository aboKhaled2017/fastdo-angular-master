import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JoinService } from './join.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  providers:[JoinService]
})
export class JoinComponent implements OnInit {
  currentStep=0;
  isLastStep=false;
  constructor(private joinService:JoinService) { }
  type="";
  ngOnInit(): void {
    this.joinService.currentOperation
      .pipe(delay(0))
      .subscribe(val=>{
        this.type=val;
      });
    this.joinService.currentStep.subscribe(step=>{
      this.currentStep=step;
    });
    this.joinService.whenStepsCompleted.subscribe(()=>{
     this.isLastStep=true;
    });
  }
}
