import { OptionsType } from "~/components/controlledTextarea/Popup";

export const interpolationOptions: Array<OptionsType> = [
  {
    name: "Current Uptime of Stream",
    value: "{{context:uptime}}",
    buttonLabel: "Uptime",
    hasVariables: false,
  },
  {
    name: "Author of Message",
    value: "{{context:author}}",
    buttonLabel: "Author",
    hasVariables: false,
  },
  {
    name: "Channel Name",
    value: "{{context:channelName}}",
    buttonLabel: "Channel Name",
    hasVariables: false,
  },
  {
    name: "Message Content",
    value: "{{context:text}}",
    buttonLabel: "Message",
    hasVariables: false,
  },
  {
    name: "Time since user followed",
    value: "{{context:followage}}",
    buttonLabel: "Followage",
    hasVariables: false,
  },
  {
    name: "Mention a User",
    value: "{{context:mention:A}}",
    pattern: "{{context:mention:A}}",
    buttonLabel: "User",
    hasVariables: true,
    variableSchema: [{ name: "Username", value: "A", defaultValue: "" }],
  },
  {
    name: "Pick a random number",
    value: "{{util:random:A:B}}",
    pattern: "{{util:random:A:B}}",
    buttonLabel: "Random",
    hasVariables: true,
    variableSchema: [
      { name: "Min", value: "A", defaultValue: "0" },
      { name: "Max", value: "B", defaultValue: "100" },
    ],
  },
];
