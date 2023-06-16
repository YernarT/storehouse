// Recoil
import { useSetRecoilState } from "recoil";
import { A_Page } from "@/store";

// Antd component
import { Input } from "antd";
// Icons
import { RiMenu2Fill } from "react-icons/ri";

// Scoped styled
import classes from "./style.module.scss";

// Props type
interface MainHeaderProps {
  onSearch: (searchText: string) => void;
}

export default function MainHeader({ onSearch }: MainHeaderProps) {
  const setPage = useSetRecoilState(A_Page);

  return (
    <header className={classes.mainHeader}>
      <RiMenu2Fill
        className="burger-icon"
        onClick={() =>
          setPage((prevState) => ({ ...prevState, userDrawerIsOpen: true }))
        }
      />
      <Input.Search
        className="search"
        placeholder="Атау б-ша іздеу"
        onSearch={onSearch}
      />
    </header>
  );
}
