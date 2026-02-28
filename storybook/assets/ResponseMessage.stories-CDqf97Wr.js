import{R as d}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const v={title:"Agent/ResponseMessage",component:d},e={args:{content:"This is a plain text response from the agent."}},t={args:{content:`# Annual Leave Policy

Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests should be submitted **at least two weeks** in advance

> Note: Leave accrues progressively during each year of service.

For more details, visit the [HR Portal](https://example.com).`}},a={args:{content:`Here is an example configuration:

\`\`\`json
{
  "leave_type": "annual",
  "days_entitled": 20,
  "applicable_to": "full-time"
}
\`\`\`

Apply these settings in your HR profile.`}};var n,s,r;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    content: 'This is a plain text response from the agent.'
  }
}`,...(r=(s=e.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};var o,i,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    content: \`# Annual Leave Policy

Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests should be submitted **at least two weeks** in advance

> Note: Leave accrues progressively during each year of service.

For more details, visit the [HR Portal](https://example.com).\`
  }
}`,...(l=(i=t.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,c,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    content: \`Here is an example configuration:

\\\`\\\`\\\`json
{
  "leave_type": "annual",
  "days_entitled": 20,
  "applicable_to": "full-time"
}
\\\`\\\`\\\`

Apply these settings in your HR profile.\`
  }
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const x=["PlainText","WithMarkdown","WithCodeBlock"];export{e as PlainText,a as WithCodeBlock,t as WithMarkdown,x as __namedExportsOrder,v as default};
