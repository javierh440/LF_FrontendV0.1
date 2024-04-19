//=================PRODUCCION====================
//export const URL_SERVICIOS='http://regcivil.munihuamanga.gob.pe:8088/registrocivil/api';   
//export const URL_AUTH = 'http://regcivil.munihuamanga.gob.pe:8088/registrocivil/oauth/token';

//=================DESARROLLO======================
export const URL_SERVICIOS='http://localhost:8080/api';   

export const URL_AUTH = 'http://localhost:8080/oauth/token';

export enum TipoContribuyente{
    NATURAL = 'NATURAL',
    JURIDICO = 'JURIDICO'
}
export enum TipoDocumento{
    DNI = 'DNI',
    RUC = 'RUC'
}
