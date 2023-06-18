// Types
import type { I_Tag } from "@/def_types/item";
import type { CSSProperties } from "react";

// React
import { memo } from "react";
// Router
import { useHistory } from "react-router-dom";

// Hooks
import { useCreation } from "ahooks";

// Antd component
import { Button } from "antd";
// Icons
import { BsTags } from "react-icons/bs";

// Scoped style
import classes from "./style.module.scss";

// Props
interface TagListProps {
  data: I_Tag[];
}
interface TagCSSProperties extends CSSProperties {
  "--color": string;
  "--background-color": string;
}

export default memo(function TagList({ data }: TagListProps) {
  const history = useHistory();

  const hasTag = useCreation(() => {
    return data.length > 0;
  }, [data.length]);

  return (
    <div className={classes.tagList}>
      <Button
        className="all-tag"
        icon={<BsTags />}
        onClick={() => history.push("/tag", { tagList: data })}
      />
      <Button className="all-filter">Бәрі</Button>
      {hasTag && <Button className="untaged">Жіктелмеген</Button>}

      {data.map((tag) => (
        <Button
          key={tag.id}
          className={classes.tag}
          style={
            {
              "--color": tag.color,
              "--background-color": tag.backgroundColor,
            } as TagCSSProperties
          }
        >
          {tag.name}
        </Button>
      ))}
    </div>
  );
});
