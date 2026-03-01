import{v as t}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const m={title:"Agent/SourceCard",component:t,argTypes:{variant:{control:"select",options:["compact","expanded"]}}},o={title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://internal.example.com/docs/ea-2024",confidence:.95,snippet:"All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement."},e={args:{source:o,variant:"compact"}},a={args:{source:o,variant:"expanded"}},r={args:{source:{...o,confidence:.3},variant:"expanded"}},n={args:{source:o,variant:"expanded",onNavigate:()=>{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    source,
    variant: 'compact'
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    source,
    variant: 'expanded'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    source: {
      ...source,
      confidence: 0.3
    },
    variant: 'expanded'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    source,
    variant: 'expanded',
    onNavigate: () => {}
  }
}`,...n.parameters?.docs?.source}}};const l=["Compact","Expanded","LowConfidence","Clickable"];export{n as Clickable,e as Compact,a as Expanded,r as LowConfidence,l as __namedExportsOrder,m as default};
