import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoint } from "@shared/apis/endpoint";
import { getIcon } from "@shared/functions/helpers";
import { BaseResponse } from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { ItinerarioRequest } from "../models/itinerario-request.interface";
import {
  ItinerarioById,
  ItinerarioResponse,
} from "../models/itinerario-response.interface";

@Injectable({
  providedIn: "root",
})
export class ItinerarioService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

  private logAction(
    action: string,
    id: number | null = null,
    params: any = null
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.LOGS_REGISTER}`;
    const logData = {
      Usuario: `${localStorage.getItem('username')}`, 
      Modulo: "Itinerario",
      TipoMetodo: action,
      Parametros: JSON.stringify({ id, ...params }),
      Estado: 1,
    };
    return this._http.post<BaseResponse>(requestUrl, logData);
  }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${
      endpoint.LIST_ITINERARIO
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseResponse>(requestUrl).pipe(
      map((resp: BaseResponse) => {
        resp.data.forEach(function (prov: ItinerarioResponse) {
          switch (prov.estado) {
            case 0:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
          }
          prov.icStatus = getIcon("icStatus","Cambiar Estado",true);
          prov.icEdit = getIcon("icEdit", "Editar Itinerario", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Itinerario", true);
        });
        return resp;
      })
    );
  }

  ItinerarioById(id: number): Observable<ItinerarioById> {
    const requestUrl = `${env.api}${endpoint.ITINERARIO_BY_ID}${id}`;
    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ItinerarioRegister(itinerario: ItinerarioRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ITINERARIO_REGISTER}`;
    return this._http.post(requestUrl, itinerario).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this.logAction("Registro", null, itinerario);
        }
        return resp;
      })
    );
  }

  ItinerarioEdit(
    id: number,
    itinerario: ItinerarioRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoint.ITINERARIO_EDIT}${id}`;
    return this._http.put<BaseResponse>(requestUrl, itinerario).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this.logAction("Edición", id, itinerario);
        }
        return resp;
      })
    );;
  }

  ItinerarioRemove(id: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.ITINERARIO_REMOVE}${id}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this.logAction("Eliminación", id);
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  ItinerarioStatus(id: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.ITINERARIO_STATE}${id}`;
    return this._http.put(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this.logAction("Edición", id);
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}