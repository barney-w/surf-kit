import{j as t}from"./iframe-DfQrMS3t.js";import{M as n}from"./index-kVgamDB_.js";import"./preload-helper-C1FmrZbK.js";import"./index-_nN3MFVB.js";import"./index-ByQMLxTz.js";const j={title:"Agent/MessageBubble",component:n},A={id:"msg-1",role:"user",content:"How do I reset my password?",timestamp:new Date},o={id:"msg-2",role:"assistant",content:"You can reset your password by going to Settings > Security > Change Password. You will need to enter your current password and then choose a new one.",agent:"HelpBot",timestamp:new Date},s={args:{message:A}},e={args:{message:o}},a={args:{message:o,showAgent:!0}},r={render:()=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",maxWidth:600},children:[t.jsx(n,{message:A}),t.jsx(n,{message:o,showAgent:!0})]})};var m,g,i;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    message: userMessage
  }
}`,...(i=(g=s.parameters)==null?void 0:g.docs)==null?void 0:i.source}}};var c,p,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    message: assistantMessage
  }
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,l,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    message: assistantMessage,
    showAgent: true
  }
}`,...(h=(l=a.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var M,w,x;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: 600
  }}>
      <MessageBubble message={userMessage} />
      <MessageBubble message={assistantMessage} showAgent />
    </div>
}`,...(x=(w=r.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};const D=["User","Assistant","AssistantWithAgent","BothMessages"];export{e as Assistant,a as AssistantWithAgent,r as BothMessages,s as User,D as __namedExportsOrder,j as default};
