export interface User {
    id: string;
    username: string;
    password: string;
    email: string,
}

export interface CreateUserDTO extends Omit<User, 'id'> {}