import{u as y}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const D={title:"Agent/SourceList",component:y,argTypes:{variant:{control:"select",options:["compact","expanded"]}}},e=[{title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://example.com/ea",confidence:.95,snippet:"All full-time employees are entitled to four weeks of paid annual leave."},{title:"HR Policy Manual",section:"Chapter 5 — Leave Management",document_id:"hr-policy-005",url:"https://example.com/hr",confidence:.88,snippet:"Leave requests should be submitted at least two weeks in advance."},{title:"Leave FAQ",section:"Annual Leave",document_id:"faq-leave-001",url:"https://example.com/faq",confidence:.79,snippet:"Annual leave accrues progressively during each year of service."}],a={args:{sources:e}},r={args:{sources:e,variant:"expanded"}},s={args:{sources:e,collapsible:!0,defaultExpanded:!0}},t={args:{sources:e,collapsible:!0,defaultExpanded:!1}},o={args:{sources:e,onNavigate:()=>{}}};var n,c,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    sources
  }
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,i,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    sources,
    variant: 'expanded'
  }
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,m,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    sources,
    collapsible: true,
    defaultExpanded: true
  }
}`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var f,v,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    sources,
    collapsible: true,
    defaultExpanded: false
  }
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var h,E,b;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    sources,
    onNavigate: () => {}
  }
}`,...(b=(E=o.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};const N=["Default","Expanded","Collapsible","CollapsedByDefault","WithNavigation"];export{t as CollapsedByDefault,s as Collapsible,a as Default,r as Expanded,o as WithNavigation,N as __namedExportsOrder,D as default};
