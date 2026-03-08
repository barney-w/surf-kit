import{J as s}from"./index-DD3Tavw2.js";import"./chunk-3ACPMC24-sN6mVosg.js";import"./iframe-Cwa6OL94.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B9YAxe-O.js";const i={title:"Agent/ToolExecution",component:s},e={args:{tool:"search"}},o={args:{tool:"retrieve"}},r={args:{tool:"analyze",label:"Analyzing sentiment data..."}},a={args:{tool:"custom-plugin"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    tool: 'search'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tool: 'retrieve'
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tool: 'analyze',
    label: 'Analyzing sentiment data...'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tool: 'custom-plugin'
  }
}`,...a.parameters?.docs?.source}}};const p=["Search","Retrieve","CustomLabel","UnknownTool"];export{r as CustomLabel,o as Retrieve,e as Search,a as UnknownTool,p as __namedExportsOrder,i as default};
