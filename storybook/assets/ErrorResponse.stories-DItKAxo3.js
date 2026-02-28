import{E as p}from"./index-kVgamDB_.js";import"./index-_nN3MFVB.js";import"./iframe-DfQrMS3t.js";import"./preload-helper-C1FmrZbK.js";import"./index-ByQMLxTz.js";const b={title:"Agent/ErrorResponse",component:p},e={args:{error:{code:"NETWORK_ERROR",message:"Failed to connect to the server. Please check your network connection.",retryable:!0},onRetry:()=>{}}},r={args:{error:{code:"API_ERROR",message:"Invalid API key. Please contact your administrator.",retryable:!1}}},o={args:{error:{code:"TIMEOUT",message:"The request timed out. The server may be experiencing high load.",retryable:!0},onRetry:()=>{}}};var t,a,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    error: {
      code: 'NETWORK_ERROR',
      message: 'Failed to connect to the server. Please check your network connection.',
      retryable: true
    },
    onRetry: () => {}
  }
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var n,c,m;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    error: {
      code: 'API_ERROR',
      message: 'Invalid API key. Please contact your administrator.',
      retryable: false
    }
  }
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var i,d,l;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    error: {
      code: 'TIMEOUT',
      message: 'The request timed out. The server may be experiencing high load.',
      retryable: true
    },
    onRetry: () => {}
  }
}`,...(l=(d=o.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const h=["RetryableError","NonRetryableError","TimeoutError"];export{r as NonRetryableError,e as RetryableError,o as TimeoutError,h as __namedExportsOrder,b as default};
