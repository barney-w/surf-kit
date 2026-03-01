import{j as e}from"./iframe-C2OKo2S4.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import{R as o}from"./chunk-JFXCICUS-CiA1aVQL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const c={title:"Core/Layout/Resizable",component:o,argTypes:{direction:{control:"select",options:["horizontal","vertical"]},defaultSize:{control:{type:"range",min:0,max:100}},minSize:{control:"number"},maxSize:{control:"number"}},decorators:[i=>e.jsx("div",{style:{height:300,border:"1px solid var(--color-border)"},children:e.jsx(i,{})})]},t={args:{direction:"horizontal",defaultSize:50,children:[e.jsx("div",{style:{padding:16},children:"Left Panel"},"left"),e.jsx("div",{style:{padding:16},children:"Right Panel"},"right")]}},r={args:{direction:"vertical",defaultSize:40,children:[e.jsx("div",{style:{padding:16},children:"Top Panel"},"top"),e.jsx("div",{style:{padding:16},children:"Bottom Panel"},"bottom")]}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    direction: 'horizontal',
    defaultSize: 50,
    children: [<div key="left" style={{
      padding: 16
    }}>Left Panel</div>, <div key="right" style={{
      padding: 16
    }}>Right Panel</div>]
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    direction: 'vertical',
    defaultSize: 40,
    children: [<div key="top" style={{
      padding: 16
    }}>Top Panel</div>, <div key="bottom" style={{
      padding: 16
    }}>Bottom Panel</div>]
  }
}`,...r.parameters?.docs?.source}}};const p=["Default","Vertical"];export{t as Default,r as Vertical,p as __namedExportsOrder,c as default};
