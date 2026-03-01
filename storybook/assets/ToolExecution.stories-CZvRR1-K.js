import{J as s}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const i={title:"Agent/ToolExecution",component:s},e={args:{tool:"search"}},o={args:{tool:"retrieve"}},r={args:{tool:"analyze",label:"Analyzing sentiment data..."}},a={args:{tool:"custom-plugin"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
