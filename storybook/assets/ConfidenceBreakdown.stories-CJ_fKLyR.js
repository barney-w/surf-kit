import{i as s}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const p={title:"Agent/ConfidenceBreakdown",component:s},o={overall:"high",retrieval_quality:.92,source_authority:.85,answer_groundedness:.88,recency:.7,reasoning:"Answer is well-grounded in authoritative enterprise documentation."},e={args:{confidence:o}},r={args:{confidence:o,defaultExpanded:!0}},a={args:{confidence:{...o,overall:"medium",retrieval_quality:.6,source_authority:.55},defaultExpanded:!0}},n={args:{confidence:o,expandable:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    confidence
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    confidence,
    defaultExpanded: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...confidence,
      overall: 'medium' as const,
      retrieval_quality: 0.6,
      source_authority: 0.55
    },
    defaultExpanded: true
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    confidence,
    expandable: false
  }
}`,...n.parameters?.docs?.source}}};const l=["Collapsed","Expanded","MediumConfidence","NotExpandable"];export{e as Collapsed,r as Expanded,a as MediumConfidence,n as NotExpandable,l as __namedExportsOrder,p as default};
