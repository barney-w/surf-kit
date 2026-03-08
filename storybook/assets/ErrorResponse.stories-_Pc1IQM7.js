import{E as t}from"./index-DD3Tavw2.js";import"./chunk-3ACPMC24-sN6mVosg.js";import"./iframe-Cwa6OL94.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B9YAxe-O.js";const i={title:"Agent/ErrorResponse",component:t},e={args:{error:{code:"NETWORK_ERROR",message:"Failed to connect to the server. Please check your network connection.",retryable:!0},onRetry:()=>{}}},r={args:{error:{code:"API_ERROR",message:"Invalid API key. Please contact your administrator.",retryable:!1}}},o={args:{error:{code:"TIMEOUT",message:"The request timed out. The server may be experiencing high load.",retryable:!0},onRetry:()=>{}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    error: {
      code: 'NETWORK_ERROR',
      message: 'Failed to connect to the server. Please check your network connection.',
      retryable: true
    },
    onRetry: () => {}
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    error: {
      code: 'API_ERROR',
      message: 'Invalid API key. Please contact your administrator.',
      retryable: false
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    error: {
      code: 'TIMEOUT',
      message: 'The request timed out. The server may be experiencing high load.',
      retryable: true
    },
    onRetry: () => {}
  }
}`,...o.parameters?.docs?.source}}};const d=["RetryableError","NonRetryableError","TimeoutError"];export{r as NonRetryableError,e as RetryableError,o as TimeoutError,d as __namedExportsOrder,i as default};
