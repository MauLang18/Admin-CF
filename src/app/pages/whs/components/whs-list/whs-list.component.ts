import { filter } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { WhsService } from "../../services/whs.service";
import { componentSettings } from "./whs-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { WhsManageComponent } from "../whs-manage/whs-manage.component";
import { WhsResponse } from "../../models/whs-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { LogsService } from "@shared/services/logs.service";
import { LogsRequest } from "@shared/models/logs-request.interface";
import { Subscription } from "rxjs";
import { UpdateListService } from "@shared/services/update-list.service";

@Component({
  selector: "vex-Whs-list",
  templateUrl: "./whs-list.component.html",
  styleUrls: ["./whs-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class WhsListComponent implements OnInit {
  component: any;
  parametro: any;
  pol: string;
  user = JSON.parse(localStorage.getItem('users'));
  private refreshSubscription: Subscription;

  constructor(
    customTitle: CustomTitleService,
    public _whsService: WhsService,
    public _dialog: MatDialog,
    private _logsService: LogsService,
    private _updateListService: UpdateListService,
    private route: ActivatedRoute
  ) {
    customTitle.set("Whs");
  }

  ngOnInit(): void {
    this.component = componentSettings;
    this.route.params.subscribe((params) => {
      this.parametro = params["parametro"];
      this.component.filters.whs = params["parametro"].replace(/-/g, ' ');
      this.pol = params["parametro"].replace(/-/g, ' ');
      this.formatGetInputs();
    });
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

    if (this.component.filters.whs != "") {
      str += `&whs=${this.component.filters.whs}`;
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
      .open(WhsManageComponent, {
        data: {
          parametro: this.parametro,
        },
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsWhs(true);
        }
      });
  }

  rowClick(rowClick: RowClick<WhsResponse>) {
    let action = rowClick.action;
    let client = rowClick.row;

    switch (action) {
      case "edit":
        this.WhsEdit(client);
        break;
      case "remove":
        this.WhsRemove(client);
        break;
    }

    return false;
  }

  WhsEdit(WhsData: WhsResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = WhsData;
    dialogConfig.data.parametro = this.parametro.replace(/-/g, ' ');

    this._dialog
      .open(WhsManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsWhs(true);
        }
      });
  }

  WhsRemove(WhsData: WhsResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el Whs ${WhsData.idtra}?`,
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
        this._whsService.WhsRemove(WhsData.id).subscribe(
          () => {
            this.setGetInputsWhs(true);

            const log: LogsRequest = {
              usuario: `${this.user.family_name}`,
              modulo: "Whs",
              tipoMetodo: "Eliminación",
              parametros: JSON.stringify(WhsData),
              estado: 1,
            };
            this._logsService.LogRegister(log).subscribe();
          },
          (error) => {
            console.error("Error eliminando Whs:", error);

            const log: LogsRequest = {
              usuario: `${this.user.family_name}`,
              modulo: "Whs",
              tipoMetodo: "Eliminación",
              parametros: JSON.stringify(WhsData),
              estado: 0,
            };
            this._logsService.LogRegister(log).subscribe();
          }
        );
      }
    });
  }

  setGetInputsWhs(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Whs?whs=${this.pol}&Download=True`;
  }

  get getUploadUrl() {
    return `Whs/Import?whs=${this.pol}`;
  }

  private subscribeToRefreshList() {
    this.refreshSubscription = this._updateListService.refreshList$.subscribe((refresh) => {
      if (refresh) {
        this.setGetInputsWhs(true);
        console.log("Lista actualizada");
      }
    });
  }
}
