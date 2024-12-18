import { Component, Inject, OnInit } from "@angular/core";
import { IconsService } from "@shared/services/icons.service";
import * as configs from "../../../../../static-data/configs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "@shared/services/alert.service";
import { UsuarioService } from "../../services/usuario.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LogsService } from "@shared/services/logs.service";
import { LogsRequest } from "@shared/models/logs-request.interface";

@Component({
  selector: "vex-usuario-manage",
  templateUrl: "./usuario-manage.component.html",
  styleUrls: ["./usuario-manage.component.scss"],
})
export class UsuarioManageComponent implements OnInit {
  icClose = IconsService.prototype.getIcon("icClose");
  configs = configs;
  rolLists = {
    1: [],
    2: [
      { key: "1", name: "Perfil" },
      { key: "2", name: "Tramites" },
      { key: "3", name: "Transporte Internacional" },
      { key: "4", name: "Agenciamiento Aduanal" },
      { key: "5", name: "Shedules" },
      { key: "6", name: "Itinerarios" },
      { key: "7", name: "Tracking" },
      { key: "8", name: "Quote" },
      { key: "9", name: "Cotización" },
      { key: "10", name: "Tarifarios" },
      { key: "11", name: "My Documentation" },
      { key: "12", name: "Exoneraciones" },
      { key: "13", name: "WHS" },
      { key: "21", name: "My Finance" },
      { key: "22", name: "Directorio Interno" },
      { key: "23", name: "Cotización" },
    ],
    3: [
      { key: "1", name: "Usuarios" },
      { key: "2", name: "Itinerarios" },
      { key: "3", name: "Empleos" },
      { key: "4", name: "Noticias" },
      { key: "5", name: "WHS" },
      { key: "6", name: "Finance" },
      { key: "7", name: "Exoneraciones" },
      { key: "8", name: "Logs" },
      { key: "9", name: "Datos" },
      { key: "10", name: "Multimedia" },
      { key: "11", name: "Aduanas" },
      { key: "12", name: "BCF" },
      { key: "13", name: "Servicio al Cliente - Cotización" },
      { key: "14", name: "Almacén Fiscal - Cotización" },
      { key: "15", name: "Consolidadora de Carga - Cotización" },
      { key: "16", name: "Panamá" },
    ],
  };
  isAdmin: boolean = false;
  rolList: { key: string; name: string }[];
  selectedRoleId: number;

  form: FormGroup;
  user = JSON.parse(localStorage.getItem("users"));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _usuarioService: UsuarioService,
    private _logsService: LogsService,
    public _dialogRef: MatDialogRef<UsuarioManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.selectedRoleId = this.form.get("idRol").value;
    if (this.data != null) {
      this.clientById(this.data.data.id);
    }
    this.updateRolList(this.selectedRoleId);
  }

  onRoleChange(event: any): void {
    this.selectedRoleId = event.value;
    this.isAdmin = this.selectedRoleId !== 1;
    this.updateRolList(this.selectedRoleId);
  }

  private updateRolList(selectedRoleId: number): void {
    this.rolList = this.rolLists[selectedRoleId];
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      nombreEmpresa: ["", [Validators.required]],
      pass: [""],
      correo: ["", [Validators.required]],
      tipo: [""],
      cliente: [""],
      idRol: ["", [Validators.required]],
      telefono: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      pais: ["", [Validators.required]],
      paginas: ["1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"],
      imagen: [""],
      estado: ["", [Validators.required]],
    });
  }

  selectedImage(file: File) {
    this.form.get("imagen").setValue(file);
  }

  markMatchingCheckboxes(): void {
    const privilegiosControl = this.form.get("paginas");
    const selectedPrivilegios = privilegiosControl.value || "";

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox: any) => {
      if (selectedPrivilegios.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  }

  onChange(e: any) {
    const privilegiosControl = this.form.get("paginas");

    let selectedPrivilegios = privilegiosControl.value || "";

    if (e.target.checked) {
      if (!selectedPrivilegios.includes(e.target.value)) {
        selectedPrivilegios +=
          (selectedPrivilegios.length > 0 ? "," : "") + e.target.value;
      }
    } else {
      selectedPrivilegios = selectedPrivilegios
        .split(",")
        .filter((value: string) => value !== e.target.value)
        .join(",");
    }

    privilegiosControl.setValue(selectedPrivilegios);
  }

  clientById(id: number): void {
    this._usuarioService.UsuarioById(id).subscribe((resp) => {
      const selectedPages: string[] = resp.paginas.split(",");

      this.updateRolList(resp.idRol);

      this.form.reset({
        id: resp.id,
        nombre: resp.nombre,
        apellido: resp.apellido,
        nombreEmpresa: resp.nombreEmpresa,
        correo: resp.correo,
        cliente: resp.cliente,
        idRol: resp.idRol,
        telefono: resp.telefono,
        direccion: resp.direccion,
        pais: resp.pais,
        paginas: selectedPages,
        imagen: resp.imagen,
        estado: resp.estado,
      });
      this.isAdmin = resp.idRol !== 1;
    });
  }

  clientSave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    const id = this.form.get("id").value;
    const data = this.form.value;

    if (id > 0) {
      this.clientEdit(id, data);
    } else {
      this.clientRegister(data);
    }
  }

  clientRegister(data): void {
    this._usuarioService.UsuarioRegister(data).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);

        const log: LogsRequest = {
          usuario: `${this.user.family_name}`,
          modulo: "Usuario",
          tipoMetodo: "Registro",
          parametros: JSON.stringify(data),
          estado: 1,
        };
        this._logsService.LogRegister(log).subscribe();
      } else {
        this._alert.warn("Atención", resp.message);
      }
    });
  }

  clientEdit(id: number, data): void {
    this._usuarioService.UsuarioEdit(id, data).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success("Excelente", resp.message);
        this._dialogRef.close(true);

        const log: LogsRequest = {
          usuario: `${this.user.family_name}`,
          modulo: "Usuario",
          tipoMetodo: "Edición",
          parametros: JSON.stringify(data),
          estado: 1,
        };
        this._logsService.LogRegister(log).subscribe();
      }
    });
  }
}
