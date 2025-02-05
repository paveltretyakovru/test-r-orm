/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';

export function NotFound() {
  return <Wrapper>404 Не найдено</Wrapper>;
}

NotFound.route = '/404';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 30px;
`;
