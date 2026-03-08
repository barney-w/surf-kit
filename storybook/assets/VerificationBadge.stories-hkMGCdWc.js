import{V as r}from"./index-DD3Tavw2.js";import"./chunk-3ACPMC24-sN6mVosg.js";import"./iframe-Cwa6OL94.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B9YAxe-O.js";const d={title:"Agent/VerificationBadge",component:r},e={args:{verification:{status:"passed",flags:[],claims_checked:5,claims_verified:5}}},a={args:{verification:{status:"flagged",flags:["Outdated source"],claims_checked:5,claims_verified:3}}},s={args:{verification:{status:"failed",flags:["Could not verify claim"],claims_checked:5,claims_verified:1}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'passed',
      flags: [],
      claims_checked: 5,
      claims_verified: 5
    }
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'flagged',
      flags: ['Outdated source'],
      claims_checked: 5,
      claims_verified: 3
    }
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'failed',
      flags: ['Could not verify claim'],
      claims_checked: 5,
      claims_verified: 1
    }
  }
}`,...s.parameters?.docs?.source}}};const l=["Passed","Flagged","Failed"];export{s as Failed,a as Flagged,e as Passed,l as __namedExportsOrder,d as default};
