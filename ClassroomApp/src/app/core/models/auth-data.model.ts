
/**
 * Modelo para los datos de registro obtenidos del formulario
 */
export interface RegisterData {
    email: string;
    password: string;
    person: [
        name: string,
        surname1: string,
        surname2?: string,
    ],
    dni: string;
    age: number;
    gender: string;
    address: [
        roadType: string,
        street: string,
        streetNum: string,
        floor?: string
    ];
    zipCode: string;
    location: string;
    province: string;
    phoneNum: string;
    role: string;
    avatar: string;
}

/**
 * Modelo para los datos de usuario obtenidos de la base de datos
 */
export interface RegisterDataFromDB {
    id: number;
    email: string;
    password: string;
    name: string,
    surname1: string,
    surname2?: string,
    dni: string;
    age: number;
    gender: string;
    street: string,
    streetNum: string,
    floor?: string
    zipCode: string;
    location: string;
    province: string;
    phoneNum: string;
    role: string;
    avatar: string;
}

/**
 * Modelo para la información guardada en el token
 */
export interface TokenInfo { 
    iss: string,
    iat: number,
    exp: number,
    id: string,
    email: string,
    role: string           
}


