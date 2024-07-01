import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ItinerarioResponse } from "../../models/itinerario-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "POL",
    value: 1,
    placeholder: "Buscar por POL",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "POD",
    value: 2,
    placeholder: "Buscar por POD",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "Modalidad",
    value: 2,
    placeholder: "Buscar por Modalidad",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "Transporte",
    value: 2,
    placeholder: "Buscar por Transporte",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
];

const menuItems: MenuItems[] = [
  {
    type: "link",
    id: "all",
    icon: IconsService.prototype.getIcon("icViewHeadline"),
    label: "Todos",
  },
  {
    type: "link",
    id: "Activo",
    value: 1,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Activo",
    class: {
      icon: "text-green",
    },
  },
  {
    type: "link",
    id: "Inactivo",
    value: 0,
    icon: IconsService.prototype.getIcon("icLabel"),
    label: "Inactivo",
    class: {
      icon: "text-gray",
    },
  },
];

const tableColumns: TableColumns<ItinerarioResponse>[] = [
  {
    label: "ORIGEN",
    cssLabel: ["font-bold", "text-sm"],
    property: "origen",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "origen",
    visible: true,
    download: true,
  },
  {
    label: "POL",
    cssLabel: ["font-bold", "text-sm"],
    property: "pol",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "pol",
    visible: true,
    download: true,
  },
  {
    label: "DESTINO",
    cssLabel: ["font-bold", "text-sm"],
    property: "destino",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "destino",
    visible: true,
    download: true,
  },
  {
    label: "POD",
    cssLabel: ["font-bold", "text-sm"],
    property: "pod",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "pod",
    visible: true,
    download: true,
  },
  {
    label: "CLOSING",
    cssLabel: ["font-bold", "text-sm"],
    property: "closing",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    sortProperty: "closing",
    visible: true,
    download: true,
  },
  {
    label: "ETD",
    cssLabel: ["font-bold", "text-sm"],
    property: "etd",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    sortProperty: "etd",
    visible: true,
    download: true,
  },
  {
    label: "ETA",
    cssLabel: ["font-bold", "text-sm"],
    property: "eta",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    sortProperty: "eta",
    visible: true,
    download: true,
  },
  {
    label: "CARRIER",
    cssLabel: ["font-bold", "text-sm"],
    property: "carrier",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "carrier",
    visible: true,
    download: true,
  },
  {
    label: "VESSEL",
    cssLabel: ["font-bold", "text-sm"],
    property: "vessel",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "vessel",
    visible: true,
    download: true,
  },
  {
    label: "VOYAGE",
    cssLabel: ["font-bold", "text-sm"],
    property: "voyage",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "voyage",
    visible: true,
    download: true,
  },
  {
    label: "TRANSPORTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "transporte",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "transporte",
    visible: true,
    download: true,
  },
  {
    label: "MODALIDAD",
    cssLabel: ["font-bold", "text-sm"],
    property: "modalidad",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "modalidad",
    visible: true,
    download: true,
  },
  {
    label: "F. DE CREACIÓN",
    cssLabel: ["font-bold", "text-sm"],
    property: "fechaCreacionAuditoria",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: false,
    sort: true,
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "estadoItinerario",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "badge",
    sticky: false,
    sort: false,
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icStatus",
    cssProperty: [],
    type: "icon",
    action: "status",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icEdit",
    cssProperty: [],
    type: "icon",
    action: "edit",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icDelete",
    cssProperty: [],
    type: "icon",
    action: "remove",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  stateFilter: null,
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  icClient: IconsService.prototype.getIcon("icCalendar"),
  searchOptions,
  menuItems,
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  filters,
  resetFilters,
  getInputs,
  filename: "listado-de-Itinerarios",
};
