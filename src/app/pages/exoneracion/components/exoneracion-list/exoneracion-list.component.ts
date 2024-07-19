import { filter } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { ExoneracionService } from "../../services/exoneracion.service";
import { componentSettings } from "./exoneracion-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ExoneracionManageComponent } from "../exoneracion-manage/exoneracion-manage.component";
import { ExoneracionResponse } from "../../models/exoneracion-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";
import { LogsService } from "@shared/services/logs.service";
import { LogsRequest } from "@shared/models/logs-request.interface";
import { Subscription } from "rxjs";
import { UpdateListService } from "@shared/services/update-list.service";

@Component({
  selector: "vex-Exoneracion-list",
  templateUrl: "./exoneracion-list.component.html",
  styleUrls: ["./exoneracion-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class ExoneracionListComponent implements OnInit {
  component: any;
  user = JSON.parse(localStorage.getItem('users'));
  private refreshSubscription: Subscription;

  constructor(
    customTitle: CustomTitleService,
    private _logsService: LogsService,
    public _ExoneracionService: ExoneracionService,
    private _updateListService: UpdateListService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Exoneracion");
  }

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

    if (this.component.filters.Exoneracion != "") {
      str += `&Exoneracion=${this.component.filters.Exoneracion}`;
    }

    if (this.component.filters.textFilter != "") {
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
      .open(ExoneracionManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsExoneracion(true);
        }
      });
  }

  rowClick(rowClick: RowClick<ExoneracionResponse>) {
    let action = rowClick.action;
    let client = rowClick.row;

    switch (action) {
      case "edit":
        this.ExoneracionEdit(client);
        break;
      case "remove":
        this.ExoneracionRemove(client);
        break;
    }

    return false;
  }

  ExoneracionEdit(ExoneracionData: ExoneracionResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = ExoneracionData;

    this._dialog
      .open(ExoneracionManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsExoneracion(true);
        }
      });
  }

  ExoneracionRemove(ExoneracionData: ExoneracionResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar la Exoneración ${ExoneracionData.idtra}?`,
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
        this._ExoneracionService.ExoneracionRemove(ExoneracionData.id).subscribe(
          () => {
            this.setGetInputsExoneracion(true);

            const log: LogsRequest = {
              usuario: `${this.user.family_name}`,
              modulo: "Exoneración",
              tipoMetodo: "Eliminación",
              parametros: JSON.stringify(ExoneracionData),
              estado: 1,
            };
            this._logsService.LogRegister(log).subscribe();
          },
          (error) => {
            console.error("Error eliminando exoneración:", error);

            const log: LogsRequest = {
              usuario: `${this.user.family_name}`,
              modulo: "Exoneración",
              tipoMetodo: "Eliminación",
              parametros: JSON.stringify(ExoneracionData),
              estado: 0,
            };
            this._logsService.LogRegister(log).subscribe();
          }
        );
      }
    });
  }

  setGetInputsExoneracion(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Exoneracion?Download=True`;
  }

  get getUploadUrl() {
    return `Exoneracion/Import/`;
  }

  private subscribeToRefreshList() {
    this.refreshSubscription = this._updateListService.refreshList$.subscribe((refresh) => {
      if (refresh) {
        this.setGetInputsExoneracion(true);
        console.log("Lista actualizada");
      }
    });
  }
}
