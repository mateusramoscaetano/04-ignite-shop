import Link from "next/link";
import {
  SuccessContainer,
  ImageContainer,
  ProductsContainer,
} from "../styles/pages/success";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";
import Image from "next/image";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const productCount = products.length;

  // Lista de nomes dos produtos para exibição na mensagem
  const productNames = products.map((p) => p.name).join(", ");

  return (
    <>
      <Head>
        <title>Compra concluída | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ProductsContainer>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image
                src={product.imageUrl}
                width={120}
                height={110}
                alt={product.name}
              />
            </ImageContainer>
          ))}
        </ProductsContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{" "}
          {productCount === 1 ? (
            <strong>{products[0].name}</strong>
          ) : (
            <strong>{productCount} camisetas</strong>
          )}{" "}
          já {productCount === 1 ? "está" : "estão"} a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    if (!query.session_id) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const sessionId = String(query.session_id);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    const customerName = session.customer_details?.name || "Cliente";

    const products =
      session.line_items?.data
        .map((item) => {
          try {
            const product = item.price?.product as Stripe.Product;

            return {
              id: product.id,
              name: product.name,
              imageUrl: product.images?.[0] || "",
            };
          } catch (err) {
            console.error("Erro ao processar item:", err);
            return null;
          }
        })
        .filter(Boolean) || [];

    if (products.length === 0) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        customerName,
        products,
      },
    };
  } catch (error) {
    console.error("Erro ao carregar a página de sucesso:", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
