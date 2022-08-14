/**
 * Modelo para guardar los posibles datos de respuesta obtenidos de la API
 */
 export interface ResponseData {
    status: number;
    message: string;
    data?: any;
}