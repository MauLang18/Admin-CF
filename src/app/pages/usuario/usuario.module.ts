import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioManageComponent } from './components/usuario-manage/usuario-manage.component';
import { SharedModule } from '@shared/shared.module';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { SearchBoxMultipleComponent } from '@shared/components/reusables/search-box-multiple/search-box-multiple.component';
import { MenuComponent } from '@shared/components/reusables/menu/menu.component';
import { ExportExcelComponent } from '@shared/components/reusables/export-excel/export-excel.component';
import { FilterDateRangeYmdComponent } from '@shared/components/reusables/filter-date-range-ymd/filter-date-range-ymd.component';
import { ButtonResetFiltersComponent } from '@shared/components/reusables/button-reset-filters/button-reset-filters.component';
import { ImgSelectorComponent } from '@shared/components/reusables/img-selector/img-selector.component';
import { ImportExcelComponent } from '@shared/components/reusables/import-excel/import-excel.component';


@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioManageComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ListTableComponent,
    SearchBoxMultipleComponent,
    MenuComponent,
    ExportExcelComponent,
    ImportExcelComponent,
    FilterDateRangeYmdComponent,
    ButtonResetFiltersComponent,
    ImgSelectorComponent,
  ]
})
export class UsuarioModule { }
