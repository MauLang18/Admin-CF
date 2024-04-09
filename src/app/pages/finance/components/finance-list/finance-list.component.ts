import { filter } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { CustomTitleService } from "@shared/services/custom-title.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import { FinanceService } from "../../services/finance.service";
import { componentSettings } from "./finance-list-config";
import { DateRange, FiltersBox } from "@shared/models/search-options.interface";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FinanceManageComponent } from "../finance-manage/finance-manage.component";
import { FinanceResponse } from "../../models/finance-response.interface";
import { RowClick } from "@shared/models/row-click.interface";
import Swal from "sweetalert2";

@Component({
  selector: "vex-finance-list",
  templateUrl: "./finance-list.component.html",
  styleUrls: ["./finance-list.component.scss"],
  animations: [stagger40ms, scaleIn400ms, fadeInRight400ms],
})
export class FinanceListComponent implements OnInit {
  component: any;

  constructor(
    customTitle: CustomTitleService,
    public _financeService: FinanceService,
    public _dialog: MatDialog
  ) {
    customTitle.set("Finance");
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

    if (this.component.filters.Finance != "") {
      str += `&Finance=${this.component.filters.Finance}`;
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
      .open(FinanceManageComponent, {
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.setGetInputsFinance(true);
        }
      });
  }

  rowClick(rowClick: RowClick<FinanceResponse>) {
    let action = rowClick.action;
    let client = rowClick.row;

    switch (action) {
      case "edit":
        this.FinanceEdit(client);
        break;
      case "remove":
        this.FinanceRemove(client);
        break;
    }

    return false;
  }

  FinanceEdit(FinanceData: FinanceResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = FinanceData;

    this._dialog
      .open(FinanceManageComponent, {
        data: dialogConfig,
        disableClose: true,
        width: "400px",
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.setGetInputsFinance(true);
        }
      });
  }

  FinanceRemove(FinanceData: FinanceResponse) {
    Swal.fire({
      title: `¿Realmente deseas eliminar el Finance ${FinanceData.id}?`,
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
        this._financeService
          .FinanceRemove(FinanceData.id)
          .subscribe(() => this.setGetInputsFinance(true));
      }
    });
  }

  setGetInputsFinance(refresh: boolean) {
    this.component.filters.refresh = refresh;
    this.formatGetInputs();
  }

  get getDownloadUrl() {
    return `Finance?Download=True`;
  }
}
