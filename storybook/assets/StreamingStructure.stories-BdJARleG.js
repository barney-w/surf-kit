import{j as i,r as s}from"./iframe-C2OKo2S4.js";import{D as a}from"./index-DNQVFfJz.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./index-Dc2MNpMC.js";const y={title:"Agent/StreamingStructure",component:a},e={render:()=>i.jsx(a,{data:{name:"John Doe",age:30,email:"john@example.com",address:{city:"Sydney",country:"Australia"}},isStreaming:!1})},t={render:()=>{const[m,l]=s.useState({name:"Jane"}),[u,p]=s.useState(!0);return s.useEffect(()=>{const o=[{age:28},{email:"jane@example.com"},{tags:["designer","developer"]}];let n=0;const c=setInterval(()=>{n<o.length?(l(d=>({...d,...o[n]})),n++):(p(!1),clearInterval(c))},1500);return()=>clearInterval(c)},[]),i.jsx(a,{data:m,isStreaming:u})}},r={render:()=>i.jsx(a,{data:{project:"surf-kit",languages:["TypeScript","CSS","HTML"],active:!0},isStreaming:!1})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <StreamingStructure data={{
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    address: {
      city: 'Sydney',
      country: 'Australia'
    }
  }} isStreaming={false} />
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<Record<string, unknown>>({
      name: 'Jane'
    });
    const [isStreaming, setIsStreaming] = useState(true);
    useEffect(() => {
      const steps: Record<string, unknown>[] = [{
        age: 28
      }, {
        email: 'jane@example.com'
      }, {
        tags: ['designer', 'developer']
      }];
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          setData(prev => ({
            ...prev,
            ...steps[i]
          }));
          i++;
        } else {
          setIsStreaming(false);
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }, []);
    return <StreamingStructure data={data} isStreaming={isStreaming} />;
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <StreamingStructure data={{
    project: 'surf-kit',
    languages: ['TypeScript', 'CSS', 'HTML'],
    active: true
  }} isStreaming={false} />
}`,...r.parameters?.docs?.source}}};const j=["Default","Streaming","WithArrays"];export{e as Default,t as Streaming,r as WithArrays,j as __namedExportsOrder,y as default};
