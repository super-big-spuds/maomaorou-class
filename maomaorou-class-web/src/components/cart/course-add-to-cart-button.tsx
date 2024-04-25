"use client";

import { Button } from "../ui/button";
import { useCart } from "./../../provider/cart-provider";

type Props = {
  courseId: string;
  title: string;
  price: number;
  durationDay: number;
  className?: string;
};

export default function CourseAddToCartButton({
  className = "",
  ...props
}: Props) {
  const useCartData = useCart();

  const getExpiredAt = (durationDay: number) => {
    const now = new Date();
    return new Date(now.setDate(now.getDate() + durationDay));
  };

  return (
    <Button
      className={className}
      onClick={() =>
        useCartData.addToCart({
          id: props.courseId,
          title: props.title,
          price: props.price,
          expiredAt: getExpiredAt(props.durationDay),
          durationDay: props.durationDay,
        })
      }
    >
      加入購物車
    </Button>
  );
}
