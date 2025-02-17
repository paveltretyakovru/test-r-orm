/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { Skeleton } from '../../../../lib/ui/skeleton';
import { ProductCard } from './product-card';
import { useProductList } from './use-product-list';
import { Button } from '../../../../lib/ui/button';
import { Col, Row } from 'react-grid-system';

export function ProductsList() {
  const { loading, products, nextPage, finished } = useProductList();

  return (
    <>
      <Wrapper>
        {products.length &&
          products.map((product) => (
            <ProductCard key={`${product.id}`} product={product} />
          ))}

        {!loading && !products.length && (
          <NoProducts>Для данной категории товары не найдены</NoProducts>
        )}

        {loading && <ProductsSkeleton />}
      </Wrapper>

      <Row>
        <Col>
          {!finished && (
            <Button onClick={nextPage}>
              {(loading && <Loader />) || 'Загрузить ещё'}
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

const ProductsSkeleton = () => {
  return (
    <Wrapper>
      {(() => {
        return Array(4)
          .fill(null)
          .map((el, i) => (
            <div
              key={`product-skelet-${i}`}
              className="flex flex-col"
              style={{ width: 200 }}
            >
              <Skeleton variant="image" />
              <Skeleton />
            </div>
          ));
      })()}
    </Wrapper>
  );
};

const Loader = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: prixClipFix 2s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`;

const NoProducts = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10%;
`;

const Wrapper = styled.div`
  gap: 30px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 135px;
`;
