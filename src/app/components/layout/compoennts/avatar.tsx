/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import styled from 'styled-components';

interface Props {
  path: string;
}

export function Avatar({ path }: Props) {
  return <Wrapper $path={path} />;
}

const Wrapper = styled.div<{ $path: string }>`
  width: 50px;
  height: 50px;
  border-radius: 99px;
  background-size: cover;
  background-image: url(${(p) => p.$path});
  background-repeat: no-repeat;
`;
