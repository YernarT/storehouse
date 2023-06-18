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
      <div className={classes.drawerMask} onClick={onClose} />
      <div
        className={`${classes.drawerBody} ${
          classes[`drawerBody--${placement}`]
        }`}
      >
        {children}
      </div>
    </div>
  );
}
