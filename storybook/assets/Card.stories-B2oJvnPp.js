import{j as e}from"./iframe-C2OKo2S4.js";import{k as r}from"./chunk-4KH4NCSB-B5sTboAg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const c={title:"Core/Card",component:r,argTypes:{variant:{control:"select",options:["default","elevated","outlined"]}}},a={render:()=>e.jsxs(r,{children:[e.jsx(r.Header,{children:"Card Title"}),e.jsx(r.Body,{children:"This is the card body content."}),e.jsx(r.Footer,{children:"Card Footer"})]})},d={render:()=>e.jsxs(r,{variant:"elevated",children:[e.jsx(r.Header,{children:"Elevated Card"}),e.jsx(r.Body,{children:"This card has a shadow instead of a border."})]})},o={render:()=>e.jsxs(r,{variant:"outlined",children:[e.jsx(r.Header,{children:"Outlined Card"}),e.jsx(r.Body,{children:"This card has a thicker border and transparent background."})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>This is the card body content.</Card.Body>
      <Card.Footer>Card Footer</Card.Footer>
    </Card>
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Card variant="elevated">
      <Card.Header>Elevated Card</Card.Header>
      <Card.Body>This card has a shadow instead of a border.</Card.Body>
    </Card>
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Card variant="outlined">
      <Card.Header>Outlined Card</Card.Header>
      <Card.Body>This card has a thicker border and transparent background.</Card.Body>
    </Card>
}`,...o.parameters?.docs?.source}}};const l=["Default","Elevated","Outlined"];export{a as Default,d as Elevated,o as Outlined,l as __namedExportsOrder,c as default};
