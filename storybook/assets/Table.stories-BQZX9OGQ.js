import{j as l,r as b}from"./iframe-DfQrMS3t.js";import{r as o}from"./index-_nN3MFVB.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const h={title:"Core/Table",component:o},i=[{key:"name",label:"Name",sortable:!0},{key:"email",label:"Email"},{key:"role",label:"Role",sortable:!0}],u=[{name:"Alice Johnson",email:"alice@example.com",role:"Admin"},{name:"Bob Smith",email:"bob@example.com",role:"User"},{name:"Carol White",email:"carol@example.com",role:"Editor"}],e={render:()=>l.jsx(o,{columns:i,rows:u})},r={render:()=>{const[d,p]=b.useState({column:"name",direction:"ascending"});return l.jsx(o,{columns:i,rows:u,sortDescriptor:d,onSortChange:p})}};var s,t,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Table columns={columns} rows={rows} />
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var a,m,c;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const w=["Default","Sortable"];export{e as Default,r as Sortable,w as __namedExportsOrder,h as default};
