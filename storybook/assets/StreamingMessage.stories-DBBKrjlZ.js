import{B as o}from"./index-DS2v21UH.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./iframe-BsSRimq6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const h={title:"Agent/StreamingMessage",component:o},i={active:!0,phase:"thinking",content:"",sources:[],agent:null,agentLabel:null},n={active:!0,phase:"generating",content:"Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service.",sources:[],agent:null,agentLabel:null},m={active:!0,phase:"verifying",content:"Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement based on their ordinary hours.",sources:[],agent:null,agentLabel:null},c={active:!1,phase:"idle",content:"Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement based on their ordinary hours.",sources:[],agent:null,agentLabel:null},e={args:{stream:i,showPhases:!0}},r={args:{stream:n,showPhases:!0}},a={args:{stream:m,showPhases:!0}},s={args:{stream:c,showPhases:!0}},t={args:{stream:n,showPhases:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    stream: thinkingStream,
    showPhases: true
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    stream: generatingStream,
    showPhases: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    stream: verifyingStream,
    showPhases: true
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    stream: completedStream,
    showPhases: true
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    stream: generatingStream,
    showPhases: false
  }
}`,...t.parameters?.docs?.source}}};const f=["Thinking","Generating","Verifying","Completed","NoPhasesIndicator"];export{s as Completed,r as Generating,t as NoPhasesIndicator,e as Thinking,a as Verifying,f as __namedExportsOrder,h as default};
