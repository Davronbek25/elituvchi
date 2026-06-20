import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.elituvchi",
  databaseId: '69fcc5dd00058e9688e0',
  userCollectionId: '69fcc60a00109d645c26',
  categoriesCollectionId: 'categories',
  menuCollectionId: 'menu',
  customizationCollectionId: 'customizations',
  menuCustomizationCollectionId: 'menu_customizations',
  bucketId: '6a359f88003e24b82d2a',
};

export const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
const avatars = new Avatars(client)

export const createUser = async ({ email, password, name} : CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if(!newAccount) throw Error;

    await signIn({ email, password})

    const avatarUrl = avatars.getInitials(name).toString()

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl}
    )
  } catch(e) {
    throw new Error(e as string)
  }
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
  } catch(e) {
    throw new Error(e as string)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if(!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error

    return currentUser.documents[0]
  } catch (e) {
    console.log(e)
    throw new Error(e as string)
  }
}