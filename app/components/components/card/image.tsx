import * as React from "react";
import TitleCard from "./title";
import { Link } from "remix";

const ImageCard = ({
  title,
  subtitle,
  image,
  link,
}: {
  title?: string;
  image: string;
  subtitle?: string;
  link?: any;
}) => {
  const Card = () => (
    <div
      className="h-56 bg-center bg-cover shadow rounded md:h-72 lg:h-full lg:min-h-80"
      style={{
        backgroundImage: `url(${image})`,
      }}>
      <TitleCard title={title} subtitle={subtitle} colour={"transparent"} />
    </div>
  );
  return (
    <>
      {link ? (
        <Link to={link} className="group">
          <Card />
        </Link>
      ) : (
        <Card />
      )}
    </>
  );
};

export default ImageCard;
