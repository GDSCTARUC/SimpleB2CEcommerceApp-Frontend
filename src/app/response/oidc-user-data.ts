export interface OidcUserData {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	isAdmin: boolean;
}
