import{A as i}from"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./index-Dc2MNpMC.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"Core/Alert",component:i,argTypes:{intent:{control:"select",options:["info","success","warning","error"]}}},e={args:{intent:"info",title:"Information",children:"This is an informational alert."}},r={args:{intent:"success",title:"Success",children:"Operation completed successfully."}},n={args:{intent:"warning",title:"Warning",children:"Please review before continuing."}},s={args:{intent:"error",title:"Error",children:"Something went wrong."}},t={args:{intent:"info",title:"Dismissible",children:"Click the X to dismiss this alert.",onDismiss:()=>{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    intent: 'info',
    title: 'Information',
    children: 'This is an informational alert.'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    intent: 'success',
    title: 'Success',
    children: 'Operation completed successfully.'
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    intent: 'warning',
    title: 'Warning',
    children: 'Please review before continuing.'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    intent: 'error',
    title: 'Error',
    children: 'Something went wrong.'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    intent: 'info',
    title: 'Dismissible',
    children: 'Click the X to dismiss this alert.',
    onDismiss: () => {}
  }
}`,...t.parameters?.docs?.source}}};const p=["Info","Success","Warning","Error","Dismissible"];export{t as Dismissible,s as Error,e as Info,r as Success,n as Warning,p as __namedExportsOrder,m as default};
