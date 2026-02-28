import{v as w}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const G={title:"Agent/StreamingMessage",component:w},k={active:!0,phase:"thinking",content:"",sources:[],agent:null,agentLabel:null},P={active:!0,phase:"generating",content:"Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service.",sources:[],agent:null,agentLabel:null},b={active:!0,phase:"verifying",content:"Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement based on their ordinary hours.",sources:[],agent:null,agentLabel:null},A={active:!1,phase:"idle",content:"Based on the Enterprise Agreement 2024, all full-time employees are entitled to four weeks of paid annual leave per year of service. Part-time employees receive a pro-rata entitlement based on their ordinary hours.",sources:[],agent:null,agentLabel:null},e={args:{stream:k,showPhases:!0}},r={args:{stream:P,showPhases:!0}},a={args:{stream:b,showPhases:!0}},s={args:{stream:A,showPhases:!0}},t={args:{stream:P,showPhases:!1}};var n,o,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    stream: thinkingStream,
    showPhases: true
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var m,c,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    stream: generatingStream,
    showPhases: true
  }
}`,...(l=(c=r.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,g,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    stream: verifyingStream,
    showPhases: true
  }
}`,...(u=(g=a.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var d,h,f;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    stream: completedStream,
    showPhases: true
  }
}`,...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,S,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    stream: generatingStream,
    showPhases: false
  }
}`,...(y=(S=t.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};const I=["Thinking","Generating","Verifying","Completed","NoPhasesIndicator"];export{s as Completed,r as Generating,t as NoPhasesIndicator,e as Thinking,a as Verifying,I as __namedExportsOrder,G as default};
