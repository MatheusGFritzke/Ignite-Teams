import React from 'react';
import { NewGroup } from '@screens/NewGroup';
import { Groups } from '@screens/Groups';
import { Players } from '@screens/Players';
import theme from '@theme/index';

import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
      />
      {fontsLoaded ?
        <Players />
        : <Loading />}
    </ThemeProvider>
  );
}

