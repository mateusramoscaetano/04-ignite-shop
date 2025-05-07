import { AppProps } from "next/app";
import { globalStyles } from "../styles/globals";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { Cart, CartCount, Container, Header } from "../styles/pages/app";
import { useRouter } from "next/router";
import cartIcon from "../assets/cart-icon.svg";
import { useCart } from "../lib/cart";
import { CartDrawer } from "../components/cart-drawer";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <Header>
        <Image
          src={logo}
          alt=""
          width={130}
          height={52}
          onClick={handleBackToHome}
          style={{ cursor: "pointer" }}
        />

        <CartDrawer />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
