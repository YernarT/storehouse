// Router
import { useHistory, useLocation } from "react-router-dom";
// Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { A_User, A_Page } from "@/store";

// Hooks
import { useCreation, useMemoizedFn } from "ahooks";

// Antd component
import { Button } from "antd";
// Custom component
import { RouteGuard } from "@/components/common";
// Icons
import { AiOutlinePlus } from "react-icons/ai";

// Scoped style
import classes from "./style.module.scss";

// Routes
import routes from "@/routes";

export default function SafeArea() {
  const user = useRecoilValue(A_User);
  const setPage = useSetRecoilState(A_Page);
  const history = useHistory();
  const location = useLocation();

  const showFloatBtn = useCreation(() => {
    const disabledPages = ["/"];
    return !disabledPages.includes(location.pathname);
  }, [location.pathname]);

  const handleFloatBtn = useMemoizedFn(() => {
    console.log("handle float btn");
  });

  return (
    <div className={classes.safeArea}>
      <RouteGuard routes={routes} />
      {showFloatBtn && (
        <Button
          className="float-btn"
          type="primary"
          icon={<AiOutlinePlus />}
          onClick={handleFloatBtn}
        />
      )}
    </div>
  );
}
