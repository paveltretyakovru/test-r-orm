/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import styled from 'styled-components';
import { useCategories } from '../../../lib/features/category/use-categories';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { colors } from '../../../lib/moks/colors';
import { Link } from '../../../lib/ui/link';
import { Skeleton } from '../../../lib/ui/skeleton';
import { Tag } from '../../../lib/ui/tag';
import { selectActiveCategory } from '../../app.selectors';
import { useCallback } from 'react';
import { CategorySchema } from '../../../lib/features/category/category.types';
import { actions } from '../../app.slice';

export function Categories() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const { categories, loading } = useCategories();

  const click = useCallback((categoryId: CategorySchema['id']) => {
    dispatch(actions.setActiveCategory(categoryId));
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Категории товаров</Title>
        <Link>Настройки</Link>
      </TitleWrapper>

      {(loading && <CategoriesSkeleton />) || (
        <TagsWrapper>
          {categories.map((category) => (
            <Tag
              key={category.id}
              color={colors[category.id]}
              active={activeCategory === category.id}
              onClick={() => click(category.id)}
            >
              {category.name}
            </Tag>
          ))}
        </TagsWrapper>
      )}
    </Wrapper>
  );
}

const CategoriesSkeleton = () => {
  return (
    <div className="flex">
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
      <Skeleton width={150} />
    </div>
  );
};

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  div {
    margin-right: 6px;
    margin-bottom: 5px;
  }
`;

const Title = styled.h1`
  //styleName: Desktop/H3 20px, Bold;
  font-family: Raleway;
  font-size: 20px;
  font-weight: 700;
  line-height: 23.48px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const TitleWrapper = styled.div`
  display: flex;

  :first-child {
    margin-right: 100px;
  }
`;

const Wrapper = styled.div``;
