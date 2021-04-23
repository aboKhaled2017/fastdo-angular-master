
import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent  {
  

  constructor(private router:Router) {}
  onClickAppTitle(){
    this.router.navigate(['/']);
  }

}
