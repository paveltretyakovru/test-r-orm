/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

export function Search() {
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <Wrapper>
      <input
        type="text"
        placeholder="Поиск бренда, товара, категории..."
        value={value}
        onChange={onChange}
      />

      <button type="submit">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="#727280"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 19L14.65 14.65"
            stroke="#727280"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 3px;
  display: flex;
  border: 1px solid var(--border);
  background: var(--bg-white);
  border-radius: 1.625rem;

  input {
    width: 100%;
    height: 2.8rem;

    outline: none;
    padding: 0 3.5rem 0 1.5rem;
    font-size: 1rem;
  }

  button {
    display: flex;
    align-items: center;
    min-width: 90px;
    border-radius: 41px;
    justify-content: center;
    width: 3.5rem;
    height: 2.8rem;
    margin-left: -3.5rem;
    background: var(--border);
    border: none;
    outline: none;

    :hover {
      cursor: pointer;
    }
  }
`;
