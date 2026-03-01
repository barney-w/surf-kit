import{t as o}from"./index-DS2v21UH.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./iframe-BsSRimq6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const m={title:"Agent/RetrievalProgress",component:o},r=[{title:"Enterprise Agreement 2024",section:"Section 12",document_id:"ea-2024-001",url:"https://example.com/ea-2024",confidence:.95,snippet:"Leave entitlements..."},{title:"HR Policy Manual",section:"Chapter 3",document_id:"hr-001",url:"https://example.com/hr",confidence:.82,snippet:"Work from home policy..."},{title:"Staff Handbook 2023",section:"Section 5",document_id:"sh-2023",url:"https://example.com/sh",confidence:.71,snippet:"Code of conduct..."}],e={args:{sources:r.slice(0,2),isActive:!0}},s={args:{sources:r,isActive:!1}},t={args:{sources:[],isActive:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    sources: sources.slice(0, 2),
    isActive: true
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    sources,
    isActive: false
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    sources: [],
    isActive: true
  }
}`,...t.parameters?.docs?.source}}};const u=["Active","Completed","Empty"];export{e as Active,s as Completed,t as Empty,u as __namedExportsOrder,m as default};
