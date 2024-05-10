import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { getPlayersByGroup } from "./getPlayersByGroup";

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {

    const players = await getPlayersByGroup(group);
    
    const playerAlreadyExists = players.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0 ) throw new AppError("Jogador já existente na lista")

    const newPlayers = JSON.stringify([...players, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newPlayers)

  } catch (error) {
    throw error;
  }
}