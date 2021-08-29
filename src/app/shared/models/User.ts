import { UserType } from './ILogin';
import { Role } from './Role';
export class User{
    constructor(user){
        for(let prop in user){
            this[prop]=user[prop];
        }
    }
    id: string
    userName: string
    email: string
    name:string
    persPhone:string
    landlinePhone:string
    address: string|null
    emailConfirmed: boolean
    role:Role
}

export class UserFactory{
    static createUser(user:any){
        if(!user)return null;
        switch(user.userType){
            case UserType.Pharmacier :return new PharmacyUser(user);
            case UserType.Stocker :return new StoreUser(user);
            case UserType.Adminer: new AdminUser(user);
            default :return null;
        }
    }
}

export class PharmacyUser extends User{
 constructor(user:any){
   super(user);
   this.role=Role.pharmacy;
 }
}

export class StoreUser extends User{
    constructor(user:any){
        super(user);
        this.role=Role.store;
      }
}
export class AdminUser extends User{

}
