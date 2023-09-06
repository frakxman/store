export interface User {
    userId: number;
    username: string;
    password: string;
    email: string,
}

export interface CreateUserDTO extends Omit<User, 'id'> {}