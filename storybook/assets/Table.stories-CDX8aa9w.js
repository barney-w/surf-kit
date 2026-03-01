import{j as s,r as c}from"./iframe-BsSRimq6.js";import{G as o}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const p={title:"Core/Table",component:o},t=[{key:"name",label:"Name",sortable:!0},{key:"email",label:"Email"},{key:"role",label:"Role",sortable:!0}],n=[{name:"Alice Johnson",email:"alice@example.com",role:"Admin"},{name:"Bob Smith",email:"bob@example.com",role:"User"},{name:"Carol White",email:"carol@example.com",role:"Editor"}],e={render:()=>s.jsx(o,{columns:t,rows:n})},r={render:()=>{const[a,m]=c.useState({column:"name",direction:"ascending"});return s.jsx(o,{columns:t,rows:n,sortDescriptor:a,onSortChange:m})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={columns} rows={rows} />
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sort, setSort] = useState<{
      column: string;
      direction: 'ascending' | 'descending';
    }>({
      column: 'name',
      direction: 'ascending'
    });
    return <Table columns={columns} rows={rows} sortDescriptor={sort} onSortChange={setSort} />;
  }
}`,...r.parameters?.docs?.source}}};const b=["Default","Sortable"];export{e as Default,r as Sortable,b as __namedExportsOrder,p as default};
