// Type
import type { ReactElement } from "react";

// Router
import { useHistory } from "react-router-dom";

// Icons
import { IoArrowBackOutline } from "react-icons/io5";

// Scoped style
import classes from "./style.module.scss";

// Props
interface AppbarProps {
  title: string;
  actions?: ReactElement[];
}

export default function Appbar({ title, actions }: AppbarProps) {
  const history = useHistory();

  return (
    <nav className={classes.appbar}>
      <IoArrowBackOutline className="back-icon" onClick={history.goBack} />
      <h3 className="title">{title}</h3>
      <div className="actions">{actions}</div>
    </nav>
  );
}
