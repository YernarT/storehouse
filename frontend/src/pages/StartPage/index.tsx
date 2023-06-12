// Type
import type { API_LoginData } from "@/service/user-api";

// Router
import { useHistory } from "react-router-dom";
// Recoil
import { useSetRecoilState } from "recoil";
import { A_User } from "@/store";

// Hooks
import { useCreation, useRequest } from "ahooks";
// API
import { API_Login } from "@/service/user-api";
// Utils
import { localStorage } from "@/utils";

// Antd component
import { Button, Form, Input, App } from "antd";

// Scoped style
import classes from "./style.module.scss";

export default function StartPage() {
  const { message: AntdMessage } = App.useApp();
  const history = useHistory();
  const setUser = useSetRecoilState(A_User);

  // Login API
  const { runAsync, loading } = useRequest(API_Login, { manual: true });
  // Login logic
  const onFinish = async (values: API_LoginData) => {
    const res = await runAsync({ ...values }).catch((error) => {
      AntdMessage.error(error.message);
    });

    if (res) {
      AntdMessage.success("Кіру сәтті");
      localStorage.set("user", res);
      setUser(res);
      history.push("/ticket");
    }
  };

  return (
    <main className={classes.startPage}>
      <div className="brand">
        <img className="logo" src="/favicon.png" alt="Logo" />
        <h3 className="title">Storehouse</h3>
      </div>

      <Form
        className="form"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Телефон нөмер"
          name="login"
          rules={[
            { required: true, message: "Міндетті өріс" },
            { min: 11, message: "Телефон нөмер 11 саннан құралу керек" },
            { max: 11, message: "Телефон нөмер 11 саннан құралу керек" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Құпия сөз"
          name="password"
          rules={[{ required: true, message: "Құпия сөз енгізіңіз" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            className="primary-btn"
            loading={loading}
          >
            Кіру
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
