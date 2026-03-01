import{M as n}from"./index-DS2v21UH.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./iframe-BsSRimq6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const c={title:"Agent/MCPApprovalDialog",component:n,args:{isOpen:!0,onApprove:()=>alert("Approved"),onDeny:()=>alert("Denied")}},e={args:{call:{id:"call-1",name:"read_file",serverName:"filesystem",arguments:{path:"/src/index.ts"},status:"pending"},riskLevel:"low"}},s={args:{call:{id:"call-2",name:"write_file",serverName:"filesystem",arguments:{path:"/src/config.ts",content:"export default {}"},status:"pending"},riskLevel:"medium"}},a={args:{call:{id:"call-3",name:"execute_command",serverName:"shell",arguments:{command:"rm -rf /tmp/cache"},status:"pending"},riskLevel:"high"}},r={args:{call:{id:"call-4",name:"get_status",arguments:{},status:"pending"},riskLevel:"low"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-1',
      name: 'read_file',
      serverName: 'filesystem',
      arguments: {
        path: '/src/index.ts'
      },
      status: 'pending'
    },
    riskLevel: 'low'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-2',
      name: 'write_file',
      serverName: 'filesystem',
      arguments: {
        path: '/src/config.ts',
        content: 'export default {}'
      },
      status: 'pending'
    },
    riskLevel: 'medium'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-3',
      name: 'execute_command',
      serverName: 'shell',
      arguments: {
        command: 'rm -rf /tmp/cache'
      },
      status: 'pending'
    },
    riskLevel: 'high'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-4',
      name: 'get_status',
      arguments: {},
      status: 'pending'
    },
    riskLevel: 'low'
  }
}`,...r.parameters?.docs?.source}}};const p=["LowRisk","MediumRisk","HighRisk","NoArguments"];export{a as HighRisk,e as LowRisk,s as MediumRisk,r as NoArguments,p as __namedExportsOrder,c as default};
