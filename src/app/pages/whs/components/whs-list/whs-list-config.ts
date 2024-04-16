import { TableColumns } from "@shared/models/list-table.interface";
import { MenuItems } from "@shared/models/menu-items.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { IconsService } from "@shared/services/icons.service";
import { GenericValidators } from "@shared/validators/generic-validators";
import { WhsResponse } from "../../models/whs-response.interface";

const searchOptions: SearchOptions[] = [
  {
    label: "Status",
    value: 1,
    placeholder: "Buscar por Status",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "POL",
    value: 2,
    placeholder: "Buscar por POL",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "POD",
    value: 3,
    placeholder: "Buscar por POD",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "IDTRA",
    value: 4,
    placeholder: "Buscar por IDTRA",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "PO",
    value: 5,
    placeholder: "Buscar por PO",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "Tipo Registro",
    value: 6,
    placeholder: "Buscar por Tipo Registro",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite nombres válidos.",
    icon: "icMail",
  },
  {
    label: "Cliente",
    value: 7,
    placeholder: "Buscar por Cliente",
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

const tableColumns: TableColumns<WhsResponse>[] = [
  {
    label: "IDTRA",
    cssLabel: ["font-bold", "text-sm"],
    property: "idtra",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "idtra",
    visible: true,
    download: true,
  },
  {
    label: "# WHS",
    cssLabel: ["font-bold", "text-sm"],
    property: "numeroWHS",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "numeroWHS",
    visible: true,
    download: true,
  },
  {
    label: "CLIENTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "cliente",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "cliente",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE CLIENTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "nombreCliente",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "nombreCliente",
    visible: true,
    download: true,
  },
  {
    label: "TIPO REGISTRO",
    cssLabel: ["font-bold", "text-sm"],
    property: "tipoRegistro",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "tipoRegistro",
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
    label: "PO",
    cssLabel: ["font-bold", "text-sm"],
    property: "po",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "po",
    visible: true,
    download: true,
  },
  {
    label: "STATUS",
    cssLabel: ["font-bold", "text-sm"],
    property: "statusWHS",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "statusWhs",
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
    label: "CANT. BULTOS",
    cssLabel: ["font-bold", "text-sm"],
    property: "cantidadBultos",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "cantidadBultos",
    visible: true,
    download: true,
  },
  {
    label: "TIPO BULTOS",
    cssLabel: ["font-bold", "text-sm"],
    property: "tipoBultos",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "tipoBultos",
    visible: true,
    download: true,
  },
  {
    label: "VINCULACION OTRO REGISTRO",
    cssLabel: ["font-bold", "text-sm"],
    property: "vinculacionOtroRegistro",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "vinculacionOtroRegistro",
    visible: true,
    download: true,
  },
  {
    label: "WHS RECEIPT",
    cssLabel: ["font-bold", "text-sm"],
    property: "whsReceipt",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "hiperlink",
    sticky: false,
    sort: true,
    sortProperty: "whsReceipt",
    visible: true,
    download: true,
  },
  {
    label: "DOCUMENTO REGISTRO",
    cssLabel: ["font-bold", "text-sm"],
    property: "documentoregistro",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "hiperlink",
    sticky: false,
    sort: true,
    sortProperty: "documentoregistro",
    visible: true,
    download: true,
  },
  {
    label: "IMAGEN 1",
    cssLabel: ["font-bold", "text-sm"],
    property: "imagen1",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "imagen1",
    visible: true,
    download: true,
  },
  {
    label: "IMAGEN 2",
    cssLabel: ["font-bold", "text-sm"],
    property: "imagen2",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "imagen2",
    visible: true,
    download: true,
  },
  {
    label: "IMAGEN 3",
    cssLabel: ["font-bold", "text-sm"],
    property: "imagen3",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "imagen3",
    visible: true,
    download: true,
  },
  {
    label: "IMAGEN 4",
    cssLabel: ["font-bold", "text-sm"],
    property: "imagen4",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "imagen4",
    visible: true,
    download: true,
  },
  {
    label: "IMAGEN 5",
    cssLabel: ["font-bold", "text-sm"],
    property: "imagen5",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "image",
    sticky: false,
    sort: true,
    sortProperty: "imagen5",
    visible: true,
    download: true,
  },
  {
    label: "DETALLE",
    cssLabel: ["font-bold", "text-sm"],
    property: "detalle",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "detalle",
    visible: true,
    download: true,
  },
  {
    label: "ESTADO",
    cssLabel: ["font-bold", "text-sm"],
    property: "estadoWhs",
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
  whs: "",
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
  icClient: IconsService.prototype.getIcon("icWarehouse"),
  searchOptions,
  menuItems,
  tableColumns,
  initialSort: "Id",
  initialSortDir: "desc",
  filters,
  resetFilters,
  getInputs,
  filename: "listado-de-Whs",
};
