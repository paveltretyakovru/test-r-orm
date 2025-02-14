/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

type Variants = 'primary' | 'tertiary';

interface Props {
  variant?: Variants;
  onClick?(): void;
  children?: React.ReactNode;
  disabled?: boolean;
}
export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled,
}: Props) {
  const click = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [onClick, disabled]);

  return (
    <Wrapper $disabled={!!disabled} $variant={variant} onClick={click}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $variant: Variants; $disabled: boolean }>`
  opacity: ${(p) => (p.$disabled && 0.7) || 1};
  color: ${(p) => {
    switch (p.$variant) {
      case 'primary':
        return 'var(--white)';
      case 'tertiary':
        return 'var(--blue)';

      default:
        return 'var(--white)';
    }
  }};

  cursor: pointer;
  border: 1px solid var(--blue);
  padding: 11px 10px;
  border-radius: 51px;
  background-color: ${(p) => {
    switch (p.$variant) {
      case 'primary':
        return 'var(--blue)';
      case 'tertiary':
        return 'var(--bg-white)';

      default:
        return 'var(--blue)';
    }
  }};

  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--blue);
    color: ${(p) => {
      switch (p.$variant) {
        case 'primary':
          return 'var(--white)';
        case 'tertiary':
          return 'var(--white)';

        default:
          return 'var(--white)';
      }
    }};
  }
`;
