import { AppProps } from "next/app";
import { globalStyles } from "../styles/globals";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logo} alt="" width={130} height={52} />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
