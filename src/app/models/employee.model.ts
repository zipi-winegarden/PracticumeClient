import { EmployeeRole } from "./employee-role.model";

export enum Gender {
    Male = 1,
    Female = 2
}

export class Employee {
    id!: number;
    idNumber!: string;
    firstName!: string;
    lastName!: string;
    gender!: Gender; 
    entryWorkDate!: Date;
    birthDate!: Date;
    isActive!:boolean;
    employeeRoles!: EmployeeRole[];
   
}
