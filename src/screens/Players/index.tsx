import React, { useState } from "react";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { FlatList } from "react-native";

import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players() {

  const [team, setTeam] = useState('Time C')
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times."
      />
      <Form>
        <Input placeholder="Nome do jogador" autoCorrect={false} />
        <ButtonIcon icon="add" />
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

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
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

      <Button title="Remover turma" type="SECONDARY" onPress={() => { }} />

    </Container>
  );
}