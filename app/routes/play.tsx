import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation, useRouteError } from "@remix-run/react";
import { createGrid } from "~/models/grids.server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const name = form.get("name") as string;

  if (!name) {
    throw new Error("Invalid name");
  }

  const grid = await createGrid(name);

  return redirect(`/grid/${grid.id}?new`);
};

export default function NewGridRoute() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  if (navigation.formData) {
    const name = navigation.formData.get("name") as string;

    return (
      <div>
        Generating a grid for <span className="font-bold">{name}</span>...
      </div>
    );
  }

  return (
    <div>
      <Form method="post">
        <div className="my-8">
          <label htmlFor="name" className="text-lg font-semibold my-4">
            Your name:
          </label>
          <Input
            defaultValue={actionData?.fields?.name}
            name="name"
            type="text"
            aria-invalid={Boolean(actionData?.fieldErrors?.name)}
            aria-errormessage={actionData?.fieldErrors?.name ? "name-error" : undefined}
          />
          {actionData?.fieldErrors?.name ? (
            <p className="form-validation-error" id="name-error" role="alert">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="my-8">
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <Button type="submit" className="mt-6 w-full bg-accent">
            🚀 Let's go!
          </Button>
        </div>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-container">
      <p>{"An error occurred."}</p>
    </div>
  );
}
