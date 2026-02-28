import{A as f}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const x={title:"Agent/AgentAvatar",component:f,argTypes:{size:{control:"select",options:["sm","md","lg"]}}},t={id:"hr-agent",label:"HR Agent",accent:"#10b981"},z={id:"finance",label:"Finance Bot",accent:"#f59e0b"},e={args:{agent:t}},a={args:{agent:t,size:"sm"}},r={args:{agent:z,size:"lg"}},n={args:{agentId:"hr-agent",agentThemes:{"hr-agent":t},size:"md"}};var s,o,g;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    agent: hrAgent
  }
}`,...(g=(o=e.parameters)==null?void 0:o.docs)==null?void 0:g.source}}};var c,m,i;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    agent: hrAgent,
    size: 'sm'
  }
}`,...(i=(m=a.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var p,d,l;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    agent: financeAgent,
    size: 'lg'
  }
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var u,A,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    agentId: 'hr-agent',
    agentThemes: {
      'hr-agent': hrAgent
    },
    size: 'md'
  }
}`,...(h=(A=n.parameters)==null?void 0:A.docs)==null?void 0:h.source}}};const D=["Default","Small","Large","WithAgentId"];export{e as Default,r as Large,a as Small,n as WithAgentId,D as __namedExportsOrder,x as default};
