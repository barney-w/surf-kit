import{A as D}from"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const A={title:"Core/Alert",component:D,argTypes:{intent:{control:"select",options:["info","success","warning","error"]}}},e={args:{intent:"info",title:"Information",children:"This is an informational alert."}},r={args:{intent:"success",title:"Success",children:"Operation completed successfully."}},n={args:{intent:"warning",title:"Warning",children:"Please review before continuing."}},s={args:{intent:"error",title:"Error",children:"Something went wrong."}},t={args:{intent:"info",title:"Dismissible",children:"Click the X to dismiss this alert.",onDismiss:()=>{}}};var i,o,a;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    intent: 'info',
    title: 'Information',
    children: 'This is an informational alert.'
  }
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var c,l,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    intent: 'success',
    title: 'Success',
    children: 'Operation completed successfully.'
  }
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,d,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    intent: 'warning',
    title: 'Warning',
    children: 'Please review before continuing.'
  }
}`,...(g=(d=n.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var u,h,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    intent: 'error',
    title: 'Error',
    children: 'Something went wrong.'
  }
}`,...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var S,w,b;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    intent: 'info',
    title: 'Dismissible',
    children: 'Click the X to dismiss this alert.',
    onDismiss: () => {}
  }
}`,...(b=(w=t.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};const C=["Info","Success","Warning","Error","Dismissible"];export{t as Dismissible,s as Error,e as Info,r as Success,n as Warning,C as __namedExportsOrder,A as default};
