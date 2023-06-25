// Types
import { I_Item_Create } from "@/def_types/item";

// Router
import { useHistory } from "react-router-dom";

// Hooks
import { useMemoizedFn, useRequest } from "ahooks";
// API
import { API_CreateItem } from "@/service/item-api";
// Utils
import dayjs from "dayjs";

// Antd component
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  Button,
  App,
} from "antd";
// Icons
import { BiImageAdd } from "react-icons/bi";
// Custom component
import { Appbar } from "@/components/common";

// Scoped style
import classes from "./style.module.scss";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ItemPage() {
  const history = useHistory();
  const { message: AntdMessage } = App.useApp();
  const [addItemForm] = Form.useForm();

  const { loading: createItemLoading, run: createItem } = useRequest(
    API_CreateItem,
    {
      manual: true,
      onSuccess() {
        addItemForm.resetFields();
        AntdMessage.success("Сәтті құрылды");
        history.push("/main");
      },
    }
  );

  const handleForm = useMemoizedFn((values: I_Item_Create) => {
    values = {
      ...values,
      // @ts-ignore (这里的时间类型是dayjs的)
      expirationDate: values.expirationDate.format("YYYY-MM-DD hh:mm:ss"),
      // @ts-ignore (这里的时间类型是dayjs的)
      productionDate: values?.productionDate?.format?.("YYYY-MM-DD hh:mm:ss"),
    };

    createItem(values);
  });

  return (
    <main className={classes.itemPage}>
      <Appbar title="Зат қосу" />

      <Form
        scrollToFirstError
        form={addItemForm}
        className="form"
        validateTrigger="onBlur"
        autoComplete="off"
        onFinish={handleForm}
      >
        <Form.Item
          label="Атау"
          name="name"
          rules={[
            { required: true, message: "Зат атауы міндетті" },
            {
              max: 30,
              message: "30 таңбадан аспауы керек",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="row">
          <Form.Item label="Өндірілген күн" name="productionDate">
            <DatePicker
              inputReadOnly
              allowClear={false}
              format="YYYY-MM-DD"
              disabledDate={(current) => current > dayjs().endOf("day")}
            />
          </Form.Item>

          <Form.Item
            label="Мерзімнен өту күн"
            name="expirationDate"
            rules={[{ required: true, message: "Міндетті өріс" }]}
          >
            <DatePicker
              inputReadOnly
              allowClear={false}
              format="YYYY-MM-DD"
              disabledDate={(current) => current < dayjs().endOf("day")}
            />
          </Form.Item>
        </div>

        <div className="row">
          <Form.Item label="Алған баға" name="purchasePrice">
            <InputNumber controls min={0} />
          </Form.Item>

          <Form.Item
            label="Сату баға"
            name="sellingPrice"
            rules={[{ required: true, message: "Міндетті өріс" }]}
          >
            <InputNumber controls min={0} />
          </Form.Item>

          <Form.Item label="Саны" name="quantity">
            <InputNumber controls min={1} />
          </Form.Item>
        </div>

        <Form.Item
          label="Жеткізуші ақпараты"
          name="supplier"
          rules={[
            {
              max: 60,
              message: "60 таңбадан аспауы керек",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Сөренің орны"
          name="shelfPosition"
          rules={[
            {
              max: 60,
              message: "60 таңбадан аспауы керек",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Қысқа сипаттама"
          name="description"
          rules={[
            {
              max: 254,
              message: "254 таңбадан аспауы керек",
            },
          ]}
        >
          <TextArea showCount maxLength={254} />
        </Form.Item>

        <Form.Item label="Сурет" name="image" getValueFromEvent={normFile}>
          <Upload
            name="image"
            // action={API_UploadImageUrl}
            maxCount={1}
            listType="picture-card"
            beforeUpload={() => false}
          >
            <BiImageAdd />
            <span>Жүктеу</span>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Сақтау
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
