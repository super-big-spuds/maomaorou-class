"use client";

import { Button } from "../ui/button";
import { useCart } from "./../../provider/cart-provider";
import CartButton from "./header-cart-button";

type Props = {
  courseId: string;
  title: string;
  price: number;
};

export default function CourseAddToCartButton(props: Props) {
  const useCartData = useCart();

  return (
    <Button
      onClick={() =>
        useCartData.addToCart({
          id: props.courseId,
          title: props.title,
          price: props.price,
        })
      }
    >
      Add to Cart
    </Button>
  );
}
