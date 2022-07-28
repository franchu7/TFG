export interface RegisterData {
    email: string;
    password: string;
    person: [
        name: string,
        surname1: string,
        surname2?: string,
    ],
    dni: string;
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

export interface RegisterDataFromDB {
    id: number;
    email: string;
    password: string;
    name: string,
    surname1: string,
    surname2?: string,
    dni: string;
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

export interface UserData {
    token: string;
    status: number;
    message: string;
    data: RegisterDataFromDB;
}

export interface TokenInfo { 
    iss: string,
    exp: number,
    id: string,
    email: string,
    role: string
            
}


