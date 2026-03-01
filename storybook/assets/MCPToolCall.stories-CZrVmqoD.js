import{p as c}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const i={title:"Agent/MCPToolCall",component:c},e={args:{call:{id:"call-1",name:"read_file",arguments:{path:"/src/index.ts"},status:"pending"}}},t={args:{call:{id:"call-2",name:"search_code",serverName:"filesystem",arguments:{query:"export default",include:"*.tsx"},status:"running",startedAt:new Date("2026-01-01T00:00:00Z")}}},r={args:{call:{id:"call-3",name:"read_file",serverName:"filesystem",arguments:{path:"/src/utils.ts"},result:{content:"export function add(a: number, b: number) { return a + b }"},status:"success",startedAt:new Date("2026-01-01T00:00:00Z"),completedAt:new Date("2026-01-01T00:00:00.350Z")}}},n={args:{call:{id:"call-4",name:"write_file",arguments:{path:"/etc/hosts",content:"127.0.0.1 evil.com"},error:"Permission denied: cannot write to /etc/hosts",status:"error",startedAt:new Date("2026-01-01T00:00:00Z"),completedAt:new Date("2026-01-01T00:00:00.120Z")}}},s={args:{call:{id:"call-5",name:"list_directory",serverName:"filesystem",arguments:{path:"/src",recursive:!0},result:["index.ts","utils.ts","types/","types/mcp.ts"],status:"success",startedAt:new Date("2026-01-01T00:00:00Z"),completedAt:new Date("2026-01-01T00:00:02.1Z")},isExpanded:!0}},a={args:{call:{id:"call-6",name:"execute_command",arguments:{command:"rm -rf /"},error:"Command rejected: destructive operation not allowed",status:"error",startedAt:new Date("2026-01-01T00:00:00Z"),completedAt:new Date("2026-01-01T00:00:00.050Z")},isExpanded:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-1',
      name: 'read_file',
      arguments: {
        path: '/src/index.ts'
      },
      status: 'pending'
    }
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-2',
      name: 'search_code',
      serverName: 'filesystem',
      arguments: {
        query: 'export default',
        include: '*.tsx'
      },
      status: 'running',
      startedAt: new Date('2026-01-01T00:00:00Z')
    }
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-3',
      name: 'read_file',
      serverName: 'filesystem',
      arguments: {
        path: '/src/utils.ts'
      },
      result: {
        content: 'export function add(a: number, b: number) { return a + b }'
      },
      status: 'success',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:00.350Z')
    }
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-4',
      name: 'write_file',
      arguments: {
        path: '/etc/hosts',
        content: '127.0.0.1 evil.com'
      },
      error: 'Permission denied: cannot write to /etc/hosts',
      status: 'error',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:00.120Z')
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-5',
      name: 'list_directory',
      serverName: 'filesystem',
      arguments: {
        path: '/src',
        recursive: true
      },
      result: ['index.ts', 'utils.ts', 'types/', 'types/mcp.ts'],
      status: 'success',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:02.1Z')
    },
    isExpanded: true
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    call: {
      id: 'call-6',
      name: 'execute_command',
      arguments: {
        command: 'rm -rf /'
      },
      error: 'Command rejected: destructive operation not allowed',
      status: 'error',
      startedAt: new Date('2026-01-01T00:00:00Z'),
      completedAt: new Date('2026-01-01T00:00:00.050Z')
    },
    isExpanded: true
  }
}`,...a.parameters?.docs?.source}}};const p=["Pending","Running","Success","Error","SuccessExpanded","ErrorExpanded"];export{n as Error,a as ErrorExpanded,e as Pending,t as Running,r as Success,s as SuccessExpanded,p as __namedExportsOrder,i as default};
