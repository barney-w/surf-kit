import{g as m}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const _={title:"Agent/AgentResponse",component:m},o={message:`Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests submitted at least **two weeks** in advance`,sources:[{title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://example.com/ea",confidence:.95,snippet:"All full-time employees are entitled to four weeks of paid annual leave."},{title:"HR Policy Manual",section:"Chapter 5 — Leave Management",document_id:"hr-policy-005",url:"https://example.com/hr",confidence:.88,snippet:"Leave requests should be submitted through the self-service portal."}],confidence:{overall:"high",retrieval_quality:.94,source_authority:.96,answer_groundedness:.91,recency:.88,reasoning:"High confidence due to direct match."},verification:{status:"passed",flags:[],claims_checked:3,claims_verified:3},ui_hint:"text",structured_data:null,follow_up_suggestions:["How do I apply for annual leave?","What happens to unused annual leave?","Can I cash out my annual leave?"]},e={args:{response:o}},t={args:{response:o,showConfidence:!0,showVerification:!0,onFollowUp:()=>{}}},s={args:{response:o,showSources:!1,onFollowUp:()=>{}}};var a,r,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    response
  }
}`,...(n=(r=e.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var i,l,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    response,
    showConfidence: true,
    showVerification: true,
    onFollowUp: () => {}
  }
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var u,p,d;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    response,
    showSources: false,
    onFollowUp: () => {}
  }
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const y=["Default","WithMetadata","WithoutSources"];export{e as Default,t as WithMetadata,s as WithoutSources,y as __namedExportsOrder,_ as default};
