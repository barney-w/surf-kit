import{j as a}from"./iframe-BsSRimq6.js";import{q as r}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const c={title:"Core/DataList",component:r,argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},o=[{label:"Name",value:"Alice Johnson"},{label:"Email",value:"alice@example.com"},{label:"Role",value:"Administrator"},{label:"Status",value:"Active"}],e={render:()=>a.jsx(r,{items:o})},t={render:()=>a.jsx(r,{items:o,orientation:"vertical"})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <DataList items={items} />
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <DataList items={items} orientation="vertical" />
}`,...t.parameters?.docs?.source}}};const m=["Horizontal","Vertical"];export{e as Horizontal,t as Vertical,m as __namedExportsOrder,c as default};
