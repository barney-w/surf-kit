import{j as e}from"./iframe-BsSRimq6.js";import{O as a}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const n={title:"Core/Toggle",component:a,argTypes:{size:{control:"select",options:["sm","md","lg"]},isSelected:{control:"boolean"},isDisabled:{control:"boolean"}}},s={args:{children:"Bold"}},r={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center"},children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})},o={args:{children:"Disabled",isDisabled:!0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Bold'
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  }}>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Disabled',
    isDisabled: true
  }
}`,...o.parameters?.docs?.source}}};const c=["Default","AllSizes","Disabled"];export{r as AllSizes,s as Default,o as Disabled,c as __namedExportsOrder,n as default};
