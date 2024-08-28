export enum UserType {
    Admin = 'Admin',
    Driver = 'Driver'
}
  
export interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: UserType;
    old_username?: string;
}

export interface UsersResponse {
    users: User[];
}
