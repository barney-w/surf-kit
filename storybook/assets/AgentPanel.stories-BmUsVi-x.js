import{j as t,r as l}from"./iframe-BsSRimq6.js";import{f as p}from"./index-DS2v21UH.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./index-asa8OAme.js";const x={title:"Agent/Layouts/AgentPanel",component:p,parameters:{layout:"fullscreen"}},a=e=>{const[i,o]=l.useState(!0);return t.jsxs("div",{style:{padding:24},children:[t.jsx("button",{onClick:()=>o(!0),children:"Open Panel"}),t.jsx(p,{...e,isOpen:i,onClose:()=>o(!1)})]})},n={render:e=>t.jsx(a,{...e}),args:{endpoint:"https://api.example.com",isOpen:!0,onClose:()=>{},title:"Agent Panel",side:"right"}},r={render:e=>t.jsx(a,{...e}),args:{endpoint:"https://api.example.com",isOpen:!0,onClose:()=>{},title:"Agent Panel",side:"left"}},s={render:e=>t.jsx(a,{...e}),args:{endpoint:"https://api.example.com",isOpen:!0,onClose:()=>{},title:"Wide Panel",width:600}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Agent Panel',
    side: 'right'
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Agent Panel',
    side: 'left'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <PanelWrapper {...args} />,
  args: {
    endpoint: 'https://api.example.com',
    isOpen: true,
    onClose: () => {},
    title: 'Wide Panel',
    width: 600
  }
}`,...s.parameters?.docs?.source}}};const h=["RightSide","LeftSide","CustomWidth"];export{s as CustomWidth,r as LeftSide,n as RightSide,h as __namedExportsOrder,x as default};
