import React from "react";
import Image from "next/image";

interface Props {
  image: string;
  alt: string;
}

const RenderImage = ({ ...props }: Props) => {
  return (
    <Image
      src={props.image}
      alt={props.alt}
      priority={true}
      fill
      className={`rounded-t-xl object-cover`}
    />
  );
};

export default RenderImage;
