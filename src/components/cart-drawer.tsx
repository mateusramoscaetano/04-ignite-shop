import * as Dialog from "@radix-ui/react-dialog";
import {
  ButtonCheckout,
  Cart,
  CartCard,
  CartCardContent,
  CartCardImage,
  CartCardPrice,
  CartCardRemoveButton,
  CartCardTitle,
  CartContainer,
  CartCount,
  CartFooter,
  CartQuantity,
  CartTotal,
} from "../styles/pages/app";
import Image from "next/image";
import { useCart } from "../lib/cart";
import cartIcon from "../assets/cart-icon.svg";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loading } from "./loading";
import axios, { type AxiosError } from "axios";

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    total,
    calculateTotal,
    ensureItemsHavePriceId,
    clearCart,
  } = useCart();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const validItems = items.filter((item) => Boolean(item.priceId));

      if (validItems.length === 0) {
        setIsCreatingCheckoutSession(false);
        alert(
          "Não há itens válidos no carrinho. Todos os produtos precisam de um ID de preço."
        );
        return;
      }

      const response = await axios.post("/api/checkout", {
        items: validItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      console.error("Erro ao processar checkout:", err);

      if ((err as AxiosError).response?.data) {
        console.error("Detalhes do erro:", (err as AxiosError).response?.data);
      }

      alert(
        "Falha ao processar o pagamento. Verifique o console para mais detalhes."
      );
    }
  }

  useEffect(() => {
    calculateTotal();
  }, [items, calculateTotal]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Cart>
          <Image src={cartIcon} alt="" />
          {items.length > 0 && <CartCount>{items.length}</CartCount>}
        </Cart>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
          }}
        />
        <Dialog.Content
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 480,
            height: "100%",
            background: "#202024",
            paddingTop: 100,
            padding: 48,
            boxShadow: "-4px 0 30px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.2s",
            transform: "translateX(0)",
          }}
        >
          <Dialog.Title
            style={{
              fontSize: 20,
              fontWeight: 700,
              paddingBottom: 32,
              paddingTop: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Sacola de compras</span>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#8D8D99",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Limpar carrinho
              </button>
            )}
          </Dialog.Title>

          <Dialog.Description></Dialog.Description>

          <CartContainer className="scroll">
            {items.map((item) => (
              <CartCard key={item.id}>
                <CartCardImage>
                  <Image src={item.image} alt="" width={94} height={94} />
                </CartCardImage>
                <CartCardContent>
                  <div>
                    <CartCardTitle>{item.name}</CartCardTitle>
                    <CartCardPrice>{item.price}</CartCardPrice>
                  </div>

                  <CartCardRemoveButton onClick={() => removeFromCart(item.id)}>
                    Remover
                  </CartCardRemoveButton>
                </CartCardContent>
              </CartCard>
            ))}
          </CartContainer>
          <Dialog.Close asChild>
            <button
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                padding: 4,
                borderRadius: 6,
                cursor: "pointer",
                border: "none",
                background: "transparent",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#29292E")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <X size={24} color="#8D8D99" />
            </button>
          </Dialog.Close>

          <CartFooter>
            <CartQuantity>
              <h3>Quantidade</h3>
              <h2>{items.length} itens</h2>
            </CartQuantity>

            <CartTotal>
              <h3>Valor total</h3>
              <h2>
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
            </CartTotal>

            <ButtonCheckout
              onClick={handleBuyButton}
              disabled={isCreatingCheckoutSession}
            >
              Finalizar compra
            </ButtonCheckout>
          </CartFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
