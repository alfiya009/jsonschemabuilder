import React from 'react';
import { ConfigProvider } from 'antd';
import SchemaBuilder from './components/SchemaBuilder';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <SchemaBuilder />
      </div>
    </ConfigProvider>
  );
}

export default App;
