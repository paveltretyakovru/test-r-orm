/*
 *   Copyright (c) 2025 Olymp.Digital
 *   All rights reserved.
 */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import { setCategories } from './category.actions';
import { getCategories } from './category.api';
import { selectCategories } from './category.selectors';

export function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategories);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getCategories()
      .then((response) => dispatch(setCategories(response)))
      .then(() => setLoading(false))
      .catch();
  }, []);

  return { categories, loading };
}
