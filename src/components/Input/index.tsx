import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

import { Container } from "./styles";
import React, { RefObject } from "react";

type Props = TextInputProps & {
  inputRef?: RefObject<TextInput>; // Update inputRef type
}

export function Input({ inputRef, ...rest }: Props) { // Update props type
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}
