import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useDialogState } from "@/app/hooks/dialog-state";

export function DialogName() {
  const dialogState = useDialogState((state) => ({
    name: state.name,
    setName: state.setName,
  }));

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">Dialog Name</Label>
      <Input
        type="text"
        id="name"
        placeholder="Name"
        defaultValue={dialogState.name}
        onChange={(e) => {
          dialogState.setName(e.target.value);
        }}
      />
    </div>
  );
}

export default DialogName;
