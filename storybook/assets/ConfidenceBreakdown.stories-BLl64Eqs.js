import{i as E}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const w={title:"Agent/ConfidenceBreakdown",component:E},o={overall:"high",retrieval_quality:.92,source_authority:.85,answer_groundedness:.88,recency:.7,reasoning:"Answer is well-grounded in authoritative enterprise documentation."},e={args:{confidence:o}},r={args:{confidence:o,defaultExpanded:!0}},a={args:{confidence:{...o,overall:"medium",retrieval_quality:.6,source_authority:.55},defaultExpanded:!0}},n={args:{confidence:o,expandable:!1}};var s,t,d;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    confidence
  }
}`,...(d=(t=e.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var c,i,u;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    confidence,
    defaultExpanded: true
  }
}`,...(u=(i=r.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var p,l,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...confidence,
      overall: 'medium' as const,
      retrieval_quality: 0.6,
      source_authority: 0.55
    },
    defaultExpanded: true
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var f,g,x;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    confidence,
    expandable: false
  }
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const b=["Collapsed","Expanded","MediumConfidence","NotExpandable"];export{e as Collapsed,r as Expanded,a as MediumConfidence,n as NotExpandable,b as __namedExportsOrder,w as default};
