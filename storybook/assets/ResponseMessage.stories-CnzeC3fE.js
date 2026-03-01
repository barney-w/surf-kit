import{R as n}from"./index-DNQVFfJz.js";import"./chunk-4KH4NCSB-B5sTboAg.js";import"./iframe-C2OKo2S4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Dc2MNpMC.js";const p={title:"Agent/ResponseMessage",component:n},e={args:{content:"This is a plain text response from the agent."}},t={args:{content:`# Annual Leave Policy

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

Apply these settings in your HR profile.`}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    content: 'This is a plain text response from the agent.'
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    content: \`# Annual Leave Policy

Based on the **Enterprise Agreement 2024**, all full-time employees are entitled to:

- **Four weeks** (20 days) of paid annual leave per year
- Pro-rata entitlements for part-time employees
- Leave requests should be submitted **at least two weeks** in advance

> Note: Leave accrues progressively during each year of service.

For more details, visit the [HR Portal](https://example.com).\`
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const c=["PlainText","WithMarkdown","WithCodeBlock"];export{e as PlainText,a as WithCodeBlock,t as WithMarkdown,c as __namedExportsOrder,p as default};
