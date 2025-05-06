import type { GetStaticProps } from "next";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";

import { HomeContainer, Product } from "../styles/pages/home";

import { getProducts } from "../lib/stripe";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
    drag: true,
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Product className="keen-slider__slide">
            <Image
              src={product.image}
              width={520}
              height={480}
              alt=""
              priority
            />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
