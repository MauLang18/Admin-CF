import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { LogsService } from '@shared/services/logs.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { PolService } from '../../services/pol.service';
import { PolResponse } from '../../models/pol-response.interface';
import { RowClick } from '@shared/models/row-click.interface';
import { DateRange, FiltersBox } from '@shared/models/search-options.interface';
import { componentSettings } from './pol-list-config';
import { PolManageComponent } from '../pol-manage/pol-manage.component';
import Swal from 'sweetalert2';
import { LogsRequest } from '@shared/models/logs-request.interface';

@Component({
  selector: 'vex-pol-list',
  templateUrl: './pol-list.component.html',
  styleUrls: ['./pol-list.component.scss'],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class PolListComponent implements OnInit {
  component: any;
  user = JSON.parse(localStorage.getItem('users'));

  constructor(
    customTitle: CustomTitleService,
    public _polService: PolService,
    private _logsService: LogsService,
    public _dialog: MatDialog
  ) {customTitle.set("Pol"); }

  ngOnInit(): void {
    this.component = componentSettings;
  }

  setMenu(value: number) {
    this.component.filters.stateFilter = value;
    this.formatGetInputs();
  }

  search(data: FiltersBox) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchData;
    this.formatGetInputs();
  }

  searchDateRange(date: DateRange) {
    this.component.filters.startDate = date.startDate;
    this.component.filters.endDate = date.endDate;
    this.formatGetInputs();
  }

  resetFilters() {
    this.component.filters = { ...this.component.resetFilters };
    this.formatGetInputs();
  }

  formatGetInputs() {
    let str = "";

    if (this.component.filters.textFilter != null) {
      str += `&numFilter=${this.component.filters.numFilter}&textFilter=${this.component.filters.textFilter}`;
    }

    if (this.component.filters.stateFilter != null) {
      str += `&stateFilter=${this.component.filters.stateFilter}`;
    }

    if (
      this.component.filters.startDate != "" &&
      this.component.filters.endDate != ""
    ) {
      str += `&startDate=${this.component.filters.startDate}`;
      str += `&endDate=${this.component.filters.endDate}`;
    }

    if (this.component.filters.refresh) {
      let random = Math.random();
      str += `&refresh=${random}`;
      this.component.filters.refresh = false;
    }

    this.component.getInputs = str;
  }

  openDialogRegister() {
    this._dialog
      .open(PolManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsPol(true);
        }
      });
  }

  rowClick(rowClick: RowClick<PolResponse>) {
    let action = rowClick.action;
    let client = rowClick.row;

    switch (action) {
      case "edit":
        this.polEdit(client);
        break;
      case "remove":
        this.polRemove(client);
        break;
    }

    return false;
  }

  polEdit(polData: PolResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = polData;

    this._dialog
      .open(PolManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsPol(true);
        }
      });
  }

  polRemove(polData: PolResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el POL ${polData.id}?`,
      text: "Se borrará de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "rgb(79, 109, 253)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        this._polService.PolRemove(polData.id).subscribe(
          () => {
            this.setGetInputsPol(true);

            const log: LogsRequest = {
              usuario: `${this.user.family_name}`,
              modulo: "POL",
              tipoMetodo: "Eliminación",
              parametros: JSON.stringify(polData),
              estado: 1,
            };
            this._logsService.LogRegister(log).subscribe();
          },
          (error) => {
            console.error("Error eliminando POL:", error);

            const log: LogsRequest = {
              usuario: `${this.user.family_name}`,
              modulo: "POL",
              tipoMetodo: "Eliminación",
              parametros: JSON.stringify(polData),
              estado: 0,
            };
            this._logsService.LogRegister(log).subscribe();
          }
        );
      }
    });
  }

  setGetInputsPol(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `pol?Download=True`;
  }
}
