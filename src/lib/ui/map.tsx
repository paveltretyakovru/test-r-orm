/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { ControlPosition, LatLngExpression } from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import styled, { createGlobalStyle } from 'styled-components';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const position = [59.938784, 30.314997] as LatLngExpression;

const foundedLocationIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  iconSize: [25, 41],
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

interface LeafletgeoSearchProps {
  position: ControlPosition;
}
function LeafletgeoSearch({ position }: LeafletgeoSearchProps) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      position,
      provider,

      // marker: { icon: foundedLocationIcon },
      // marker: null,
      marker: {
        icon: L.divIcon({ className: '' }), // Пустой divIcon убирает маркер
      },
      searchLabel: 'Поиск города, адреса на карте',
    });

    const toggleSearch = () => {
      const searchContainer = document.querySelector('.geosearch.leaflet-bar');
      // dispatch(
      //   mapActions.toggleIsSearchOpened(
      //     searchContainer?.classList.contains('active')
      //   )
      // );
    };

    searchControl.button.addEventListener('click', toggleSearch);

    map.addControl(searchControl);

    // Обработчик события выбора локации
    map.on('geosearch/showlocation', (event) => {
      console.log('SHOW LOACTION EVENT', event);
      map.setView(
        [(event as any).location.y, (event as any).location.x],
        map.getZoom(),
      ); // Центрируем карту
    });

    const handleDocumentClick = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.geosearch.leaflet-bar');
      // if (searchContainer && !searchContainer.contains(event.target as Node)) {
      //   dispatch(mapActions.toggleIsSearchOpened(false));
      //   searchContainer.classList.remove('active');
      // }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      map.removeControl(searchControl);
      document.removeEventListener('click', handleDocumentClick);
      searchControl.button.removeEventListener('click', toggleSearch);
    };
  }, []);

  return null;
}

interface ClickLayerProps {
  onClick?: (coords: [number, number]) => void;
}
function ClickLayer({ onClick }: ClickLayerProps) {
  const map = useMap();

  useEffect(() => {
    map.addEventListener('click', (event) => {
      console.log('Click event', event);
      if (onClick) {
        onClick([event.latlng.lat, event.latlng.lng]);
      }
    });
  }, []);

  return null;
}

interface MapProps {
  onClick?: (coords: [number, number]) => void;
}

export const Map = ({ onClick }: MapProps) => {
  return (
    <Wrapper>
      <Styles />
      <MapContainer
        style={{ width: '100vw', height: 500 }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <ClickLayer onClick={onClick} />
        <LeafletgeoSearch position="topright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
`;

const Styles = createGlobalStyle`
    .leaflet-control-attribution.leaflet-control {
    display: none;
  }

  .leaflet-bottom .leaflet-control {
    margin-bottom: 64px;
  }
  .leaflet-right .leaflet-control {
    margin-right: 17px;
  }

  .leaflet-control-zoom.leaflet-bar.leaflet-control {
    border: none;
    width: 46px;
    height: 46px;
    line-height: 46px;
    font-weight: 300;
    font-size: 32px;

    a {
      color: var(--text-primary);
      width: 46px;
      height: 46px;
      line-height: 46px;
      background-color: var(--bg-secondary);
    }

    a:first-child {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }

    a:last-child {
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }

  .geosearch.leaflet-bar {
    border: none;

    a {
      color: var(--text-primary);
      background-color: var(--bg-secondary);
    }

    input {
      padding: 5px;
      height: 40px;
      min-width: 336px;
      font-size: 14px;
      line-height: 20px;
      background: #fff;

      &:focus {
        outline: none;
      }
    }

    form {
      right: 50px;
      padding-left: 10px;
      border-radius: 8px;

      // reset button
      & > button {
        color: inherit;
        background: inherit;
        font-size: 20px;
        padding-right: 13px;
        margin-top: 5px;
      }

      .results {
        background: inherit;

        & > div {
          border: none;
          border-radius: 8px;
          font-size: 14px;
          line-height: 24px;
          min-height: 36px;
          padding-top: 5px;

          &:hover {
            background: var(--bg-hover);
          }
        }
      }
    }

    form,
    form input {
      box-shadow: none;
      color: var(--text-primary);
      background-color: var(--bg-secondary);
    }

    a.leaflet-bar-part {
      width: 40px;
      height: 40px;
      display: none;

      &:hover {
        &:before {
          top: 24px;
          left: 19px;
          width: 12px;
          border-top: 2px solid var(--click-state);
          transform: rotateZ(45deg);
        }

        &:after {
          top: 10px;
          left: 12px;
          height: 13px;
          width: 13px;
          border-radius: 50%;
          border: 2px solid var(--click-state);
        }
      }

      &:before {
        top: 24px;
        left: 19px;
        width: 12px;
        border-top: 2px solid var(--text-primary);
        transform: rotateZ(45deg);
      }

      &:after {
        top: 10px;
        left: 12px;
        height: 13px;
        width: 13px;
        border-radius: 50%;
        border: 2px solid var(--text-primary);
      }
    }

    &.active {
      a.leaflet-bar-part {
        &:before {
          top: 24px;
          left: 19px;
          width: 12px;
          border-top: 2px solid var(--click-state);
          transform: rotateZ(45deg);
        }

        &:after {
          top: 10px;
          left: 12px;
          height: 13px;
          width: 13px;
          border-radius: 50%;
          border: 2px solid var(--click-state);
        }
      }
    }
  }
  `;
