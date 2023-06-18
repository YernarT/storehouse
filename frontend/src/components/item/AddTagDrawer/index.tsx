// Types
import type { I_Item, I_Tag, I_TagWithDetail } from "@/def_types/item";
import type { I_User } from "@/def_types/user";
import type { CSSProperties } from "react";
import type { DrawerProps } from "@/components/common/Drawer";
import type { Color } from "antd/es/color-picker";

// Router
import { useLocation } from "react-router-dom";

// Hooks
import {
  useRequest,
  useMemoizedFn,
  useSetState,
  useMount,
  useCreation,
} from "ahooks";
// API
import { API_CreateTag, API_GetItem, API_GetTag } from "@/service/item-api";

// Antd component
import { Button, Checkbox, Input, ColorPicker, App } from "antd";
// Icons
import { HiOutlinePlus } from "react-icons/hi";
import { GrLinkTop } from "react-icons/gr";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// Custom component
import { Drawer } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

// Props
interface AddTagDrawerProps
  extends Omit<DrawerProps, "placement" | "children"> {
  onAdd: (tag: I_TagWithDetail) => void;
  onCancel: () => void;
}

interface TagCSSProperties extends CSSProperties {
  "--color": string;
  "--background-color": string;
}

const recommendColors = [
  { color: "#c41d7f", backgroundColor: "#fff0f6" },
  { color: "#cf1322", backgroundColor: "#fff1f0" },
  { color: "#d46b08", backgroundColor: "#fff7e6" },
  { color: "#d48806", backgroundColor: "#fffbe6" },
  { color: "#389e0d", backgroundColor: "#f6ffed" },
  { color: "#08979c", backgroundColor: "#e6fffb" },
  { color: "rgba(0,0,0,0.88)", backgroundColor: "#fafafa" },
  { color: "#0958d9", backgroundColor: "#e6f4ff" },
  { color: "#1d39c4", backgroundColor: "#f0f5ff" },
  { color: "#531dab", backgroundColor: "#f9f0ff" },
];

const defaultState = {
  name: "Lorem",
  color: recommendColors[0].color,
  backgroundColor: recommendColors[0].backgroundColor,
};

export default function AddTagDrawer({
  onAdd,
  onCancel,
  ...props
}: AddTagDrawerProps) {
  const { message: AntdMessage } = App.useApp();

  const [state, setState] = useSetState(defaultState);

  const { run: createTag, loading: createTagLoading } = useRequest(
    API_CreateTag,
    {
      manual: true,
      onSuccess(res) {
        setState(defaultState);
        onAdd(res.data);
      },

      onError(err) {
        AntdMessage.error(err.message);
      },
    }
  );

  const handleAddTag = () => {
    if (state.name.length === 0) {
      AntdMessage.warning("Атауы бос болмау керек");
      return;
    }

    createTag(state);
  };

  return (
    <Drawer placement="bottom" {...props}>
      <div className={classes.addTagDrawer}>
        <span className="title">Тег қосу</span>

        <Input
          className="tag-name"
          placeholder="Тег атауы"
          value={state.name}
          style={
            {
              "--color": state.color,
              "--background-color": state.backgroundColor,
            } as TagCSSProperties
          }
          onChange={(e) => {
            setState({ name: e.target.value });
          }}
        />

        <div className="pick-color">
          <div className="item">
            <ColorPicker
              arrow={false}
              format="hex"
              value={state.color}
              onChange={(value: Color) =>
                setState({ color: value.toHexString() })
              }
            />
            <span>Шрифт түсі</span>
          </div>
          <div className="item">
            <ColorPicker
              arrow={false}
              format="hex"
              value={state.backgroundColor}
              onChange={(value: Color) =>
                setState({ backgroundColor: value.toHexString() })
              }
            />
            <span>Фон түсі</span>
          </div>
        </div>

        <div className="recommend-colors">
          <span className="title">Ұсынатын түстер</span>

          <div className="list">
            {recommendColors.map((item, index) => (
              <div
                key={index}
                className="item"
                style={
                  {
                    "--color": item.color,
                    "--background-color": item.backgroundColor,
                  } as TagCSSProperties
                }
                onClick={() =>
                  setState({
                    color: item.color,
                    backgroundColor: item.backgroundColor,
                  })
                }
              >
                Lorem
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <Button onClick={onCancel}>Болдырмау</Button>
          <Button onClick={handleAddTag} type="primary">
            Қосу
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
