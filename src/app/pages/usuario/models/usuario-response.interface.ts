export interface UsuarioResponse {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  tipo: string;
  cliente: string;
  rol: string;
  idRol: number;
  imagen: string;
  nombreEmpresa: string;
  telefono: string;
  direccion: string;
  pais: string;
  paginas: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoUsuario: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface UsuarioById {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  tipo: string;
  cliente: string;
  idRol: number;
  imagen: string;
  nombreEmpresa: string;
  telefono: string;
  direccion: string;
  pais: string;
  paginas: string;
  estado: number;
}
