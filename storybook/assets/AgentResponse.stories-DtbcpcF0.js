import{g as a}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const u={title:"Agent/AgentResponse",component:a},o={message:`Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests submitted at least **two weeks** in advance`,sources:[{title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://example.com/ea",confidence:.95,snippet:"All full-time employees are entitled to four weeks of paid annual leave."},{title:"HR Policy Manual",section:"Chapter 5 — Leave Management",document_id:"hr-policy-005",url:"https://example.com/hr",confidence:.88,snippet:"Leave requests should be submitted through the self-service portal."}],confidence:{overall:"high",retrieval_quality:.94,source_authority:.96,answer_groundedness:.91,recency:.88,reasoning:"High confidence due to direct match."},verification:{status:"passed",flags:[],claims_checked:3,claims_verified:3},ui_hint:"text",structured_data:null,follow_up_suggestions:["How do I apply for annual leave?","What happens to unused annual leave?","Can I cash out my annual leave?"]},e={args:{response:o}},t={args:{response:o,showConfidence:!0,showVerification:!0,onFollowUp:()=>{}}},s={args:{response:o,showSources:!1,onFollowUp:()=>{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    response
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    response,
    showConfidence: true,
    showVerification: true,
    onFollowUp: () => {}
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    response,
    showSources: false,
    onFollowUp: () => {}
  }
}`,...s.parameters?.docs?.source}}};const p=["Default","WithMetadata","WithoutSources"];export{e as Default,t as WithMetadata,s as WithoutSources,p as __namedExportsOrder,u as default};
