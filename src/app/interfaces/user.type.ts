export interface User {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    docId: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
}
export interface UserMaster {
    fullName: string;
    phone: string;
    email: string;
    docId: string;
    role: string;
}