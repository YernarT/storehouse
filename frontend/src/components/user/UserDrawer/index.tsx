// Router
import { useHistory } from "react-router-dom";
// Recoil
import { useRecoilState } from "recoil";
import { A_User, A_Page, defaultUserState } from "@/store";

// Hooks
import { useSetState, useEventListener, useMemoizedFn } from "ahooks";
// Utils
import { localStorage } from "@/utils";

// Antd component
import { Button } from "antd";
// Icons
import { AiOutlineUser } from "react-icons/ai";
// Custom component
import { Drawer } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

export default function UserDrawer() {
  const history = useHistory();
  const [user, setUser] = useRecoilState(A_User);
  const [page, setPage] = useRecoilState(A_Page);

  const [state, setState] = useSetState({
    toucheX: null as number | null,
  });

  // 滑动打开 drawer
  useEventListener("touchstart", (e) => {
    setState({ toucheX: e.touches[0].clientX });
  });
  const touchhandler = useMemoizedFn((e: TouchEvent) => {
    const currentTouchX = e.touches[0].clientX;
    const distance = 100;

    if (state.toucheX !== null && currentTouchX - state.toucheX > distance) {
      setPage((prevState) => ({ ...prevState, userDrawerIsOpen: true }));
    }

    if (state.toucheX !== null && currentTouchX - state.toucheX < -distance) {
      setPage((prevState) => ({ ...prevState, userDrawerIsOpen: false }));
    }
  });
  useEventListener("touchmove", touchhandler);
  useEventListener("touchend", () => {
    setState({ toucheX: null });
  });

  // 退出登录
  const handleLogout = () => {
    localStorage.set("user", defaultUserState);
    setPage((prevState) => ({ ...prevState, userDrawerIsOpen: false }));
    setUser(defaultUserState);
    history.push("/");
  };

  return (
    <Drawer
      open={page.userDrawerIsOpen}
      onClose={() =>
        setPage((prevState) => ({ ...prevState, userDrawerIsOpen: false }))
      }
    >
      <div className={classes.userDrawer}>
        <div className="head">
          <AiOutlineUser className="avatar" />
          <span className="phone">{user.phone}</span>
        </div>

        {/* <div className="body">TODO</div> */}
        {/* @TODO:
            1. Profile
            2. Settings
            3. About
            4. 意见箱
        */}

        <div className="content">
          <Button block danger className="logout" onClick={handleLogout}>
            Шығу
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
