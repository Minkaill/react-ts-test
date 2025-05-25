import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import { addToCart } from '@entities/Cart/model/cartSlice';
import { OptionSelector, Option } from './OptionSelector';
import { Product } from '@entities/Product/model/types';

interface ConfigurableProductCardProps {
  product: Product & {
    configurable_options: Array<{
      attribute_code: string;
      label: string;
      values: Array<{ label: string; value_index: number; value: string }>;
    }>;
    variants: Array<{
      attributes: Array<{ code: string; value_index: number }>;
      product: { id: number; sku: string; image: string };
    }>;
  };
}

export const ConfigurableProductCard: React.FC<
  ConfigurableProductCardProps
> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const variants = product.variants;

  const colorOptionList: Option[] = product.configurable_options
    .find((o) => o.attribute_code === 'color')!
    .values.map((v) => ({
      label: v.label,
      value: v.value_index.toString(),
      color: v.value,
      disabled:
        size !== ''
          ? !variants.some(
              (varnt) =>
                varnt.attributes.some(
                  (a) => a.code === 'color' && a.value_index === v.value_index,
                ) &&
                varnt.attributes.some(
                  (a) => a.code === 'size' && a.value_index.toString() === size,
                ),
            )
          : false,
    }));

  const sizeOptionList: Option[] = product.configurable_options
    .find((o) => o.attribute_code === 'size')!
    .values.map((v) => ({
      label: v.label,
      value: v.value_index.toString(),
      disabled:
        color !== ''
          ? !variants.some(
              (varnt) =>
                varnt.attributes.some(
                  (a) => a.code === 'size' && a.value_index === v.value_index,
                ) &&
                varnt.attributes.some(
                  (a) =>
                    a.code === 'color' && a.value_index.toString() === color,
                ),
            )
          : false,
    }));

  const exactMatch = variants.find(
    (v) =>
      v.attributes.some(
        (a) => a.code === 'color' && a.value_index.toString() === color,
      ) &&
      v.attributes.some(
        (a) => a.code === 'size' && a.value_index.toString() === size,
      ),
  );

  const colorMatch = color
    ? variants.find((v) =>
        v.attributes.some(
          (a) => a.code === 'color' && a.value_index.toString() === color,
        ),
      )
    : undefined;

  const rawPath =
    exactMatch?.product.image ?? colorMatch?.product.image ?? product.image;
  const imageUrl = rawPath;

  const canAdd = !!exactMatch;

  const handleAdd = () => {
    if (!exactMatch) return;
    const colorLabel = colorOptionList.find((o) => o.value === color)!.label;
    const sizeLabel = sizeOptionList.find((o) => o.value === size)!.label;

    dispatch(
      addToCart({
        ...product,
        id: exactMatch.product.id,
        sku: exactMatch.product.sku,
        image: exactMatch.product.image,
        selectedOptions: { Color: colorLabel, Size: sizeLabel },
      }),
    );
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imageUrl} alt={product.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <OptionSelector
          label="Color"
          options={colorOptionList}
          selected={color}
          onChange={setColor}
        />
        <OptionSelector
          label="Size"
          options={sizeOptionList}
          selected={size}
          onChange={setSize}
        />
        <div className="mt-auto">
          <Button variant="primary" onClick={handleAdd} disabled={!canAdd}>
            Add to cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
