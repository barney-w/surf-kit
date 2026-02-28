import{z as p}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const h={title:"Agent/VerificationDetail",component:p},e={args:{verification:{status:"passed",flags:[],claims_checked:8,claims_verified:8}}},a={args:{verification:{status:"flagged",flags:["Claim about 5 weeks leave could not be verified","Source date is older than 12 months"],claims_checked:8,claims_verified:6},defaultExpanded:!0}},s={args:{verification:{status:"failed",flags:["Primary claim contradicted by policy update"],claims_checked:3,claims_verified:0},defaultExpanded:!0}};var i,r,t;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'passed',
      flags: [],
      claims_checked: 8,
      claims_verified: 8
    }
  }
}`,...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var d,c,n;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'flagged',
      flags: ['Claim about 5 weeks leave could not be verified', 'Source date is older than 12 months'],
      claims_checked: 8,
      claims_verified: 6
    },
    defaultExpanded: true
  }
}`,...(n=(c=a.parameters)==null?void 0:c.docs)==null?void 0:n.source}}};var o,l,m;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    verification: {
      status: 'failed',
      flags: ['Primary claim contradicted by policy update'],
      claims_checked: 3,
      claims_verified: 0
    },
    defaultExpanded: true
  }
}`,...(m=(l=s.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const x=["PassedCollapsed","FlaggedExpanded","FailedExpanded"];export{s as FailedExpanded,a as FlaggedExpanded,e as PassedCollapsed,x as __namedExportsOrder,h as default};
