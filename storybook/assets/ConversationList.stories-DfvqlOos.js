import{j as r}from"./iframe-DfQrMS3t.js";import{k as h}from"./index-kVgamDB_.js";import"./preload-helper-C1FmrZbK.js";import"./index-_nN3MFVB.js";import"./index-ByQMLxTz.js";const f={title:"Agent/ConversationList",component:h,decorators:[e=>r.jsx("div",{style:{height:500,width:300,border:"1px solid #e5e7eb",borderRadius:8},children:r.jsx(e,{})})]},a=[{id:"1",title:"Leave policy question",lastMessage:"How many days of PTO do I have?",updatedAt:new Date("2025-06-15"),messageCount:4},{id:"2",title:"Password reset help",lastMessage:"I need to reset my VPN password",updatedAt:new Date("2025-06-14"),messageCount:6},{id:"3",title:"Meeting notes summary",lastMessage:"Can you summarize the Q3 board meeting?",updatedAt:new Date("2025-06-13"),messageCount:2}],o={args:{conversations:a,onSelect:e=>console.log("Selected:",e)}},s={args:{conversations:a,activeId:"2",onSelect:e=>console.log("Selected:",e)}},t={args:{conversations:a,activeId:"1",onSelect:e=>console.log("Selected:",e),onDelete:e=>console.log("Deleted:",e),onNew:()=>console.log("New conversation")}},n={args:{conversations:[],onSelect:e=>console.log("Selected:",e),onNew:()=>console.log("New conversation")}};var c,i,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    conversations: sampleConversations,
    onSelect: id => console.log('Selected:', id)
  }
}`,...(l=(i=o.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,m,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    conversations: sampleConversations,
    activeId: '2',
    onSelect: id => console.log('Selected:', id)
  }
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,v,u;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    conversations: sampleConversations,
    activeId: '1',
    onSelect: id => console.log('Selected:', id),
    onDelete: id => console.log('Deleted:', id),
    onNew: () => console.log('New conversation')
  }
}`,...(u=(v=t.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var S,w,C;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    conversations: [],
    onSelect: id => console.log('Selected:', id),
    onNew: () => console.log('New conversation')
  }
}`,...(C=(w=n.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};const I=["Default","WithActiveConversation","WithDeleteAndNew","Empty"];export{o as Default,n as Empty,s as WithActiveConversation,t as WithDeleteAndNew,I as __namedExportsOrder,f as default};
