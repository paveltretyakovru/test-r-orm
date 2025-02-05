/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { Button } from '../../../../lib/ui/button';

import baerImageUrl from '../assets/banner.png';

interface Props {
  onClick?(): void;
  smallDevice?: boolean;
}
export function Banner({ onClick, smallDevice }: Props) {
  return (
    <Wrapper $smallDevice={!!smallDevice}>
      <LeftSide>
        <StyledImage
          alt="Рекламное предложение"
          src={baerImageUrl}
          width={91}
          height={82}
        />
      </LeftSide>
      <RightSide>
        <Title>Получай товары БЕСПЛАТНО!</Title>
        <Button onClick={onClick}>Узнать подробнее</Button>
      </RightSide>
    </Wrapper>
  );
}

const StyledImage = styled.img`
  position: absolute;
  bottom: 3%;
  left: -10px;
`;

const Wrapper = styled.div<{ $smallDevice: boolean }>`
  width: 100%;
  max-width: 300px;
  display: flex;
  margin-top: ${(p) => (p.$smallDevice && `0`) || `20`}px;
  margin-bottom: 20px;
  padding-left: 0;
  padding: 20px;
  border: 1px solid var(--pink);
  border-radius: 20px;
  zoom: 0.7;
`;

const LeftSide = styled.div`
  position: relative;
  width: 113px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: var(--blue);
  font-family: Raleway;
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 10px;
`;
