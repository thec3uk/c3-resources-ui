import { Link } from "remix";
import { components, layout } from "../components";

import { IImageBoxProps, Theme } from "./imageGrid.types";

export function ImageGrid({
  title,
  items,
  theme = Theme.light,
  link,
}: {
  title: string;
  items: Array<IImageBoxProps>;
  theme?: Theme;
  link?: {
    label: string;
    url: string;
  };
}) {
  return (
    <>
      {items.map((box, idx) => {
        return (
          <layout.Main hash={box.key + idx} key={box.key + idx}>
            <components.ImageCard title={title} subtitle={box.title} image={box.thumbnail as string} link={box.link} />
          </layout.Main>
        );
      })}
    </>
  );
}
