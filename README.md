# JSON Schema Builder

A dynamic and user-friendly JSON Schema Builder built using **ReactJS** and **Ant Design**.  
This project lets users visually build JSON schemas by adding, editing, and removing fields with ease.

## Features

-  Drag and drop interface for building JSON schemas
-  Add, edit, and delete fields dynamically
-  Export the final schema as JSON
-  Built with modern UI using Ant Design
-  Easy to extend and integrate

-  ## Tech Stack
- ReactJS
- Ant Design (AntD)
- JavaScript (ES6)

## Project Structure

```
json-schema-builder/
├── public/
│   └── index.html               # HTML entry point
├── src/
│   ├── components/              # Reusable React components
│   │   ├── SchemaBuilder.tsx    # Main component for schema building
│   │   ├── FieldsList.tsx       # Displays available fields
│   │   ├── FieldItem.tsx        # Individual field item
│   │   └── JsonPreview.tsx      # Live JSON schema preview
│   ├── App.tsx                  # Root component
│   ├── App.css                  # Global styles
│   └── main.tsx                 # Application entry point
├── .eslintrc.js                 # ESLint configuration
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── package.json                 # Project metadata and scripts
└── README.md                    # Project documentation (this file)
```


## Demo
 [View Project](https://jsonschemabuilder-gamma.vercel.app/)


## Core Dependencies

- react  
- react-dom  
- react-hook-form  
- antd  
- @ant-design/icons  
- lucide-react  

## Dev Dependencies

- vite  
- typescript  
- @vitejs/plugin-react  
- tailwindcss  
- postcss  
- autoprefixer  
- eslint  
- @types/react  
- @types/react-dom  


## Installation

```bash
# Clone the repo
git clone https:https://github.com/alfiya009/jsonschemabuilder.git
cd jsonschemabuilder

# Install dependencies
npm install

# Start the development server
npm run dev




