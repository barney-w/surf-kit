import{j as e,r as x}from"./iframe-DfQrMS3t.js";import{p as d}from"./index-_nN3MFVB.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const f={title:"Core/Sidebar",component:d};function m(){const[n,p]=x.useState(!1);return e.jsxs("div",{style:{height:400,display:"flex"},children:[e.jsx(d,{collapsed:n,onToggle:()=>p(!n),children:e.jsx("div",{style:{padding:16},children:!n&&e.jsxs("ul",{children:[e.jsx("li",{children:"Dashboard"}),e.jsx("li",{children:"Messages"}),e.jsx("li",{children:"Settings"})]})})}),e.jsx("div",{style:{flex:1,padding:16},children:"Main content area"})]})}const s={render:()=>e.jsx(m,{})},r={render:()=>e.jsxs("div",{style:{height:400,display:"flex"},children:[e.jsx(d,{collapsed:!0,children:e.jsx("div",{style:{padding:8},children:"Icons"})}),e.jsx("div",{style:{flex:1,padding:16},children:"Main content"})]})};var i,a,t;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <SidebarDemo />
}`,...(t=(a=s.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};var l,o,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    height: 400,
    display: 'flex'
  }}>
      <Sidebar collapsed>
        <div style={{
        padding: 8
      }}>Icons</div>
      </Sidebar>
      <div style={{
      flex: 1,
      padding: 16
    }}>Main content</div>
    </div>
}`,...(c=(o=r.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const v=["Default","Collapsed"];export{r as Collapsed,s as Default,v as __namedExportsOrder,f as default};
