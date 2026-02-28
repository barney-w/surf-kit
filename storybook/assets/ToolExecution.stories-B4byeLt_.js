import{y}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const T={title:"Agent/ToolExecution",component:y},e={args:{tool:"search"}},o={args:{tool:"retrieve"}},r={args:{tool:"analyze",label:"Analyzing sentiment data..."}},a={args:{tool:"custom-plugin"}};var s,t,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    tool: 'search'
  }
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var c,m,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    tool: 'retrieve'
  }
}`,...(l=(m=o.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var i,p,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    tool: 'analyze',
    label: 'Analyzing sentiment data...'
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,g,S;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tool: 'custom-plugin'
  }
}`,...(S=(g=a.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const A=["Search","Retrieve","CustomLabel","UnknownTool"];export{r as CustomLabel,o as Retrieve,e as Search,a as UnknownTool,A as __namedExportsOrder,T as default};
