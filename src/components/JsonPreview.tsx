import React from 'react';
import { Typography, Button, Space, message } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import { SchemaField, JsonSchema } from '../types/schema';

const { Title } = Typography;

interface JsonPreviewProps {
  fields: SchemaField[];
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ fields }) => {
  const generateSchema = (fields: SchemaField[]): JsonSchema => {
    if (!fields || fields.length === 0) {
      return {} as JsonSchema;
    }

    const schema: JsonSchema = {};

    fields.forEach(field => {
      if (field.name && field.name.trim() !== '') {
        if (field.type === 'string') {
          schema[field.name] = "String";
        } else if (field.type === 'number') {
          schema[field.name] = "Number";
        } else if (field.type === 'nested') {
          const nestedSchema = generateSchema(field.nestedFields || []);
          schema[field.name] = nestedSchema;
        }
      }
    });

    return schema;
  };

  const schema = generateSchema(fields);
  const jsonString = JSON.stringify(schema, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    message.success('JSON copied to clipboard!');
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('JSON schema downloaded!');
  };

  return (
    <div>
      <div className="panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#52c41a', 
            borderRadius: '50%' 
          }}></div>
          <Title level={4} className="panel-title" style={{ margin: 0 }}>JSON Preview</Title>
        </div>
        <Space>
          <Button 
            icon={<CopyOutlined />} 
            onClick={copyToClipboard}
            disabled={Object.keys(schema).length === 0}
          >
            Copy
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={downloadJson}
            disabled={Object.keys(schema).length === 0}
          >
            Download
          </Button>
        </Space>
      </div>

      <div className="json-preview">
        {jsonString}
      </div>

      {fields && fields.length > 0 && Object.keys(schema).length > 0 && (
        <div style={{ marginTop: 16, padding: 12, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6 }}>
          <small style={{ color: '#389e0d' }}>
            <strong>Schema Stats:</strong> {fields.length} fields • {Object.keys(schema).length} properties
          </small>
        </div>
      )}
    </div>
  );
};

export default JsonPreview;