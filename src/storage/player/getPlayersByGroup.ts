import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function getPlayersByGroup(group: string) {
  try {
    const storageData = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    const players: PlayerStorageDTO[] = storageData ? JSON.parse(storageData) : [];

    return players;

  } catch (error) {
    throw error;
  }
}