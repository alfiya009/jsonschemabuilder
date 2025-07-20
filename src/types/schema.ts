export interface SchemaField {
  id?: string;
  name: string;
  type: 'string' | 'number' | 'nested';
  required: boolean;
  defaultValue?: string | number;
  nestedFields?: SchemaField[];
}

export interface FormData {
  fields: SchemaField[];
}

export interface JsonSchema {
  [key: string]: string | number | JsonSchema;
}