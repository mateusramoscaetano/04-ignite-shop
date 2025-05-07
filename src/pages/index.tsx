import type { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";

import { CartButton, HomeContainer, Product } from "../styles/pages/home";

import { getProducts } from "../lib/stripe";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import cartIcon from "../assets/cart-icon.svg";
import { useCart } from "../lib/cart";
interface HomeProps {
  products: {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    priceId: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { addToCart } = useCart();

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
    drag: true,
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product className="keen-slider__slide" key={product.id}>
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                width={520}
                height={480}
                alt=""
                priority
              />
            </Link>
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>
              <CartButton
                onClick={() =>
                  addToCart({
                    ...product,
                    priceId: product.priceId,
                  })
                }
              >
                <Image src={cartIcon} alt="" />
              </CartButton>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
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
