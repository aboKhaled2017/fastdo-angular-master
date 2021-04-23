import { TemplateRef } from "@angular/core";


  
export class ToastService {
  toasts: any[] = [];
  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  showSuccess(textOrTpl: string | TemplateRef<any>, options: any = {}){
    this.toasts.push({ textOrTpl, ...options ,classname: 'bg-success text-light'});
  }
  showError(textOrTpl: string | TemplateRef<any>, options: any = {}){
    this.toasts.push({ textOrTpl, ...options ,classname: 'bg-danger text-light'});
  }
  showInfo(textOrTpl: string | TemplateRef<any>, options: any = {}){
    this.toasts.push({ textOrTpl, ...options ,classname: 'bg-info text-light'});
  }
  showAlert(textOrTpl: string | TemplateRef<any>, options: any = {}){
    this.toasts.push({ textOrTpl, ...options ,classname: 'bg-alert text-light'});
  }
  // Callback method to remove Toast DOM element from view
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
