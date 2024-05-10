import React from "react";
import { BackButton, BackIcon, Container, Logo } from "./styles";

import LogoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};


export function Header({ showBackButton = false }: Props) {

  const nativation = useNavigation()

  function handleGoBack() {
    nativation.navigate("groups")
  }

  return (
    <Container>
      {showBackButton &&
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }

      <Logo source={LogoImg} />
    </Container>
  );
}