import{R as i,j as o}from"./iframe-C2OKo2S4.js";import{I as s}from"./chunk-4KH4NCSB-B5sTboAg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const u={title:"Core/Tabs",component:s,argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},n=[{key:"overview",title:"Overview",content:"Overview content goes here."},{key:"details",title:"Details",content:"Details content goes here."},{key:"settings",title:"Settings",content:"Settings content goes here."}],e={render:()=>o.jsx(s,{items:n})},t={render:()=>o.jsx(s,{items:n,orientation:"vertical"})},r={render:()=>{const[a,c]=i.useState("details");return o.jsx(s,{items:n,selectedKey:a,onSelectionChange:c})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={items} />
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs items={items} orientation="vertical" />
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = React.useState('details');
    return <Tabs items={items} selectedKey={selected} onSelectionChange={setSelected} />;
  }
}`,...r.parameters?.docs?.source}}};const g=["Default","Vertical","Controlled"];export{r as Controlled,e as Default,t as Vertical,g as __namedExportsOrder,u as default};
