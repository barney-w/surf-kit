import{o as t}from"./index-DS2v21UH.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./iframe-BsSRimq6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const d={title:"Agent/MCPServerStatus",component:t},e={args:{server:{name:"filesystem",version:"1.2.0",status:"connected",tools:[{name:"read_file",description:"Read a file from disk"},{name:"write_file",description:"Write content to a file"},{name:"list_directory",description:"List directory contents"}],resources:[{uri:"file:///src",name:"Source directory"},{uri:"file:///docs",name:"Documentation"}],lastPing:new Date}}},r={args:{server:{name:"database",version:"0.8.3",status:"disconnected",tools:[{name:"query",description:"Execute a SQL query"}],resources:[]}}},n={args:{server:{name:"web-scraper",status:"error",tools:[],resources:[]}}},s={args:{server:{name:"custom-server",status:"connected",tools:[{name:"process"}],resources:[{uri:"custom://data",name:"Data feed"}],lastPing:new Date}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    server: {
      name: 'filesystem',
      version: '1.2.0',
      status: 'connected',
      tools: [{
        name: 'read_file',
        description: 'Read a file from disk'
      }, {
        name: 'write_file',
        description: 'Write content to a file'
      }, {
        name: 'list_directory',
        description: 'List directory contents'
      }],
      resources: [{
        uri: 'file:///src',
        name: 'Source directory'
      }, {
        uri: 'file:///docs',
        name: 'Documentation'
      }],
      lastPing: new Date()
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    server: {
      name: 'database',
      version: '0.8.3',
      status: 'disconnected',
      tools: [{
        name: 'query',
        description: 'Execute a SQL query'
      }],
      resources: []
    }
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    server: {
      name: 'web-scraper',
      status: 'error',
      tools: [],
      resources: []
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    server: {
      name: 'custom-server',
      status: 'connected',
      tools: [{
        name: 'process'
      }],
      resources: [{
        uri: 'custom://data',
        name: 'Data feed'
      }],
      lastPing: new Date()
    }
  }
}`,...s.parameters?.docs?.source}}};const u=["Connected","Disconnected","Error","NoVersion"];export{e as Connected,r as Disconnected,n as Error,s as NoVersion,u as __namedExportsOrder,d as default};
