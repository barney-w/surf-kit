import{j as r}from"./iframe-BsSRimq6.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import{S as n}from"./chunk-JFXCICUS-Q9M0u-bi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const p={title:"Core/Layout/ScrollArea",component:n},t={render:()=>r.jsx(n,{maxHeight:"200px",children:Array.from({length:20},(i,e)=>r.jsxs("p",{style:{padding:"8px 0"},children:["Item ",e+1]},e))})},a={render:()=>r.jsx(n,{orientation:"horizontal",children:r.jsx("div",{style:{display:"flex",gap:16,width:"max-content"},children:Array.from({length:20},(i,e)=>r.jsxs("div",{style:{minWidth:120,height:80,background:"#e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8},children:["Item ",e+1]},e))})})},o={render:()=>r.jsx(n,{maxHeight:150,children:Array.from({length:30},(i,e)=>r.jsxs("p",{style:{padding:"4px 0"},children:["Line ",e+1]},e))})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea maxHeight="200px">
      {Array.from({
      length: 20
    }, (_, i) => <p key={i} style={{
      padding: '8px 0'
    }}>Item {i + 1}</p>)}
    </ScrollArea>
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea orientation="horizontal">
      <div style={{
      display: 'flex',
      gap: 16,
      width: 'max-content'
    }}>
        {Array.from({
        length: 20
      }, (_, i) => <div key={i} style={{
        minWidth: 120,
        height: 80,
        background: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
      }}>
            Item {i + 1}
          </div>)}
      </div>
    </ScrollArea>
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <ScrollArea maxHeight={150}>
      {Array.from({
      length: 30
    }, (_, i) => <p key={i} style={{
      padding: '4px 0'
    }}>Line {i + 1}</p>)}
    </ScrollArea>
}`,...o.parameters?.docs?.source}}};const h=["Default","Horizontal","MaxHeight"];export{t as Default,a as Horizontal,o as MaxHeight,h as __namedExportsOrder,p as default};
