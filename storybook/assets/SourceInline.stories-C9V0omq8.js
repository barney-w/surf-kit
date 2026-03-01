import{j as t}from"./iframe-BsSRimq6.js";import{x as o}from"./index-DS2v21UH.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./index-asa8OAme.js";const c={title:"Agent/SourceInline",component:o},e={args:{source:{title:"Enterprise Agreement 2024",section:"Section 12 — Leave Entitlements",document_id:"ea-2024-001",url:"https://example.com/ea",confidence:.95,snippet:"All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service."},index:1}},n={render:()=>t.jsxs("p",{children:["Employees are entitled to four weeks of paid annual leave",t.jsx(o,{source:{title:"Enterprise Agreement 2024",section:"Section 12",document_id:"ea-2024-001",url:"https://example.com/ea",confidence:.95,snippet:"All full-time employees are entitled to four weeks of paid annual leave."},index:1})," ","and ten days of personal leave",t.jsx(o,{source:{title:"HR Policy Manual",section:"Chapter 5",document_id:"hr-policy-005",url:"https://example.com/hr",confidence:.88,snippet:"Personal leave entitlements include sick leave and carer's leave."},index:2}),"."]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    source: {
      title: 'Enterprise Agreement 2024',
      section: 'Section 12 — Leave Entitlements',
      document_id: 'ea-2024-001',
      url: 'https://example.com/ea',
      confidence: 0.95,
      snippet: 'All full-time employees are entitled to four weeks (20 days) of paid annual leave per year of service.'
    },
    index: 1
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <p>
      Employees are entitled to four weeks of paid annual leave
      <SourceInline source={{
      title: 'Enterprise Agreement 2024',
      section: 'Section 12',
      document_id: 'ea-2024-001',
      url: 'https://example.com/ea',
      confidence: 0.95,
      snippet: 'All full-time employees are entitled to four weeks of paid annual leave.'
    }} index={1} />
      {' '}and ten days of personal leave
      <SourceInline source={{
      title: 'HR Policy Manual',
      section: 'Chapter 5',
      document_id: 'hr-policy-005',
      url: 'https://example.com/hr',
      confidence: 0.88,
      snippet: 'Personal leave entitlements include sick leave and carer\\'s leave.'
    }} index={2} />
      .
    </p>
}`,...n.parameters?.docs?.source}}};const p=["Default","InContext"];export{e as Default,n as InContext,p as __namedExportsOrder,c as default};
