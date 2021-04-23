import { Component, Input, OnInit } from '@angular/core';
import { IDrugModel } from '../../../Models/DrugModel';

@Component({
  selector: 'app-drug-to-package',
  templateUrl: './drug-to-package.component.html',
  styleUrls: ['./drug-to-package.component.scss']
})
export class DrugToPackageComponent implements OnInit {

  @Input() drug:IDrugModel;
  constructor() { }

  ngOnInit(): void {
  }

}
