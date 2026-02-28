import{W as g}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const Q={title:"Agent/WelcomeScreen",component:g},e={args:{}},s={args:{title:"Research Assistant",message:"I can help you find and analyze information.",suggestedQuestions:["What are the latest trends?","Summarize this document","Compare these two topics"],onQuestionSelect:()=>{}}},t={args:{title:"Support Bot",message:"Need help? I am here for you.",suggestedQuestions:["Reset password","Billing question","Report a bug"],onQuestionSelect:()=>{}}};var o,r,a;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {}
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};var n,i,u;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    title: 'Research Assistant',
    message: 'I can help you find and analyze information.',
    suggestedQuestions: ['What are the latest trends?', 'Summarize this document', 'Compare these two topics'],
    onQuestionSelect: () => {}
  }
}`,...(u=(i=s.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var m,c,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'Support Bot',
    message: 'Need help? I am here for you.',
    suggestedQuestions: ['Reset password', 'Billing question', 'Report a bug'],
    onQuestionSelect: () => {}
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const W=["Default","WithSuggestions","Custom"];export{t as Custom,e as Default,s as WithSuggestions,W as __namedExportsOrder,Q as default};
