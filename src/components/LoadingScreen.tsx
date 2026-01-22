import Lottie from "lottie-react";
import animationData from "../assets/cat-loader.json";

type Props = {
  message?: string;
};

export function LoadingScreen({ message = "Loading cats…" }: Props) {
  return (
    <div className="loading-screen">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: 220, height: 220 }}
      />
      <p className="loading-text">{message}</p>
    </div>
  );
}
