"use client";

import { DndContext, type DragEndEvent, pointerWithin } from "@dnd-kit/core";
import DefaultButtonsCheckbox from "./_components/default-buttons-checkbox";
import Dialog from "./_components/dialog";
import { ModeToggle } from "./_components/theme-toggle";
import Toolbox from "./_components/toolbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./_components/ui/card";
import { Separator } from "./_components/ui/separator";
import DialogName from "./_components/settings/dialog-name";

export default function Home() {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !active) {
      return;
    }

    console.log(event.over);
  }
  return (
    <main className="min-h-screen">
      <div className="h-full w-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <ModeToggle />
          </div>
        </div>
        <Separator className="" />
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={pointerWithin}
        >
          <div className="flex w-full flex-row gap-2 p-2">
            <Card className="container h-full max-w-xs">
              <CardHeader>
                <CardTitle>Toolbox</CardTitle>
                <CardDescription>All the available bricks.</CardDescription>
              </CardHeader>
              <CardContent>
                <Toolbox />
              </CardContent>
            </Card>
            <Card className="container h-full flex-grow">
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
                <CardDescription>Build your dialog.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Dialog />
              </CardContent>
            </Card>
            <Card className="container h-full max-w-xs">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Change attributes.</CardDescription>{" "}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <DialogName />
                  <DefaultButtonsCheckbox />
                </div>
              </CardContent>
            </Card>
          </div>
        </DndContext>
      </div>
    </main>
  );
}
