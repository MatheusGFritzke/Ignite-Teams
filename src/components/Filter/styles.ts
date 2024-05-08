import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FilterStyleProps = {
  isActived?: boolean;
}

export const Container = styled(TouchableOpacity) <FilterStyleProps>`
  ${({ theme, isActived }) => isActived && css`
    border: 1px solid ${theme.COLORS.GREEN_700};
  `}
  
  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  text-transform: uppercase;
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `}
`

export const Separator = styled.View`
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.GRAY_400};
  margin-right: 8px;
`

export const Footer = styled.View`
  width: 100%;
  padding: 20px;
`