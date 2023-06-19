import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Layout } from "~/components/layout/Layout";
import { Input } from "~/components/input/Input";
import { useForm } from "~/common/hooks/useForm/useForm";

const NewAPITokenPage = component$(() => {
  const initialValues = { discriminator: "", webhookUrl: "" };
  const { returnData, submitHandlers, Control, Form } = useForm<{
    username: string;
    password: string;
  }>(initialValues, "api/v1/admin/apitokens/new");

  return (
    <Layout>
      <Button link="/admin/apitokens">Back</Button>
      <Form isDisabled={!!returnData?.value?.username}>
        <Control name="discriminator" label="Discriminator: ">
          <Input />
        </Control>
        <Control name="webhookUrl" label={"Webhook URL:"}>
          <Input />
        </Control>
        <Button {...submitHandlers} disabled={!!returnData?.value?.username}>
          Generate
        </Button>
      </Form>
      <div>
        API Key: {returnData?.value?.username || "Click button to generate"}
      </div>
      <div>
        API Pass: {returnData?.value?.password || "Click button to generate"}
      </div>
    </Layout>
  );
});

export default NewAPITokenPage;
