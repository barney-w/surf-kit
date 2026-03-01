import{j as e,r as i}from"./iframe-BsSRimq6.js";import{a as c}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const l={title:"Core/Sheet"};function n({side:s="right"}){const[a,o]=i.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:()=>o(!0),children:["Open Sheet (",s,")"]}),e.jsx(c,{isOpen:a,onClose:()=>o(!1),side:s,title:"Sheet Title",children:e.jsx("p",{children:"Sheet content goes here."})})]})}const r={render:()=>e.jsx(n,{side:"right"})},t={render:()=>e.jsx(n,{side:"left"})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <SheetDemo side="right" />
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <SheetDemo side="left" />
}`,...t.parameters?.docs?.source}}};const u=["Right","Left"];export{t as Left,r as Right,u as __namedExportsOrder,l as default};
