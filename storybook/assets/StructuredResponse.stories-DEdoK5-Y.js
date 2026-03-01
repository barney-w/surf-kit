import{G as l}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const c={title:"Agent/StructuredResponse",component:l,argTypes:{uiHint:{control:"select",options:["text","table","card","list","steps","warning"]}}},e={args:{uiHint:"text",data:{text:"All full-time employees are entitled to four weeks of paid annual leave."}}},a={args:{uiHint:"table",data:{columns:["Type","Days","Applicable To"],rows:[{Type:"Annual Leave",Days:"20","Applicable To":"Full-time"},{Type:"Personal Leave",Days:"10","Applicable To":"All employees"},{Type:"Parental Leave",Days:"52 weeks","Applicable To":"Primary carer"}]}}},t={args:{uiHint:"table",data:{leave_entitlement_days:20,leave_type:"annual",applicable_to:"full-time"}}},n={args:{uiHint:"card",data:{leave_entitlement_days:20,leave_type:"annual",applicable_to:"full-time"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    uiHint: 'text',
    data: {
      text: 'All full-time employees are entitled to four weeks of paid annual leave.'
    }
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    uiHint: 'table',
    data: {
      columns: ['Type', 'Days', 'Applicable To'],
      rows: [{
        Type: 'Annual Leave',
        Days: '20',
        'Applicable To': 'Full-time'
      }, {
        Type: 'Personal Leave',
        Days: '10',
        'Applicable To': 'All employees'
      }, {
        Type: 'Parental Leave',
        Days: '52 weeks',
        'Applicable To': 'Primary carer'
      }]
    }
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    uiHint: 'table',
    data: {
      leave_entitlement_days: 20,
      leave_type: 'annual',
      applicable_to: 'full-time'
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    uiHint: 'card',
    data: {
      leave_entitlement_days: 20,
      leave_type: 'annual',
      applicable_to: 'full-time'
    }
  }
}`,...n.parameters?.docs?.source}}};const u=["TextHint","TableHint","KeyValueTable","JsonFallback"];export{n as JsonFallback,t as KeyValueTable,a as TableHint,e as TextHint,u as __namedExportsOrder,c as default};
