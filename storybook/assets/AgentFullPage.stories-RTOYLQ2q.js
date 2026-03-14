import{c as s}from"./index-D7J-K4zx.js";import"./chunk-4KCMZQCT-7Yjf55Xe.js";import"./iframe-Bff_QRDz.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DZr9vX7T.js";const p={title:"Agent/Layouts/AgentFullPage",component:s,parameters:{layout:"fullscreen"}},e={args:{endpoint:"https://api.example.com",title:"AI Assistant"}},t={args:{endpoint:"https://api.example.com",title:"AI Assistant",showConversationList:!0,conversations:[{id:"1",title:"Leave policy",lastMessage:"How many days of PTO?",updatedAt:new Date,messageCount:4},{id:"2",title:"Password reset",lastMessage:"I need to reset my password",updatedAt:new Date,messageCount:2}],activeConversationId:"1"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    endpoint: 'https://api.example.com',
    title: 'AI Assistant'
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    endpoint: 'https://api.example.com',
    title: 'AI Assistant',
    showConversationList: true,
    conversations: [{
      id: '1',
      title: 'Leave policy',
      lastMessage: 'How many days of PTO?',
      updatedAt: new Date(),
      messageCount: 4
    }, {
      id: '2',
      title: 'Password reset',
      lastMessage: 'I need to reset my password',
      updatedAt: new Date(),
      messageCount: 2
    }],
    activeConversationId: '1'
  }
}`,...t.parameters?.docs?.source}}};const d=["Default","WithSidebar"];export{e as Default,t as WithSidebar,d as __namedExportsOrder,p as default};
