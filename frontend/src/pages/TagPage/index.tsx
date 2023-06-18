// Types
import type { I_Item, I_Tag, I_TagWithDetail } from "@/def_types/item";
import type { I_User } from "@/def_types/user";
import type { CSSProperties } from "react";

// Router
import { useLocation } from "react-router-dom";

// Hooks
import { useRequest, useSetState, useMount, useCreation } from "ahooks";
// API
import { API_DeleteTag, API_GetItem, API_GetTag } from "@/service/item-api";

// Antd component
import { App, Checkbox } from "antd";
// Icons
import { HiOutlinePlus } from "react-icons/hi";
import { GrLinkTop } from "react-icons/gr";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// Custom component
import { Appbar } from "@/components/common";
import { AddTagDrawer } from "@/components/item";

// Scoped style
import classes from "./style.module.scss";

interface TagCSSProperties extends CSSProperties {
  "--color": string;
  "--background-color": string;
}

export default function TagPage() {
  const location = useLocation();
  const { message: AntdMessage } = App.useApp();
  const [state, setState] = useSetState({
    tagList: [] as (I_TagWithDetail & { isChecked: boolean })[],
    allTagIsChecked: false,
    addTagDrawerIsOpen: false,
  });

  const { run: fetchTagList, loading: loadingGetItem } = useRequest(
    API_GetTag,
    {
      manual: true,
      onSuccess(res) {
        setState({
          tagList: res.data.map((tag) => ({ ...tag, isChecked: false })),
        });
      },
    }
  );

  const { run: deleteTag, loading: loadingDeleteItem } = useRequest(
    API_DeleteTag,
    {
      manual: true,
      onSuccess() {
        setState((prevState) => ({
          tagList: prevState.tagList.filter((tag) => !tag.isChecked),
        }));
      },
    }
  );

  useMount(() => {
    // @ts-ignore
    if (location.state && location.state.tagList) {
      // @ts-ignore
      setState({ tagList: location.state.tagList });
      return;
    }

    fetchTagList();
  });

  const changeTagCheckedState = (targetTagId: number, value: boolean) => {
    setState((prevState) => {
      const newTagList = prevState.tagList.map((tag) => {
        if (tag.id === targetTagId) {
          tag.isChecked = value;
        }
        return tag;
      });

      // 调整 全选状态
      setState({
        allTagIsChecked: (
          newTagList as any as (I_TagWithDetail & { isChecked: boolean })[]
        ).every((tag) => tag.isChecked),
      });

      return {
        tagList: newTagList,
      };
    });
  };

  // 全选 / 全不选
  const changeAllCheckedState = (isChecked: boolean) => {
    setState((prevState) => ({
      allTagIsChecked: isChecked,
      tagList: prevState.tagList.map((tag) => {
        tag.isChecked = isChecked;
        return tag;
      }),
    }));
  };

  // 删除 Tag
  const handleDeleteTag = () => {
    deleteTag({
      ids: state.tagList.filter((tag) => tag.isChecked).map((tag) => tag.id),
    });
  };

  return (
    <main className={classes.tagPage}>
      <Appbar
        title="Тегтер"
        actions={[
          <HiOutlinePlus
            key="plus-icon"
            onClick={() => setState({ addTagDrawerIsOpen: true })}
          />,
        ]}
      />

      <div className={classes.tagList}>
        <div className="item">
          <Checkbox
            checked={state.allTagIsChecked}
            onChange={(e) => changeAllCheckedState(e.target.checked)}
          />
          <span className="name">Бәрі</span>
          <span className="count">{state.tagList.length}</span>
        </div>

        {state.tagList.map((tag) => (
          <div
            key={tag.id}
            className="item"
            style={
              {
                "--color": tag.color,
                "--background-color": tag.backgroundColor,
              } as TagCSSProperties
            }
          >
            <Checkbox
              checked={tag.isChecked}
              onChange={(e) => changeTagCheckedState(tag.id, e.target.checked)}
            />
            <span className="name">{tag.name}</span>
            <span className="count">{tag.associatedItems.length}</span>
          </div>
        ))}
      </div>

      <AddTagDrawer
        open={state.addTagDrawerIsOpen}
        onClose={() => setState({ addTagDrawerIsOpen: false })}
        onAdd={(tag) =>
          setState((prevState) => ({
            addTagDrawerIsOpen: false,
            tagList: [...prevState.tagList, { ...tag, isChecked: false }],
          }))
        }
        onCancel={() => setState({ addTagDrawerIsOpen: false })}
      />

      <footer className="bottom-bar">
        <div
          className="item"
          onClick={() => AntdMessage.info("Дайын емес функция")}
        >
          <GrLinkTop />
          <span>Жоғарыға</span>
        </div>
        <div className="item" onClick={handleDeleteTag}>
          <AiOutlineDelete />
          <span>Жою</span>
        </div>
        <div
          className="item"
          onClick={() => AntdMessage.info("Дайын емес функция")}
        >
          <AiOutlineEdit />
          <span>Өңдеу</span>
        </div>
      </footer>
    </main>
  );
}
