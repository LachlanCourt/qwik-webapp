import { component$, useSignal, $ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Layout } from "~/components/layout/Layout";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { EditAccountData } from "~/models/Account";

const EditAccountPage = component$(({ data }: { data: EditAccountData }) => {

  const nameValue = useSignal(data.name)
  const handleInput = $((e: Event, target: HTMLInputElement) => {
    nameValue.value = target.value
  })

  return (
    <Layout>
      <Heading>Edit Account</Heading>
      <Form action={`/api/v1/accounts/${data.id}`} method="POST">
        <FormControl isVertical>
          <label for="account-name-field">Account Name</label>
          <i style={{ fontSize: '0.6rem' }}>This should match your twitch username</i>
          <Input name="name" id="account-name-field" value={nameValue.value} onInput$={handleInput} style={{ width: '100%' }} />
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            color: "darkslategray",
            fontWeight: "bold",
            gap: "0.6rem",
          }}
        >
          <Button link="../" variant={ButtonVariant.SECONDARY}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Layout>
  );
});

export default EditAccountPage;
