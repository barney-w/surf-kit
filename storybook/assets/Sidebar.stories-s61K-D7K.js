import{j as e,r as a}from"./iframe-C2OKo2S4.js";import{z as d}from"./chunk-4KH4NCSB-B5sTboAg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const x={title:"Core/Sidebar",component:d};function t(){const[n,i]=a.useState(!1);return e.jsxs("div",{style:{height:400,display:"flex"},children:[e.jsx(d,{collapsed:n,onToggle:()=>i(!n),children:e.jsx("div",{style:{padding:16},children:!n&&e.jsxs("ul",{children:[e.jsx("li",{children:"Dashboard"}),e.jsx("li",{children:"Messages"}),e.jsx("li",{children:"Settings"})]})})}),e.jsx("div",{style:{flex:1,padding:16},children:"Main content area"})]})}const s={render:()=>e.jsx(t,{})},r={render:()=>e.jsxs("div",{style:{height:400,display:"flex"},children:[e.jsx(d,{collapsed:!0,children:e.jsx("div",{style:{padding:8},children:"Icons"})}),e.jsx("div",{style:{flex:1,padding:16},children:"Main content"})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <SidebarDemo />
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const m=["Default","Collapsed"];export{r as Collapsed,s as Default,m as __namedExportsOrder,x as default};
