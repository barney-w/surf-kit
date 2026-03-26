import{z as s}from"./chunk-CFAYAL3Z-BsRUZPHP.js";import"./iframe-qkd0DpiO.js";import"./index-C2uo-3gH.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Core/Inputs/Slider",component:s,argTypes:{label:{control:"text"},minValue:{control:"number"},maxValue:{control:"number"},step:{control:"number"},defaultValue:{control:"number"},isDisabled:{control:"boolean"}}},e={args:{label:"Volume",defaultValue:50}},a={args:{label:"Price",minValue:0,maxValue:1e3,step:10,defaultValue:500}},r={args:{label:"Brightness",defaultValue:75,isDisabled:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Volume',
    defaultValue: 50
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Price',
    minValue: 0,
    maxValue: 1000,
    step: 10,
    defaultValue: 500
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Brightness',
    defaultValue: 75,
    isDisabled: true
  }
}`,...r.parameters?.docs?.source}}};const c=["Default","Range","Disabled"];export{e as Default,r as Disabled,a as Range,c as __namedExportsOrder,u as default};
