import { AppProps } from "next/app";
import { globalStyles } from "../styles/globals";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import { useRouter } from "next/router";

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
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
