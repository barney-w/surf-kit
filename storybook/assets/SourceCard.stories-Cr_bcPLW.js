import{r as f}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const w={title:"Agent/SourceCard",component:f,argTypes:{variant:{control:"select",options:["compact","expanded"]}}},o={title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://internal.example.com/docs/ea-2024",confidence:.95,snippet:"All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement."},e={args:{source:o,variant:"compact"}},a={args:{source:o,variant:"expanded"}},r={args:{source:{...o,confidence:.3},variant:"expanded"}},n={args:{source:o,variant:"expanded",onNavigate:()=>{}}};var t,s,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    source,
    variant: 'compact'
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var p,i,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    source,
    variant: 'expanded'
  }
}`,...(d=(i=a.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,l,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    source: {
      ...source,
      confidence: 0.3
    },
    variant: 'expanded'
  }
}`,...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var g,v,x;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    source,
    variant: 'expanded',
    onNavigate: () => {}
  }
}`,...(x=(v=n.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const A=["Compact","Expanded","LowConfidence","Clickable"];export{n as Clickable,e as Compact,a as Expanded,r as LowConfidence,A as __namedExportsOrder,w as default};
