import { z } from "zod";
import { useDialogState } from "../hooks/dialog-state";
import { TextBox } from "../models/element";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

const ElementSettings = () => {
  const dialogState = useDialogState((state) => ({
    selectedElement: state.selectedElement,
  }));

  const element = dialogState.selectedElement;

  if (!element) return <p>Select an Element.</p>;

  if (element instanceof TextBox) {
    return <TextBoxSettings element={element} />;
  }
};

export default ElementSettings;

type TextBoxSettingsProps = {
  element: TextBox;
};

const TextBoxSettings = ({ element }: TextBoxSettingsProps) => {
  const dialogState = useDialogState((state) => ({
    updateElement: state.updateElement,
    isNameUnique: state.isNameUnique,
    setSelectedElement: state.setSelectedElement,
    removeElement: state.removeElement,
  }));

  useEffect(() => {
    form.reset({ ...element });
    form.trigger();
  }, [element]);

  const form = useForm<z.infer<typeof TextBox.zodSchema>>({
    resolver: zodResolver(TextBox.zodSchema),
    defaultValues: { ...element },
  });

  function onSubmit(values: z.infer<typeof TextBox.zodSchema>) {
    if (!dialogState.isNameUnique(values.name, element.id)) {
      form.setError("name", {
        type: "manual",
        message: "Name must be unique.",
      });
      return;
    }

    const newElement = new TextBox(
      values.name,
      values.x,
      values.y,
      values.caption,
      values.enable ? true : false,
      element.id,
    );

    dialogState.updateElement(newElement);

    // Update the element accordingly to the values
    Object.assign(element, newElement);
  }

  const deleteElement = () => {
    dialogState.removeElement(element);
    dialogState.setSelectedElement(null);
  };

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is the unique name of the Element.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is what the Textbox is displaying in the dialog.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>X-Coordinate</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="y"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Y-Coordinate</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Enable</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="destructive">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Element</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this element?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="default">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => deleteElement()}
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
