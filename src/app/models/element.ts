import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

export const BlockTypes = {
  Textbox: "Textbox",
  Input: "Input",
  Image: "Image",
  Button: "Button",
  RadioButton: "RadioButton",
  Checkbox: "Checkbox",
  DropDownList: "DropDownList",
  ListBox: "ListBox",
  ListView: "ListView",
  TabControl: "TabControl",
  TabPage: "TabPage",
  GroupBox: "GroupBox",
  MenuItem: "MenuItem",
} as const;

export type BlockTypeKeys = (typeof BlockTypes)[keyof typeof BlockTypes];

export type BlockType = {
  x: number;
  y: number;
  type: BlockTypeKeys;
};

export class Element {
  constructor(
    public name: string,
    id?: string,
  ) {
    this.id = id || createId();
    this.name = name;
  }
  public id: string;
}

export type UIElement = PositionedElement | Element;

export class PositionedElement extends Element {
  constructor(
    name: string,
    public x: number,
    public y: number,
    id?: string,
  ) {
    super(name, id);

    this.x = x;
    this.y = y;
  }

  getLocationId(): string {
    return `${this.x}x${this.y}`;
  }
}

export class TextBox extends PositionedElement {
  constructor(
    name: string,
    x: number,
    y: number,
    public caption: string,
    public enable: boolean,
    id?: string,
  ) {
    super(name, x, y, id);

    this.caption = caption;
    this.enable = enable;
  }
  static zodSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is too short." })
      .max(50, { message: "Name is too long." })
      .refine(
        (val) => {
          return !val.includes(" ");
        },
        { message: "Cannot contain spaces." },
      ),
    caption: z.string().min(1).max(50),
    enable: z.boolean().default(true).optional(),
    x: z.coerce.number().min(0),
    y: z.coerce.number().min(0),
  });
}

export class Input extends PositionedElement {
  constructor(
    name: string,
    x: number,
    y: number,
    public width: number,
    public callbackArgument: string,
    public enable: boolean,
    public datatype: string,
    public password: boolean,
    id?: string,
  ) {
    super(name, x, y, id);

    this.width = width;
    this.callbackArgument = callbackArgument;
    this.enable = enable;
    this.datatype = datatype;
    this.password = password;
  }
}

export class Menu extends Element {
  constructor(
    name: string,
    id?: string,
    // public items: MenuItem[],
  ) {
    super(name, id);

    // this.items = items;
  }
}
