import {  Component, TemplateRef } from '@angular/core';

import { ToastService } from 'src/app/shared/services/toast.service.';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: {'[class.ngb-toast]': 'true'}
})
export class ToastComponent {
  show=true;
  constructor(public toastService: ToastService) {  
  }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
