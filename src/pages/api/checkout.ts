import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!items) {
    return res.status(400).json({ error: "Items not found." });
  }

  const missingPriceId = items.some((item: any) => !item.priceId);
  if (missingPriceId) {
    return res
      .status(400)
      .json({ error: "Some items are missing priceId field." });
  }

  try {
    const checkoutSession = await getSession(items);

    return res.status(201).json({
      checkoutUrl: checkoutSession,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating checkout session." });
  }
}
