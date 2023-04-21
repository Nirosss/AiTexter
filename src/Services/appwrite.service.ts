import { Client, Account, ID } from "appwrite";

const client = new Client();
const account = new Account(client);

//@ts-ignore

export async function signup(email: string, password: string): Promise<any> {
    try {
        const session = Promise.resolve();
        return session;
    } catch (err) {
        throw err;
    }
}

export async function login(email: string, password: string): Promise<any> {
    try {
        const session = Promise.resolve();
        return session;
    } catch (err) {
        throw err;
    }
}

export async function getCurrentSession(): Promise<any> {
    try {
        const session = Promise.resolve();
        return session;
    } catch (err) {
        throw err;
    }
}

export async function logout(): Promise<any> {
    try {
        const session = Promise.resolve();
        return session;
    } catch (err) {
        throw err;
    }
}