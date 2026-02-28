import{c as p}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const g={title:"Agent/Layouts/AgentFullPage",component:p,parameters:{layout:"fullscreen"}},e={args:{endpoint:"https://api.example.com",title:"AI Assistant"}},t={args:{endpoint:"https://api.example.com",title:"AI Assistant",showConversationList:!0,conversations:[{id:"1",title:"Leave policy",lastMessage:"How many days of PTO?",updatedAt:new Date,messageCount:4},{id:"2",title:"Password reset",lastMessage:"I need to reset my password",updatedAt:new Date,messageCount:2}],activeConversationId:"1"}};var s,a,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    endpoint: 'https://api.example.com',
    title: 'AI Assistant'
  }
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var o,r,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const A=["Default","WithSidebar"];export{e as Default,t as WithSidebar,A as __namedExportsOrder,g as default};
