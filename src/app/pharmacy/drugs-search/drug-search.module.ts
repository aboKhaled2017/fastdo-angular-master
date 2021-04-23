import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugsSearchComponent } from './drugs-search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DrugSearchFiltersComponent } from './drug-search-filters/drug-search-filters.component';
import { DrugSearchResultComponent } from './drug-search-result/drug-search-result.component';
import { DruSearchSortingComponent } from './dru-search-sorting/dru-search-sorting.component';
import { DrugSearchCardComponent } from './drug-search-result/drug-search-card/drug-search-card.component';



@NgModule({
  declarations: [DrugsSearchComponent, DrugSearchFiltersComponent,
     DrugSearchResultComponent, DruSearchSortingComponent, DrugSearchCardComponent],
  exports: [RouterModule],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
    {path:'',component:DrugsSearchComponent}
  ])]
})
export class DrugSearchModule { }
