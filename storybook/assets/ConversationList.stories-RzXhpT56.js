import{j as r}from"./iframe-BsSRimq6.js";import{k as c}from"./index-DS2v21UH.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./index-asa8OAme.js";const g={title:"Agent/ConversationList",component:c,decorators:[e=>r.jsx("div",{style:{height:500,width:300,border:"1px solid #e5e7eb",borderRadius:8},children:r.jsx(e,{})})]},a=[{id:"1",title:"Leave policy question",lastMessage:"How many days of PTO do I have?",updatedAt:new Date("2025-06-15"),messageCount:4},{id:"2",title:"Password reset help",lastMessage:"I need to reset my VPN password",updatedAt:new Date("2025-06-14"),messageCount:6},{id:"3",title:"Meeting notes summary",lastMessage:"Can you summarize the Q3 board meeting?",updatedAt:new Date("2025-06-13"),messageCount:2}],o={args:{conversations:a,onSelect:e=>console.log("Selected:",e)}},s={args:{conversations:a,activeId:"2",onSelect:e=>console.log("Selected:",e)}},t={args:{conversations:a,activeId:"1",onSelect:e=>console.log("Selected:",e),onDelete:e=>console.log("Deleted:",e),onNew:()=>console.log("New conversation")}},n={args:{conversations:[],onSelect:e=>console.log("Selected:",e),onNew:()=>console.log("New conversation")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    conversations: sampleConversations,
    onSelect: id => console.log('Selected:', id)
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    conversations: sampleConversations,
    activeId: '2',
    onSelect: id => console.log('Selected:', id)
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    conversations: sampleConversations,
    activeId: '1',
    onSelect: id => console.log('Selected:', id),
    onDelete: id => console.log('Deleted:', id),
    onNew: () => console.log('New conversation')
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    conversations: [],
    onSelect: id => console.log('Selected:', id),
    onNew: () => console.log('New conversation')
  }
}`,...n.parameters?.docs?.source}}};const v=["Default","WithActiveConversation","WithDeleteAndNew","Empty"];export{o as Default,n as Empty,s as WithActiveConversation,t as WithDeleteAndNew,v as __namedExportsOrder,g as default};
