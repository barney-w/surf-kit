import{j as t}from"./iframe-C2OKo2S4.js";import{p as a}from"./chunk-4KH4NCSB-B5sTboAg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const d={title:"Core/Overlay/ContextMenu",component:a},e={render:()=>t.jsx(a,{items:[{key:"copy",label:"Copy"},{key:"paste",label:"Paste"},{key:"delete",label:"Delete",isDanger:!0}],onAction:r=>console.log(r),children:t.jsx("div",{style:{padding:"4rem",border:"1px dashed gray",borderRadius:"0.5rem",textAlign:"center"},children:"Right-click in this area"})})},n={render:()=>t.jsx(a,{items:[{key:"cut",label:"Cut"},{key:"copy",label:"Copy"},{key:"paste",label:"Paste",isDisabled:!0},{key:"delete",label:"Delete",isDanger:!0}],onAction:r=>console.log(r),children:t.jsx("div",{style:{padding:"4rem",border:"1px dashed gray",borderRadius:"0.5rem",textAlign:"center"},children:"Right-click here (Paste is disabled)"})})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    key: 'copy',
    label: 'Copy'
  }, {
    key: 'paste',
    label: 'Paste'
  }, {
    key: 'delete',
    label: 'Delete',
    isDanger: true
  }]} onAction={key => console.log(key)}>
      <div style={{
      padding: '4rem',
      border: '1px dashed gray',
      borderRadius: '0.5rem',
      textAlign: 'center'
    }}>
        Right-click in this area
      </div>
    </ContextMenu>
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenu items={[{
    key: 'cut',
    label: 'Cut'
  }, {
    key: 'copy',
    label: 'Copy'
  }, {
    key: 'paste',
    label: 'Paste',
    isDisabled: true
  }, {
    key: 'delete',
    label: 'Delete',
    isDanger: true
  }]} onAction={key => console.log(key)}>
      <div style={{
      padding: '4rem',
      border: '1px dashed gray',
      borderRadius: '0.5rem',
      textAlign: 'center'
    }}>
        Right-click here (Paste is disabled)
      </div>
    </ContextMenu>
}`,...n.parameters?.docs?.source}}};const c=["Default","WithDisabledItems"];export{e as Default,n as WithDisabledItems,c as __namedExportsOrder,d as default};
