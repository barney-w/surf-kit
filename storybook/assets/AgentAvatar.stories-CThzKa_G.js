import{A as s}from"./index-ZUCRjiuV.js";import"./chunk-CFAYAL3Z-BzS4EhcG.js";import"./iframe-B-CFbV0Y.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DjiqqO5w.js";const d={title:"Agent/AgentAvatar",component:s,argTypes:{size:{control:"select",options:["sm","md","lg"]}}},t={id:"hr-agent",label:"HR Agent",accent:"#10b981"},o={id:"finance",label:"Finance Bot",accent:"#f59e0b"},e={args:{agent:t}},a={args:{agent:t,size:"sm"}},r={args:{agent:o,size:"lg"}},n={args:{agentId:"hr-agent",agentThemes:{"hr-agent":t},size:"md"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    agent: hrAgent
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    agent: hrAgent,
    size: 'sm'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    agent: financeAgent,
    size: 'lg'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    agentId: 'hr-agent',
    agentThemes: {
      'hr-agent': hrAgent
    },
    size: 'md'
  }
}`,...n.parameters?.docs?.source}}};const l=["Default","Small","Large","WithAgentId"];export{e as Default,r as Large,a as Small,n as WithAgentId,l as __namedExportsOrder,d as default};
