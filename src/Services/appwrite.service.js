import { Client, Account, ID } from 'appwrite'

const client = new Client()
const account = new Account(client)

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('') // Your project ID

export async function signup(email, password) {
  try {
    const user = await account.create(ID.unique(), email, password)
    const session = await login(email, password)
    return session
  } catch (err) {
    throw err
  }
}

export async function login(email, password) {
  try {
    const session = await account.createEmailSession(email, password)
    return session
  } catch (err) {
    throw err
  }
}

export async function getCurrentSession() {
  try {
    const session = await account.getSession('current')
    return session
  } catch (err) {
    throw err
  }
}

export async function logout() {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (err) {
    throw err
  }
}
