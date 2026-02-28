import{o as F}from"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const s=[{key:"cat",label:"Cat"},{key:"dog",label:"Dog"},{key:"fish",label:"Fish"},{key:"bird",label:"Bird"}],x={title:"Core/Select",component:F,argTypes:{label:{control:"text"},placeholder:{control:"text"},isDisabled:{control:"boolean"},errorMessage:{control:"text"}}},e={args:{label:"Favorite pet",items:s}},r={args:{label:"Favorite pet",items:s,placeholder:"Choose a pet..."}},a={args:{label:"Favorite pet",items:s,isDisabled:!0}},t={args:{label:"Favorite pet",items:s,errorMessage:"Please select a pet."}};var o,l,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var i,n,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items,
    placeholder: 'Choose a pet...'
  }
}`,...(p=(n=r.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var m,d,b;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items,
    isDisabled: true
  }
}`,...(b=(d=a.parameters)==null?void 0:d.docs)==null?void 0:b.source}}};var g,u,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items,
    errorMessage: 'Please select a pet.'
  }
}`,...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const y=["Default","WithPlaceholder","Disabled","WithError"];export{e as Default,a as Disabled,t as WithError,r as WithPlaceholder,y as __namedExportsOrder,x as default};
