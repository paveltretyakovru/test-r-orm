/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  element: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  children: (props: { close: () => void }) => React.ReactNode;

  open?: boolean;
}

export const Modal = ({ open, children, element }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(!!open);

  const elementWithClickHandler = React.cloneElement(element, {
    onClick: () => setIsOpened(true), // Открываем модальное окно при клике
  });

  const closeModal = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <>
      {elementWithClickHandler}
      {isOpened && (
        <Wrapper
          className="h-full w-full top-0 left-0 z-50 items-center justify-center"
          $open={isOpened}
          onClick={() => setIsOpened(false)}
        >
          <Content onClick={(e) => e.stopPropagation()}>
            {children({ close: closeModal })}
          </Content>
        </Wrapper>
      )}
    </>
  );
};

const Content = styled.div`
  background: #fff;
`;

const Wrapper = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open && 'flex') || 'none'};
  position: ${({ $open }) => ($open && 'fixed') || 'none'};
  background-color: var(--color-modal-overlay);
`;
