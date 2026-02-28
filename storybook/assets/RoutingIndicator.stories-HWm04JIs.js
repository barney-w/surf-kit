import{q as g}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const h={title:"Agent/RoutingIndicator",component:g},r={args:{from:"coordinator",to:"hr_agent"}},o={args:{from:"coordinator",to:"hr_agent",reason:"leave question detected"}},e={args:{from:"main_coordinator",to:"specialized_finance_reporting_agent",reason:"quarterly report request"}};var t,a,n;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    from: 'coordinator',
    to: 'hr_agent'
  }
}`,...(n=(a=r.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var s,c,i;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    from: 'coordinator',
    to: 'hr_agent',
    reason: 'leave question detected'
  }
}`,...(i=(c=o.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var m,d,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    from: 'main_coordinator',
    to: 'specialized_finance_reporting_agent',
    reason: 'quarterly report request'
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const R=["Default","WithReason","LongRoute"];export{r as Default,e as LongRoute,o as WithReason,R as __namedExportsOrder,h as default};
