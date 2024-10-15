export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
}

export interface SaveUserInput {
	name: string;
	email: string;
	password: string;
}

export interface SaveUserOutput {
	id: string;
	name: string;
	email: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface LoginOutput {
	user: SaveUserInput;
	token: string;
}