/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { Map } from '../../../lib/ui/map';
import { useCallback, useState } from 'react';
import { Button } from '../../../lib/ui/button';

interface Props {
  onDone: (address: string) => void;
}

export const ChooseAddress = ({ onDone }: Props) => {
  const [address, setAddress] = useState<string>('');

  const onMapClick = useCallback(async (coords: [number, number]) => {
    try {
      // Запрос к Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`,
      );
      const data = await response.json();

      // Извлечение адреса
      if (data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка при получении адреса:', error);
      setAddress('Ошибка при получении адреса');
    }
  }, []);

  const done = useCallback(() => {
    if (onDone) {
      onDone(address);
    }
  }, [address]);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Map onClick={onMapClick} />
      <Actions>
        <AddressInput
          onChange={(event) => setAddress(event.target.value)}
          value={address}
          placeholder="Введите адрес вручную или кликните на карту"
        />
        <Button onClick={done}>Готово</Button>
      </Actions>
    </div>
  );
};

const Actions = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 20px;
  z-index: 400;
  padding: 0 20px;
`;

const AddressInput = styled.input`
  width: 100%;
  margin: auto;
  border: 1px solid var(--gray-blue);
  padding: 10px;
  display: flex;
  border-radius: 45px;
  background: #fff;

  &:focus {
    outline: none;
  }
`;
