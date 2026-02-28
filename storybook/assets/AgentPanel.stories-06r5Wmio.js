import{j as t,r as f}from"./iframe-DfQrMS3t.js";import{f as h}from"./index-kVgamDB_.js";import"./preload-helper-C1FmrZbK.js";import"./index-_nN3MFVB.js";import"./index-ByQMLxTz.js";const A={title:"Agent/Layouts/AgentPanel",component:h,parameters:{layout:"fullscreen"}},a=e=>{const[P,o]=f.useState(!0);return t.jsxs("div",{style:{padding:24},children:[t.jsx("button",{onClick:()=>o(!0),children:"Open Panel"}),t.jsx(h,{...e,isOpen:P,onClose:()=>o(!1)})]})},n={render:e=>t.jsx(a,{...e}),args:{endpoint:"https://api.example.com",isOpen:!0,onClose:()=>{},title:"Agent Panel",side:"right"}},r={render:e=>t.jsx(a,{...e}),args:{endpoint:"https://api.example.com",isOpen:!0,onClose:()=>{},title:"Agent Panel",side:"left"}},s={render:e=>t.jsx(a,{...e}),args:{endpoint:"https://api.example.com",isOpen:!0,onClose:()=>{},title:"Wide Panel",width:600}};var p,i,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Agent Panel',
    side: 'right'
  }
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,m,c;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Agent Panel',
    side: 'left'
  }
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var g,u,x;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Wide Panel',
    width: 600
  }
}`,...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const y=["RightSide","LeftSide","CustomWidth"];export{s as CustomWidth,r as LeftSide,n as RightSide,y as __namedExportsOrder,A as default};
