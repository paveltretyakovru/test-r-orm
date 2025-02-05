/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { Skeleton } from '../../../../lib/ui/skeleton';
import { ProductCard } from './product-card';
import { useProductList } from './use-product-list';

export function ProductsList() {
  const { loading, filteredProducts } = useProductList();

  return (
    <Wrapper>
      {(filteredProducts.length &&
        filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.model.id}-${index}`}
            productId={product.model.id}
            variationId={product.variation?.id || null}
          />
        ))) ||
        (loading && <ProductsSkeleton />) || (
          <NoProducts>Для данной категории товары не найдены</NoProducts>
        )}
    </Wrapper>
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
