import{W as o}from"./index-DTp7YQrt.js";import"./chunk-7CNF5HXR-Ca9xbwGh.js";import"./iframe-Byvm8tbi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BBON1_s-.js";const m={title:"Agent/WelcomeScreen",component:o},e={args:{}},s={args:{title:"Research Assistant",message:"I can help you find and analyze information.",suggestedQuestions:["What are the latest trends?","Summarize this document","Compare these two topics"],onQuestionSelect:()=>{}}},t={args:{title:"Support Bot",message:"Need help? I am here for you.",suggestedQuestions:["Reset password","Billing question","Report a bug"],onQuestionSelect:()=>{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Research Assistant',
    message: 'I can help you find and analyze information.',
    suggestedQuestions: ['What are the latest trends?', 'Summarize this document', 'Compare these two topics'],
    onQuestionSelect: () => {}
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Support Bot',
    message: 'Need help? I am here for you.',
    suggestedQuestions: ['Reset password', 'Billing question', 'Report a bug'],
    onQuestionSelect: () => {}
  }
}`,...t.parameters?.docs?.source}}};const c=["Default","WithSuggestions","Custom"];export{t as Custom,e as Default,s as WithSuggestions,c as __namedExportsOrder,m as default};
