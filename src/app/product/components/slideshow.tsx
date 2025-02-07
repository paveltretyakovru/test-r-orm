/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */

import styled from 'styled-components';

import { useCallback, useEffect, useState } from 'react';
import arrowRightUrl from '../../../lib/assets/arrow-right.png';
import { ImageSchema } from '../../../lib/features/image/image.types';
import noImageUrl from './assets/no-image.jpg';

const IMAGES_PER_PAGE = 5;

interface Props {
  images: ImageSchema[];
}
export const SlideShow = ({ images }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [activeImageUrl, setActiveImageUrl] = useState<string>();

  useEffect(() => {
    if (images.length) {
      setActiveImageUrl(images[0].imageUrl);
    }
  }, [images]);

  const next = useCallback(() => {
    const pages = Math.round(images.length / IMAGES_PER_PAGE);

    setPage((pages === page && 1) || page + 1);
  }, [page]);

  const click = useCallback(
    (imageUrl: string) => {
      setActiveImageUrl(imageUrl);
    },
    [images],
  );

  return (
    <Wrapper>
      {(images && (
        <>
          <Big>{activeImageUrl && <img src={activeImageUrl} />}</Big>
          <MiniaturesWrapper>
            <Miniatures>
              {images.map((image, index, arr) => {
                const pages = Math.round(arr.length / IMAGES_PER_PAGE);
                const startIndex =
                  page === 1 ? 0 : IMAGES_PER_PAGE * (page - 1);
                const endIndex = IMAGES_PER_PAGE * page - 1;

                return (
                  (index >= startIndex && index <= endIndex && (
                    <div
                      key={image.id}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <Miniature
                        src={image.imageUrl}
                        width={65}
                        onClick={() => click(image.imageUrl)}
                      />
                    </div>
                  )) ||
                  null
                );
              })}
            </Miniatures>

            {Math.round(images.length / IMAGES_PER_PAGE) > 1 && (
              <Arrow>
                <img
                  width={30}
                  src={arrowRightUrl}
                  height={30}
                  onClick={next}
                />
              </Arrow>
            )}
          </MiniaturesWrapper>
        </>
      )) || <img src={noImageUrl} />}
    </Wrapper>
  );
};

const Arrow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Big = styled.div`
  /* min-height: 360px; */

  img {
    max-height: 350px;
    margin: auto;
    margin-bottom: 10px;
  }
`;

const Miniature = styled.img`
  cursor: pointer;
  height: 70px;
`;

const Miniatures = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const MiniaturesWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
