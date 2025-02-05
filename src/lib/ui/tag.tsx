/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import React from 'react';
import styled from 'styled-components';
import { colors } from '../moks/colors';

interface Props {
  color?: string;
  active?: boolean;
  children: React.ReactNode;

  onClick?: () => void;
}

export function Tag({ children, color, active, onClick }: Props) {
  const myColor = color || colors[Math.floor(Math.random() * colors.length)];

  return (
    <Wrapper onClick={onClick} color={myColor} $active={!!active}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $active: boolean; color?: string }>`
  color: ${(p) => (p.$active && 'var(--text-dark)') || 'var(--white)'};
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 50px;
  white-space: nowrap;
  border: 1px solid ${(p) => (p.$active && 'var(--pink)') || p.color};
  transition: color 0.3s ease;

  background-color: ${(p) => {
    if (p.$active) {
      return 'var(--white)';
    }
    return p.color;
  }};
`;
