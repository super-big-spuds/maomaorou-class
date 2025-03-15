"use client";

import { Button } from "../ui/button";
import { useCart } from "./../../provider/cart-provider";

type Props = {
  course: {
    id: string;
    title: string;
    price: number;
    durationDay: number;
  };
  selectedOption?: {
    id: string;
    name: string;
    price: number;
  };
  className?: string;
};

// Check is firstBuy outside of the component
export default function CourseAddToCartButton({
  course,
  selectedOption,
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
          id: course.id,
          title: course.title,
          price: course.price,
          expiredAt: getExpiredAt(course.durationDay),
          durationDay: course.durationDay,
          selectedOption: selectedOption,
        })
      }
      {...props}
    >
      加入購物車
    </Button>
  );
}
