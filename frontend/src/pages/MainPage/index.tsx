// Types
import type { I_Ticket } from "@/def_types/ticket";
import type { I_User } from "@/def_types/user";

// React
import { useState, useRef } from "react";
// Recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { A_User, A_Page } from "@/store";

// Hooks
import { useRequest, useMemoizedFn, useUpdateEffect } from "ahooks";
// API
import { API_GetAllTicket, API_CheckTicket } from "@/service/ticket-api";
// Utils
import { isObject, has } from "lodash";

// Antd component
import { Empty, App, Modal, Descriptions } from "antd";
// Custom component
import { QRScan, TicketCard } from "@/components/ticket";

// Scoped style
import classes from "./style.module.scss";

export default function MainPage() {
  const user = useRecoilValue(A_User);
  const [page, setPage] = useRecoilState(A_Page);
  const { message: AntdMessage } = App.useApp();

  return <main className={classes.mainPage}>Main Page</main>;
}
