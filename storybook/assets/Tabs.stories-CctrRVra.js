import{R as x,j as o}from"./iframe-DfQrMS3t.js";import{s}from"./index-_nN3MFVB.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const f={title:"Core/Tabs",component:s,argTypes:{orientation:{control:"select",options:["horizontal","vertical"]}}},n=[{key:"overview",title:"Overview",content:"Overview content goes here."},{key:"details",title:"Details",content:"Details content goes here."},{key:"settings",title:"Settings",content:"Settings content goes here."}],e={render:()=>o.jsx(s,{items:n})},t={render:()=>o.jsx(s,{items:n,orientation:"vertical"})},r={render:()=>{const[S,v]=x.useState("details");return o.jsx(s,{items:n,selectedKey:S,onSelectionChange:v})}};var a,c,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <Tabs items={items} />
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var l,d,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Tabs items={items} orientation="vertical" />
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = React.useState('details');
    return <Tabs items={items} selectedKey={selected} onSelectionChange={setSelected} />;
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const j=["Default","Vertical","Controlled"];export{r as Controlled,e as Default,t as Vertical,j as __namedExportsOrder,f as default};
