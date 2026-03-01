import{y as n}from"./index-DS2v21UH.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./iframe-BsSRimq6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const u={title:"Agent/SourceList",component:n,argTypes:{variant:{control:"select",options:["compact","expanded"]}}},e=[{title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://example.com/ea",confidence:.95,snippet:"All full-time employees are entitled to four weeks of paid annual leave."},{title:"HR Policy Manual",section:"Chapter 5 — Leave Management",document_id:"hr-policy-005",url:"https://example.com/hr",confidence:.88,snippet:"Leave requests should be submitted at least two weeks in advance."},{title:"Leave FAQ",section:"Annual Leave",document_id:"faq-leave-001",url:"https://example.com/faq",confidence:.79,snippet:"Annual leave accrues progressively during each year of service."}],a={args:{sources:e}},r={args:{sources:e,variant:"expanded"}},s={args:{sources:e,collapsible:!0,defaultExpanded:!0}},t={args:{sources:e,collapsible:!0,defaultExpanded:!1}},o={args:{sources:e,onNavigate:()=>{}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    sources
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    sources,
    variant: 'expanded'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    sources,
    collapsible: true,
    defaultExpanded: true
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    sources,
    collapsible: true,
    defaultExpanded: false
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    sources,
    onNavigate: () => {}
  }
}`,...o.parameters?.docs?.source}}};const m=["Default","Expanded","Collapsible","CollapsedByDefault","WithNavigation"];export{t as CollapsedByDefault,s as Collapsible,a as Default,r as Expanded,o as WithNavigation,m as __namedExportsOrder,u as default};
