import { PrismicLink } from "@prismicio/react";
import * as React from "react";
import BaseCard from "./base";
import {
  EmptyLinkField,
  FilledLinkToWebField,
  FilledLinkToDocumentField,
  FilledLinkToMediaField,
} from "@prismicio/types";
import { Link } from "remix";
// import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Card = ({
  title,
  subtitle,
  cta,
  to,
  colour = "teal",
  children,
  image,
}: {
  title: string;
  cta: string;
  to: any;
  colour?: string;
  subtitle: string;
  children?: React.ReactNode;
  image: any;
}) => {
  // const gImage = getImage(image);

  return (
    <BaseCard colour={colour ? colour : "teal"}>
      <div className="flex flex-col justify-between col-span-3 md:col-span-7 row-span-full">
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold lg:text-5xl">
            <span className="md:hidden">
              {title}
              {title && subtitle && `:`}
              {title && subtitle && <br />}
            </span>
            {subtitle}
          </h2>
          {children && <div className="font-medium leading-snug tracking-wide line-clamp-5">{children}</div>}
        </div>
        {to && (
          <Link
            to={to}
            className="w-full px-6 py-1 mt-2 text-xl font-bold text-center transition-colors duration-300 bg-black rounded shadow lg:py-3 lg:text-3xl text-gray-50">
            {cta}
          </Link>
        )}
      </div>
      <div className="h-full col-span-2 md:col-span-4 lg:col-span-4 row-span-full">
        <Link to={to}>
          <img
            src={image}
            alt={image.alt || "An Image needing an alt text"}
            className="object-cover w-full h-full rounded-lg group-hover:text-red-500 "
          />
        </Link>
      </div>
      <div className="hidden col-start-12 md:flex justify-start items-center [writing-mode:vertical-lr] row-span-full">
        <h2 className="font-bold underline md:text-4xl lg:text-5xl whitespace-nowrap">{title}</h2>
      </div>
    </BaseCard>
  );
};

export default Card;
