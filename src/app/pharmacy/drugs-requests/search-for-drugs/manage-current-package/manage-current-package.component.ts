import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrugsRequestsService } from '../../drugs-requests.service';
import { ISelectedPackage } from '../../models/PharmaPackagesModel';

@Component({
  selector: 'app-manage-current-package',
  templateUrl: './manage-current-package.component.html',
  styleUrls: ['./manage-current-package.component.scss']
})
export class ManageCurrentPackageComponent  {

  subscriptions:Subscription[]=[];
  packages:{id:string,name:string}[]=[];
  currentPackage:ISelectedPackage;
  constructor(private _service:DrugsRequestsService) { 
    this.subscriptions.push(this._service.currentSelectedPackage.subscribe(e=>{
      this.currentPackage=e;
    }));
    this.subscriptions.push(this._service.onFetchPackages.subscribe(_packs=>{
      this.packages=_packs.map(e=>({
        id:e.packageId,
        name:e.name
      }));
    }));
  }
 get selectedPackageId(){
   return this.currentPackage?.original?.packageId || undefined;
 }
 get isPackageChanged(){
   return this.currentPackage.isChanged;
 }
 ngOnDestroy(): void {
  this.subscriptions.forEach(e=>e.unsubscribe());
 }

onSelectedPackgChange(id:string){
  this._service.setCurrentSelectedPackage(id).subscribe(()=>{},()=>{});
}
 onSaveChanges(){
    this._service.savePackageChanges();
}
}
