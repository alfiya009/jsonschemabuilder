import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { SchemaField } from '../types/schema';
import FieldItem from './FieldItem';

const { Title } = Typography;

const FieldsList: React.FC = () => {
  const { control } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  });

  const addField = () => {
    append({
      name: '',
      type: 'string',
      required: false,
      nestedFields: []
    } as SchemaField);
  };

  return (
    <div>
      <div className="panel-header">
        <Title level={4} className="panel-title">Schema Fields</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={addField}
        >
          Add Field
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="empty-state">
          <PlusOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
          <p>No fields added yet</p>
          <p style={{ fontSize: 12, color: '#999' }}>
            Click "Add Field" to start building your schema
          </p>
          <Button 
            type="dashed" 
            icon={<PlusOutlined />} 
            onClick={addField}
            style={{ marginTop: 16 }}
          >
            Add Your First Field
          </Button>
        </div>
      ) : (
        <div>
          {fields.map((field, index) => (
            <FieldItem
              key={field.id}
              index={index}
              onDelete={() => remove(index)}
              fieldPath={`fields.${index}`}
            />
          ))}
          
          <Button 
            type="dashed" 
            icon={<PlusOutlined />} 
            onClick={addField}
            className="add-field-button"
          >
            Add Another Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldsList;