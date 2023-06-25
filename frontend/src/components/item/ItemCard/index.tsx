// Types
import type { I_Item } from "@/def_types/item";

// React
import { memo } from "react";
// Recoil
import { useSetRecoilState } from "recoil";
import { A_Page } from "@/store";

// Hooks
import { useCreation } from "ahooks";
// Utils
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Antd component
import { Button } from "antd";
// Icons
import { BsArrowBarLeft } from "react-icons/bs";

// Scoped styled
import classes from "./style.module.scss";

// Static resource
import { IMAGE_ImageNotFound } from "@/assets/image";

// Props type
interface ItemCardrops {
  item: I_Item;
}

// dayjs plugin
dayjs.extend(relativeTime);

export default memo(function ItemCard({ item }: ItemCardrops) {
  const setPage = useSetRecoilState(A_Page);

  const hasExpired = useCreation(
    () => dayjs(item.expirationDate).isBefore(dayjs()),
    [item.expirationDate]
  );

  const deadlineInfo = useCreation(() => {
    let getTimeWithoutOthers = dayjs(item.expirationDate).toNow(true);
    getTimeWithoutOthers.split(" ").slice(0, 2).join(" ");

    let result = `Мерзімі ${getTimeWithoutOthers}`;

    if (hasExpired) {
      return `${result} өтті`;
    }

    return `${result} қалды`;
  }, [hasExpired]);

  return (
    <div className={classes.itemCard}>
      <div className="image-block">
        {item.image && <img src={item.image} alt={item.name} />}
        {!item.image && <img src={IMAGE_ImageNotFound} alt={item.name} />}
      </div>

      <div className="info-block">
        <span className="name">{item.name}</span>
        <span className="price">Сату баға: {item.sellingPrice} ₸</span>
        <span className="expiration-date">{deadlineInfo}</span>
      </div>

      {/* <div className="action-block">
        <BsArrowBarLeft />
      </div> */}
    </div>
  );
});
