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
  constructor(public name: string) {
    this.name = name;
  }
}

export class Position {
  constructor(
    public x: number,
    public y: number,
  ) {
    this.x = x;
    this.y = y;
  }

  getLocationId(): string {
    return `${this.x}x${this.y}`;
  }
}

export class EnableElement extends Element {
  constructor(
    name: string,
    public enable: boolean,
  ) {
    super(name);

    this.enable = enable;
  }
}

export class TextBox extends Element {
  constructor(
    name: string,
    public position: Position,
    public enable: boolean,
  ) {
    super(name);
    this.position = position;
    this.enable = enable;
  }
}

export class Input extends Element {
  constructor(
    name: string,
    public position: Position,
    public width: number,
    public callbackArgument: string,
  ) {
    super(name);
    this.position = position;
    this.width = width;
    this.callbackArgument = callbackArgument;
  }
}
