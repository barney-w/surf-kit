import{w as T}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const f={title:"Agent/StructuredResponse",component:T,argTypes:{uiHint:{control:"select",options:["text","table","card","list","steps","warning"]}}},e={args:{uiHint:"text",data:{text:"All full-time employees are entitled to four weeks of paid annual leave."}}},a={args:{uiHint:"table",data:{columns:["Type","Days","Applicable To"],rows:[{Type:"Annual Leave",Days:"20","Applicable To":"Full-time"},{Type:"Personal Leave",Days:"10","Applicable To":"All employees"},{Type:"Parental Leave",Days:"52 weeks","Applicable To":"Primary carer"}]}}},t={args:{uiHint:"table",data:{leave_entitlement_days:20,leave_type:"annual",applicable_to:"full-time"}}},n={args:{uiHint:"card",data:{leave_entitlement_days:20,leave_type:"annual",applicable_to:"full-time"}}};var l,r,s;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    uiHint: 'text',
    data: {
      text: 'All full-time employees are entitled to four weeks of paid annual leave.'
    }
  }
}`,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var o,p,i;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(i=(p=a.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var c,u,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    uiHint: 'table',
    data: {
      leave_entitlement_days: 20,
      leave_type: 'annual',
      applicable_to: 'full-time'
    }
  }
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var d,y,b;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    uiHint: 'card',
    data: {
      leave_entitlement_days: 20,
      leave_type: 'annual',
      applicable_to: 'full-time'
    }
  }
}`,...(b=(y=n.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};const x=["TextHint","TableHint","KeyValueTable","JsonFallback"];export{n as JsonFallback,t as KeyValueTable,a as TableHint,e as TextHint,x as __namedExportsOrder,f as default};
