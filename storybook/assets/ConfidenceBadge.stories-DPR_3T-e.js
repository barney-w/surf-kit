import{C as u}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const _={title:"Agent/ConfidenceBadge",component:u},a={retrieval_quality:.9,source_authority:.8,answer_groundedness:.85,recency:.7,reasoning:"Sources are authoritative and recent."},e={args:{confidence:{...a,overall:"high"}}},r={args:{confidence:{...a,overall:"medium"}}},o={args:{confidence:{...a,overall:"low"}}};var n,s,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...base,
      overall: 'high'
    }
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var t,i,d;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...base,
      overall: 'medium'
    }
  }
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,l,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    confidence: {
      ...base,
      overall: 'low'
    }
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const b=["High","Medium","Low"];export{e as High,o as Low,r as Medium,b as __namedExportsOrder,_ as default};
