import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!priceId) {
    return res.status(400).json({ error: "Price not found." });
  }

  const checkoutSession = await getSession(priceId);

  return res.status(201).json({
    checkoutUrl: checkoutSession,
  });
}
