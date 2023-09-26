export interface User {
    userId: number;
    userName: string;
    password: string;
    email: string,
}

export interface CreateUserDTO extends Omit<User, 'id'> {}

export interface UserResp extends Omit<User, 'password'> {}