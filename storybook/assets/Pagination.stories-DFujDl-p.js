import{r as o,j as g}from"./iframe-BsSRimq6.js";import{P as s}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const i={title:"Core/Navigation/Pagination",component:s},e={render:()=>{const[t,n]=o.useState(1);return g.jsx(s,{totalPages:10,currentPage:t,onPageChange:n})}},a={render:()=>{const[t,n]=o.useState(5);return g.jsx(s,{totalPages:20,currentPage:t,onPageChange:n})}},r={args:{totalPages:3,currentPage:1,onPageChange:()=>{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />;
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination totalPages={20} currentPage={page} onPageChange={setPage} />;
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 3,
    currentPage: 1,
    onPageChange: () => {}
  }
}`,...r.parameters?.docs?.source}}};const m=["Default","ManyPages","FewPages"];export{e as Default,r as FewPages,a as ManyPages,m as __namedExportsOrder,i as default};
