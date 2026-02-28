import{V as f}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const h={title:"Agent/VerificationBadge",component:f},e={args:{verification:{status:"passed",flags:[],claims_checked:5,claims_verified:5}}},a={args:{verification:{status:"flagged",flags:["Outdated source"],claims_checked:5,claims_verified:3}}},s={args:{verification:{status:"failed",flags:["Could not verify claim"],claims_checked:5,claims_verified:1}}};var r,i,c;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'passed',
      flags: [],
      claims_checked: 5,
      claims_verified: 5
    }
  }
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var t,o,n;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'flagged',
      flags: ['Outdated source'],
      claims_checked: 5,
      claims_verified: 3
    }
  }
}`,...(n=(o=a.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var d,l,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'failed',
      flags: ['Could not verify claim'],
      claims_checked: 5,
      claims_verified: 1
    }
  }
}`,...(m=(l=s.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const k=["Passed","Flagged","Failed"];export{s as Failed,a as Flagged,e as Passed,k as __namedExportsOrder,h as default};
