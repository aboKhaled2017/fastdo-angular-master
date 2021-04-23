import { Component, Input } from "@angular/core";

@Component({
    selector: 'v-tab',
    template:`
    <ng-content *ngIf="!template"></ng-content>
    <ng-container *ngIf="template"
        [ngTemplateOutlet]="template">
    </ng-container>
    `
  })
export class VTabComponent{
    @Input() active = true;
    @Input() template;
}