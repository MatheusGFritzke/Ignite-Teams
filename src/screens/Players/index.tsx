import React, { useEffect, useRef, useState } from "react";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { Alert, FlatList, TextInput } from "react-native";

import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayerByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute();
  const { navigate } = useNavigation();

  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (!newPlayerName.trim()) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await addPlayerByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName("")

      fetchPlayersByGroupAndTeams();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        Alert.alert('Nova Pessoa', 'Não foi possível criar um novo jogador!');
      }
    }
  }

  async function fetchPlayersByGroupAndTeams() {
    try {
      setIsLoading(true);
      const players = await getPlayersByGroupAndTeam(group, team)
      setPlayers(players)
    } catch (error) {
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado')
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group)
      await fetchPlayersByGroupAndTeams();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remover Pessoa', error.message)
      } else {
        Alert.alert('Remover Pessoa', 'Não foi possível remover o jogador!');
      }
    }
  }

  async function groupDelete() {
    try {
      await groupRemoveByName(group);
      navigate("groups");

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remover turma', error.message)
      } else {
        Alert.alert('Remover turma', 'Não foi possível remover a turma!');
      }
    }
  }

  async function handleGroupDelete() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupDelete() }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByGroupAndTeams()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title={group}
        subtitle="adicione a galera e separe os times."
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          placeholder="Nome do jogador"
          autoCorrect={false}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>


      <HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C', 'Time D', 'Time E', 'Time F', 'Time G']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              isActived={team === item}
              onPress={() => setTeam(item)}
              title={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      {isLoading ?
        <Loading />
        :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => { handlePlayerRemove(item.name) }}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Não há pessoas nesse time"
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && {
              flex: 1
            }
          ]}
        />
      }

      <Button title="Remover turma" type="SECONDARY" onPress={handleGroupDelete} />

    </Container>
  );
}