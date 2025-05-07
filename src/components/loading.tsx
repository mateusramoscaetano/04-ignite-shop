import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../styles/pages/product";
import { keyframes, styled } from "../styles";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

const SkeletonPulse = styled("div", {
  display: "inline-block",
  height: "100%",
  width: "100%",
  backgroundImage:
    "linear-gradient(90deg, #1ea48333 0%, #7465d433 50%, #1ea48333 100%)",
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.5s infinite linear`,
  borderRadius: "8px",
});

export function Loading() {
  return (
    <ProductContainer>
      <ImageContainer>
        <SkeletonPulse css={{ width: 520, height: 480 }} />
      </ImageContainer>

      <ProductDetails>
        <SkeletonPulse
          css={{ height: "2rem", width: "70%", marginBottom: "1rem" }}
        />
        <SkeletonPulse
          css={{ height: "2rem", width: "40%", marginBottom: "2.5rem" }}
        />
        <SkeletonPulse
          css={{ height: "8rem", width: "100%", marginBottom: "auto" }}
        />
        <SkeletonPulse
          css={{ height: "3.5rem", width: "100%", marginTop: "auto" }}
        />
      </ProductDetails>
    </ProductContainer>
  );
}
