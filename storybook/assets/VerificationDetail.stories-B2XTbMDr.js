import{N as i}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const o={title:"Agent/VerificationDetail",component:i},e={args:{verification:{status:"passed",flags:[],claims_checked:8,claims_verified:8}}},a={args:{verification:{status:"flagged",flags:["Claim about 5 weeks leave could not be verified","Source date is older than 12 months"],claims_checked:8,claims_verified:6},defaultExpanded:!0}},s={args:{verification:{status:"failed",flags:["Primary claim contradicted by policy update"],claims_checked:3,claims_verified:0},defaultExpanded:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'passed',
      flags: [],
      claims_checked: 8,
      claims_verified: 8
    }
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'flagged',
      flags: ['Claim about 5 weeks leave could not be verified', 'Source date is older than 12 months'],
      claims_checked: 8,
      claims_verified: 6
    },
    defaultExpanded: true
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'failed',
      flags: ['Primary claim contradicted by policy update'],
      claims_checked: 3,
      claims_verified: 0
    },
    defaultExpanded: true
  }
}`,...s.parameters?.docs?.source}}};const l=["PassedCollapsed","FlaggedExpanded","FailedExpanded"];export{s as FailedExpanded,a as FlaggedExpanded,e as PassedCollapsed,l as __namedExportsOrder,o as default};
