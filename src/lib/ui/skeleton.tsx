/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';

type SekeletonVariant = 'image' | 'text' | 'text-big' | 'text-short';

interface Props {
  width?: string | number;
  variant?: SekeletonVariant;
}

export function Skeleton({ variant = 'text', width = '100%' }: Props) {
  return (
    <Wrapper width={width}>
      {variant === 'image' && <div className="skeleton-image" />}
      {variant === 'text' && <div className="skeleton-text" />}
      {variant === 'text-short' && <div className="skeleton-short" />}
      {variant === 'text-big' && <div className="skeleton-text-big" />}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ width: string | number }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* max-width: 300px; */
  padding: 20px;
  width: ${(p) => (typeof p.width === 'string' ? p.width : `${p.width}px`)};

  .skeleton-image {
    width: 100%;
    height: 180px;
    background: #e0e0e0;
    border-radius: 8px;
    animation: shimmer 1.5s infinite linear;
  }

  .skeleton-text {
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
  }

  .skeleton-text-big {
    width: 100%;
    height: 40px;
    background: #e0e0e0;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
  }

  .skeleton-text.short {
    width: 60%;
  }

  @keyframes shimmer {
    0% {
      background-position: 100%;
    }
    100% {
      background-position: -100%;
    }
  }

  .skeleton-image,
  .skeleton-text {
    background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
    background-size: 200% 100%;
  }
`;
