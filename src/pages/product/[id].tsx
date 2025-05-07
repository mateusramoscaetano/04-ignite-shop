import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getProductById, getProducts } from "../../lib/stripe";
import Image from "next/image";
import { Loading } from "../../components/loading";
import Head from "next/head";

import axios, { type AxiosError } from "axios";
import { api } from "../../lib/axios";
import { useState } from "react";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    priceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceId: product.priceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      console.log((err as AxiosError).response?.data);
    }
  }

  return (
    <>
      <Head>{String(product.name)} | Ignite Shop</Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.image} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyButton}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProducts();

  const paths = products.map((product) => {
    return {
      params: {
        id: product.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await getProductById(productId);
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
