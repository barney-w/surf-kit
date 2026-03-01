import{r as o,j as e}from"./iframe-BsSRimq6.js";import{z as m}from"./index-DS2v21UH.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./index-asa8OAme.js";const y={title:"Agent/StreamingList",component:m},s={render:()=>{const[t,l]=o.useState(["First item"]),[p,d]=o.useState(!0);return o.useEffect(()=>{const r=["Second item","Third item","Fourth item"];let n=0;const c=setInterval(()=>{n<r.length?(l(u=>[...u,r[n]]),n++):(d(!1),clearInterval(c))},1500);return()=>clearInterval(c)},[]),e.jsx(m,{items:t,renderItem:r=>e.jsx("span",{className:"block py-1 text-sm text-text-primary",children:r}),isStreaming:p})}},a={render:()=>e.jsx(m,{items:[],renderItem:t=>e.jsx("span",{children:t}),emptyMessage:"No results found"})},i={render:()=>e.jsx(m,{items:["Apple","Banana","Cherry"],renderItem:t=>e.jsx("span",{className:"block py-1 text-sm text-text-primary",children:t}),isStreaming:!1})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [items, setItems] = useState<string[]>(['First item']);
    const [isStreaming, setIsStreaming] = useState(true);
    useEffect(() => {
      const allItems = ['Second item', 'Third item', 'Fourth item'];
      let i = 0;
      const interval = setInterval(() => {
        if (i < allItems.length) {
          setItems(prev => [...prev, allItems[i]]);
          i++;
        } else {
          setIsStreaming(false);
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }, []);
    return <StreamingList items={items} renderItem={item => <span className="block py-1 text-sm text-text-primary">{item}</span>} isStreaming={isStreaming} />;
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <StreamingList items={[]} renderItem={(item: string) => <span>{item}</span>} emptyMessage="No results found" />
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <StreamingList items={['Apple', 'Banana', 'Cherry']} renderItem={(item: string) => <span className="block py-1 text-sm text-text-primary">{item}</span>} isStreaming={false} />
}`,...i.parameters?.docs?.source}}};const v=["Default","Empty","StaticList"];export{s as Default,a as Empty,i as StaticList,v as __namedExportsOrder,y as default};
