import{C as n}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const m={title:"Agent/ConfidenceBadge",component:n},a={retrieval_quality:.9,source_authority:.8,answer_groundedness:.85,recency:.7,reasoning:"Sources are authoritative and recent."},e={args:{confidence:{...a,overall:"high"}}},r={args:{confidence:{...a,overall:"medium"}}},o={args:{confidence:{...a,overall:"low"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...base,
      overall: 'high'
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...base,
      overall: 'medium'
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...base,
      overall: 'low'
    }
  }
}`,...o.parameters?.docs?.source}}};const l=["High","Medium","Low"];export{e as High,o as Low,r as Medium,l as __namedExportsOrder,m as default};
