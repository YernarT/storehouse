// Router
import { useHistory, useLocation } from "react-router-dom";
// Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { A_User, A_Page, S_UserIsAuthenticated } from "@/store";

// Hooks
import { useCreation, useMemoizedFn } from "ahooks";

// Antd component
import { Button } from "antd";
// Custom component
import { RouteGuard } from "@/components/common";
import { UserDrawer } from "@/components/user";
// Icons
import { AiOutlinePlus } from "react-icons/ai";

// Scoped style
import classes from "./style.module.scss";

// Routes
import routes from "@/routes";

export default function SafeArea() {
  const history = useHistory();
  const location = useLocation();
  const user = useRecoilValue(A_User);
  const isAuthenticated = useRecoilValue(S_UserIsAuthenticated);
  const setPage = useSetRecoilState(A_Page);

  const showFloatBtn = useCreation(() => {
    const allowedPages = ["/main"];
    return allowedPages.includes(location.pathname);
  }, [location.pathname]);

  return (
    <div className={classes.safeArea}>
      {isAuthenticated && <UserDrawer />}

      <RouteGuard routes={routes} />

      {showFloatBtn && (
        <Button
          className="float-btn"
          type="primary"
          icon={<AiOutlinePlus />}
          onClick={() => history.push("/item")}
        />
      )}
    </div>
  );
}
