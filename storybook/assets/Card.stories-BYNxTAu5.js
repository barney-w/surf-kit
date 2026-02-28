import{j as e}from"./iframe-DfQrMS3t.js";import{C as r}from"./index-_nN3MFVB.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const v={title:"Core/Card",component:r,argTypes:{variant:{control:"select",options:["default","elevated","outlined"]}}},a={render:()=>e.jsxs(r,{children:[e.jsx(r.Header,{children:"Card Title"}),e.jsx(r.Body,{children:"This is the card body content."}),e.jsx(r.Footer,{children:"Card Footer"})]})},d={render:()=>e.jsxs(r,{variant:"elevated",children:[e.jsx(r.Header,{children:"Elevated Card"}),e.jsx(r.Body,{children:"This card has a shadow instead of a border."})]})},o={render:()=>e.jsxs(r,{variant:"outlined",children:[e.jsx(r.Header,{children:"Outlined Card"}),e.jsx(r.Body,{children:"This card has a thicker border and transparent background."})]})};var t,n,s;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>This is the card body content.</Card.Body>
      <Card.Footer>Card Footer</Card.Footer>
    </Card>
}`,...(s=(n=a.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var i,c,l;d.parameters={...d.parameters,docs:{...(i=d.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <Card variant="elevated">
      <Card.Header>Elevated Card</Card.Header>
      <Card.Body>This card has a shadow instead of a border.</Card.Body>
    </Card>
}`,...(l=(c=d.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var C,h,p;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Card variant="outlined">
      <Card.Header>Outlined Card</Card.Header>
      <Card.Body>This card has a thicker border and transparent background.</Card.Body>
    </Card>
}`,...(p=(h=o.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};const y=["Default","Elevated","Outlined"];export{a as Default,d as Elevated,o as Outlined,y as __namedExportsOrder,v as default};
