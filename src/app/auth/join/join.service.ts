import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Injectable()
export class JoinService {
  private stepsCount=4;
  private _currentStep=0;
  currentStep=new BehaviorSubject<number>(this._currentStep);
  onSummaryErrorSubmitted=new Subject<{}>();
  currentOperation=new BehaviorSubject<string>('pharmacy');
  whenStepsCompleted=new Subject();
  constructor(private storageService:DataStorageService,private http:HttpClient) { }
  getCities(){
    return this.storageService.getAllAreas().pipe(map(a=>a.filter(e=>!e.superAreaId)))
  }
  getAreasOfCityId(id:number){
    return  this.storageService.getAllAreas()
    .pipe(map(a=>a.filter(e=>e.superAreaId==id)));
  }
  goToNextStep(){
    if(this._currentStep+1==this.stepsCount){
      this.whenStepsCompleted.next();
      return;
    }
    this.currentStep.next(++this._currentStep);
  }
  goToPrevStep(){
    if(this._currentStep==0)return;
    this.currentStep.next(--this._currentStep);
  }
  reset(){
    setTimeout(() => {
      this._currentStep=0;
      this.currentStep.next(0);
      //this.whenStepsCompleted=new Subject();
    }, 0);
  }
}
