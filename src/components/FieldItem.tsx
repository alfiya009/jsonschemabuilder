import React from 'react';
import { Input, Select, Checkbox, Button} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useFormContext, useWatch, useFieldArray } from 'react-hook-form';
import { SchemaField } from '../types/schema';

const { Option } = Select;

interface FieldItemProps {
  index: number;
  onDelete: () => void;
  fieldPath: string;
  isNested?: boolean;
}

const FieldItem: React.FC<FieldItemProps> = ({ 
  onDelete, 
  fieldPath, 
}) => {
  const { control } = useFormContext();
  
  const type = useWatch({
    control,
    name: `${fieldPath}.type`
  });

  const { fields: nestedFields, append: appendNested, remove: removeNested } = useFieldArray({
    control,
    name: `${fieldPath}.nestedFields`
  });

  const addNestedField = () => {
    appendNested({
      name: '',
      type: 'string',
      required: false,
      nestedFields: []
    } as SchemaField);
  };

  return (
    <div className="field-item">
      <div className="field-controls">
        <Controller
          control={control}
          name={`${fieldPath}.name`}
          rules={{
            required: 'Field name is required',
            pattern: {
              value: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
              message: 'Field name must be valid (letters, numbers, underscore)'
            }
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Field name"
              className="field-name-input"
            />
          )}
        />

        <Controller
          control={control}
          name={`${fieldPath}.type`}
          render={({ field }) => (
            <Select {...field} style={{ width: 120 }}>
              <Option value="string">String</Option>
              <Option value="number">Number</Option>
              <Option value="nested">Nested</Option>
              <Option value="bool">Bool</Option>
              <Option value="floot">Floot</Option>
            </Select>
          )}
        />

        <Controller
          control={control}
          name={`${fieldPath}.required`}
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              {...field}
              checked={value}
              onChange={onChange}
            >
              Required
            </Checkbox>
          )}
        />

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          size="small"
        />
      </div>

      {type === 'nested' && (
        <div className="nested-fields">
          {nestedFields.map((nestedField, nestedIndex) => (
            <FieldItem
              key={nestedField.id}
              index={nestedIndex}
              onDelete={() => removeNested(nestedIndex)}
              fieldPath={`${fieldPath}.nestedFields.${nestedIndex}`}
              isNested={true}
            />
          ))}
          
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addNestedField}
            size="small"
            style={{ marginTop: 8 }}
          >
            Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldItem;