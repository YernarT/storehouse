// Scoped style
import classes from "./style.module.scss";

// Props
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  placement?: "left" | "bottom";
}

export default function Drawer({
  open,
  onClose,
  children,
  placement = "left",
}: DrawerProps) {
  return (
    <div className={`${classes.drawer} ${open && classes.drawerOpened}`}>
      <div className="mask" onClick={onClose} />
      <div className={`body body--${placement}`}>{children}</div>
    </div>
  );
}
