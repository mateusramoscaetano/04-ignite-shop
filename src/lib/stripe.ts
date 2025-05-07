import type { ParsedUrlQuery } from "querystring";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
  appInfo: {
    name: "Ignite Shop",
    version: "0.1.0",
  },
});

export const getProducts = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
      image: product.images[0],
    };
  });

  return products;
};

export const getProductById = async (id: string) => {
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    id: product.id,
    name: product.name,
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
    image: product.images[0],
    description: product.description,
    priceId: price.id,
  };
};

export const getSession = async (id: string) => {
  const successUrl = `${process.env.PUBLIC_NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.PUBLIC_NEXT_URL}/`;

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: [
      {
        price: id,
        quantity: 1,
      },
    ],
  });

  return session.url;
};
