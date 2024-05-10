import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCrete(newGroup: string) {
  try {

    const groups = await groupsGetAll();

    const groupAlreadExists = groups.includes(newGroup)

    if (groupAlreadExists) throw new AppError("Grupo já cadastrado!");
    
    const storage = JSON.stringify([...groups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)

  } catch (error) {
    throw error;
  }
}