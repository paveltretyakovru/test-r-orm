/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export function Link({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.span`
  color: var(--blue);
  cursor: pointer;
  text-decoration: none;
`;
