"use client";

import { Button } from "../ui/button";
import { useCart } from "./../../provider/cart-provider";

type Props = {
  courseId: string;
  title: string;
  price: number;
  className?: string;
};

export default function CourseAddToCartButton({
  className = "",
  ...props
}: Props) {
  const useCartData = useCart();

  return (
    <Button
      className={className}
      onClick={() =>
        useCartData.addToCart({
          id: props.courseId,
          title: props.title,
          price: props.price,
        })
      }
    >
      加入購物車
    </Button>
  );
}
