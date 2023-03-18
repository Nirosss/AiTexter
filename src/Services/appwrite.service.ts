import { Client, Account, ID } from "appwrite";

const client = new Client();
const account = new Account(client);

//@ts-ignore
client.setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT)
;

export async function signup(email: string, password: string): Promise<any> {
    try {
        const user = await account.create(ID.unique(), email, password);
        const session = await login(email, password);
        return session;
    } catch (err) {
        throw err;
    }
}

export async function login(email: string, password: string): Promise<any> {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (err) {
        throw err;
    }
}

export async function getCurrentSession(): Promise<any> {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (err) {
        throw err;
    }
}

export async function logout(): Promise<any> {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (err) {
        throw err;
    }
}