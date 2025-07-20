import React from 'react';
import { Typography } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { FormData } from '../types/schema';
import FieldsList from './FieldsList';
import JsonPreview from './JsonPreview';

const { Title } = Typography;

const SchemaBuilder: React.FC = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      fields: []
    }
  });

  const formData = methods.watch();

  return (
    <div className="schema-builder-container">
      <div className="schema-builder-header">
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          JSON Schema Builder
        </Title>
        <p style={{ color: '#666', marginTop: 8 }}>
          Create dynamic JSON schemas with nested field support
        </p>
      </div>

      <FormProvider {...methods}>
        <div className="schema-builder-content">
          <div className="schema-fields-panel">
            <FieldsList />
          </div>
          <div className="json-preview-panel">
            <JsonPreview fields={formData.fields} />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default SchemaBuilder;