/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};

export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "welcomeMessage",
      type: "string",
      required: false,
      label: "Welcome Message",
    },
    {
      fieldName: "userName",
      type: "string",
      required: false,
      label: "Account Holder Name",
    },
    {
      fieldName: "currencySymbol",
      type: "string",
      required: false,
      label: "Currency Symbol",
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "App Tagline",
    },
    {
      fieldName: "showAnalytics",
      type: "boolean",
      required: false,
      label: "Show Analytics Tab",
    },
    {
      fieldName: "showCardManagement",
      type: "boolean",
      required: false,
      label: "Show Card Management Tab",
    },
    {
      fieldName: "quickActions",
      type: "array",
      label: "Quick Actions",
      item: {
        type: "object",
        fields: [
          { fieldName: "label", type: "string", required: true, label: "Label" },
          { fieldName: "icon", type: "string", required: true, label: "Icon (emoji or name)" },
        ],
      },
    },
    {
      fieldName: "navLabels",
      type: "object",
      required: false,
      label: "Navigation Labels",
      fields: [
        { fieldName: "home", type: "string", required: false, label: "Home Tab" },
        { fieldName: "cards", type: "string", required: false, label: "Cards Tab" },
        { fieldName: "transactions", type: "string", required: false, label: "Transactions Tab" },
        { fieldName: "analytics", type: "string", required: false, label: "Analytics Tab" },
      ],
    },
  ],
};
