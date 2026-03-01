import{j as t}from"./iframe-BsSRimq6.js";import{q as n}from"./index-DS2v21UH.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./index-asa8OAme.js";const u={title:"Agent/MessageBubble",component:n},m={id:"msg-1",role:"user",content:"How do I reset my password?",timestamp:new Date},o={id:"msg-2",role:"assistant",content:"You can reset your password by going to Settings > Security > Change Password. You will need to enter your current password and then choose a new one.",agent:"HelpBot",timestamp:new Date},s={args:{message:m}},e={args:{message:o}},a={args:{message:o,showAgent:!0}},r={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",maxWidth:600},children:[t.jsx(n,{message:m}),t.jsx(n,{message:o,showAgent:!0})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    message: userMessage
  }
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    message: assistantMessage
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    message: assistantMessage,
    showAgent: true
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: 600
  }}>
      <MessageBubble message={userMessage} />
      <MessageBubble message={assistantMessage} showAgent />
    </div>
}`,...r.parameters?.docs?.source}}};const l=["User","Assistant","AssistantWithAgent","BothMessages"];export{e as Assistant,a as AssistantWithAgent,r as BothMessages,s as User,l as __namedExportsOrder,u as default};
