import { Component, Input, OnInit } from '@angular/core';
import { IDrugModel } from '../../../Models/DrugModel';

@Component({
  selector: 'app-drug-package-status',
  templateUrl: './drug-package-status.component.html',
  styleUrls: ['./drug-package-status.component.scss']
})
export class DrugPackageStatusComponent implements OnInit {

  @Input() drug:IDrugModel;
  constructor() { }

  ngOnInit(): void {
  }

}
