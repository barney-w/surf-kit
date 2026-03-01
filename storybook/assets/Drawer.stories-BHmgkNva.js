import{j as e,r as m}from"./iframe-C2OKo2S4.js";import{r as i}from"./chunk-4KH4NCSB-B5sTboAg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const D={title:"Core/Drawer"};function o({side:a="bottom"}){const[c,n]=m.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>n(!0),children:["Open Drawer (",a,")"]}),e.jsx(i,{isOpen:c,onClose:()=>n(!1),side:a,title:"Drawer Title",children:e.jsx("p",{children:"Drawer content goes here."})})]})}const r={render:()=>e.jsx(o,{side:"bottom"})},t={render:()=>e.jsx(o,{side:"left"})},s={render:()=>e.jsx(o,{side:"right"})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo side="bottom" />
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo side="left" />
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo side="right" />
}`,...s.parameters?.docs?.source}}};const x=["Bottom","Left","Right"];export{r as Bottom,t as Left,s as Right,x as __namedExportsOrder,D as default};
