/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from "styled-components";

// Images
import basketImageUrl from '../assets/basket.png';

export function Cart() {
  return (
    <Wrapper className="flex items-center justify-center">
      <Counter>10+</Counter>
      <img src={basketImageUrl} alt="Корзина" width={20} height={20} />
    </Wrapper>
  );
}

const Counter = styled.div`
  top: -10px;
  color: var(--blue);
  right: -10px;
  padding: 5px;
  padding-bottom: 0px;
  position: absolute;
  background-color: var(--bg-white);
`;

const Wrapper = styled.div`
  min-width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;

  border: 1px solid var(--text);
  position: relative;
  border-radius: 99px;
`;
