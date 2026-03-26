import{u as t}from"./index-Bl96pt0C.js";import"./chunk-CFAYAL3Z-BsRUZPHP.js";import"./iframe-qkd0DpiO.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C2uo-3gH.js";const m={title:"Agent/RoutingIndicator",component:t},r={args:{from:"coordinator",to:"hr_agent"}},o={args:{from:"coordinator",to:"hr_agent",reason:"leave question detected"}},e={args:{from:"main_coordinator",to:"specialized_finance_reporting_agent",reason:"quarterly report request"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    from: 'coordinator',
    to: 'hr_agent'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    from: 'coordinator',
    to: 'hr_agent',
    reason: 'leave question detected'
  }
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    from: 'main_coordinator',
    to: 'specialized_finance_reporting_agent',
    reason: 'quarterly report request'
  }
}`,...e.parameters?.docs?.source}}};const d=["Default","WithReason","LongRoute"];export{r as Default,e as LongRoute,o as WithReason,d as __namedExportsOrder,m as default};
