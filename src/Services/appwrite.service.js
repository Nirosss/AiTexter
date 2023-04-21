import { Client, Account, ID } from 'appwrite'

const client = new Client()
const account = new Account(client)



export async function signup(email, password) {
  try {
    return Promise.resolve();
  } catch (err) {
    throw err
  }
}

export async function login(email, password) {
  try {
    const session = Promise.resolve();
    return session
  } catch (err) {
    throw err
  }
}

export async function getCurrentSession() {
  try {
    const session = Promise.resolve({current: true});
    return session
  } catch (err) {
    throw err
  }
}

export async function logout() {
  try {
    const session = Promise.resolve();
    return session
  } catch (err) {
    throw err
  }
}
