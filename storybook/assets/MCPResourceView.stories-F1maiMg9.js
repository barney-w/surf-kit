import{n as a}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const d={title:"Agent/MCPResourceView",component:a},e={args:{resource:{uri:"file:///src/index.ts",name:"index.ts",mimeType:"text/typescript",content:`export const hello = "world"
export function add(a: number, b: number) {
  return a + b
}`}}},n={args:{resource:{uri:"file:///config.json",name:"config.json",mimeType:"application/json",content:JSON.stringify({name:"my-app",version:"1.0.0",dependencies:{}},null,2)}}},t={args:{resource:{uri:"file:///assets/logo.png",name:"logo.png",mimeType:"image/png",content:"https://via.placeholder.com/300x200?text=MCP+Resource"}}},r={args:{resource:{uri:"web://documentation",name:"API Documentation",mimeType:"text/plain",description:"Link to the public API docs",content:"https://docs.example.com/api/v2"}}},o={args:{resource:{uri:"file:///README.md",name:"README.md",mimeType:"text/markdown",description:"Project readme file with setup instructions",content:`# My Project

A sample project for testing.`}}},s={args:{resource:{uri:"file:///empty.txt",name:"empty.txt"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    resource: {
      uri: 'file:///src/index.ts',
      name: 'index.ts',
      mimeType: 'text/typescript',
      content: 'export const hello = "world"\\nexport function add(a: number, b: number) {\\n  return a + b\\n}'
    }
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    resource: {
      uri: 'file:///config.json',
      name: 'config.json',
      mimeType: 'application/json',
      content: JSON.stringify({
        name: 'my-app',
        version: '1.0.0',
        dependencies: {}
      }, null, 2)
    }
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    resource: {
      uri: 'file:///assets/logo.png',
      name: 'logo.png',
      mimeType: 'image/png',
      content: 'https://via.placeholder.com/300x200?text=MCP+Resource'
    }
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    resource: {
      uri: 'web://documentation',
      name: 'API Documentation',
      mimeType: 'text/plain',
      description: 'Link to the public API docs',
      content: 'https://docs.example.com/api/v2'
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    resource: {
      uri: 'file:///README.md',
      name: 'README.md',
      mimeType: 'text/markdown',
      description: 'Project readme file with setup instructions',
      content: '# My Project\\n\\nA sample project for testing.'
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    resource: {
      uri: 'file:///empty.txt',
      name: 'empty.txt'
    }
  }
}`,...s.parameters?.docs?.source}}};const l=["TextContent","JsonContent","ImageContent","UrlContent","WithDescription","NoContent"];export{t as ImageContent,n as JsonContent,s as NoContent,e as TextContent,r as UrlContent,o as WithDescription,l as __namedExportsOrder,d as default};
