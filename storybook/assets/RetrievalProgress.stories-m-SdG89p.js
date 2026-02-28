import{p as l}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const S={title:"Agent/RetrievalProgress",component:l},d=[{title:"Enterprise Agreement 2024",section:"Section 12",document_id:"ea-2024-001",url:"https://example.com/ea-2024",confidence:.95,snippet:"Leave entitlements..."},{title:"HR Policy Manual",section:"Chapter 3",document_id:"hr-001",url:"https://example.com/hr",confidence:.82,snippet:"Work from home policy..."},{title:"Staff Handbook 2023",section:"Section 5",document_id:"sh-2023",url:"https://example.com/sh",confidence:.71,snippet:"Code of conduct..."}],e={args:{sources:d.slice(0,2),isActive:!0}},s={args:{sources:d,isActive:!1}},r={args:{sources:[],isActive:!0}};var t,o,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    sources: sources.slice(0, 2),
    isActive: true
  }
}`,...(c=(o=e.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var a,n,i;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    sources,
    isActive: false
  }
}`,...(i=(n=s.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var p,m,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    sources: [],
    isActive: true
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const x=["Active","Completed","Empty"];export{e as Active,s as Completed,r as Empty,x as __namedExportsOrder,S as default};
