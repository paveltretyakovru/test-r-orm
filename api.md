## Вариации товаров:

- https://test2.sionic.ru/api/ProductVariations
- https://test2.sionic.ru/api/ProductVariations/1
  **product_id** - id товара
  **price** - цена данной вариации товара
  **stock** - количество в наличии

---

## Свойства вариаций:

- https://test2.sionic.ru/api/ProductVariationProperties
- https://test2.sionic.ru/api/ProductVariationProperties/1

### Свойства:

**name** - название свойства
**type** - тип свойства:
0 - строка,
1 - целое число,
2 - число с плавающей точкой,
3 - значение из списка

---

## Значения списков свойств вариаций:

- https://test2.sionic.ru/api/ProductVariationPropertyListValues
- https://test2.sionic.ru/api/ProductVariationPropertyListValues/1

### Свойства:

**id**
**product_variation_property_id** - id свойства вариации
**value** - значение

<!-- **title** - заголовок значения -->

---

## Значения свойств вариаций:

- https://test2.sionic.ru/api/ProductVariationPropertyValues
- https://test2.sionic.ru/api/ProductVariationPropertyValues/1

### Свойства:

**product_variation_id** - id свойства вариации
**product_variation_property_id** - id свойства вариации
**value_string** - значение типа строка
**value_int** - значение типа целое число
**value_float** - значение типа число с плавающей точкой
**product_variation_property_list_value_id** - id значения свойства вариации из списка
