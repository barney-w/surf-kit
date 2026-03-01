import{j as e}from"./iframe-BsSRimq6.js";import{t as m,e as u}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";var h=u("",{variants:{size:{xs:"text-xs",sm:"text-sm",base:"text-base",lg:"text-lg",xl:"text-xl","2xl":"text-2xl"},weight:{normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold"},color:{primary:"text-text-primary",secondary:"text-text-secondary",muted:"text-text-muted",inverse:"text-white",accent:"text-accent",error:"text-status-error",success:"text-status-success"}},defaultVariants:{size:"base",weight:"normal",color:"primary"}});function i({as:t,size:d,weight:n,color:s,className:a,...p}){const v=t||"p";return e.jsx(v,{className:m(h({size:d,weight:n,color:s}),a),...p})}var b=u("flex",{variants:{direction:{vertical:"flex-col",horizontal:"flex-row"},align:{start:"items-start",center:"items-center",end:"items-end",stretch:"items-stretch",baseline:"items-baseline"},justify:{start:"justify-start",center:"justify-center",end:"justify-end",between:"justify-between",around:"justify-around",evenly:"justify-evenly"},gap:{0:"gap-0",1:"gap-1",2:"gap-2",3:"gap-3",4:"gap-4",5:"gap-5",6:"gap-6",8:"gap-8",10:"gap-10",12:"gap-12"}},defaultVariants:{direction:"vertical",gap:3}});function r({direction:t,align:d,justify:n,gap:s,className:a,...p}){return e.jsx("div",{className:m(b({direction:t,align:d,justify:n,gap:s}),a),...p})}function j(t){if(t===void 0)return"grid-cols-1";if(typeof t=="number")return`grid-cols-${t}`;const d=[];return t.default&&d.push(`grid-cols-${t.default}`),t.sm&&d.push(`sm:grid-cols-${t.sm}`),t.md&&d.push(`md:grid-cols-${t.md}`),t.lg&&d.push(`lg:grid-cols-${t.lg}`),t.xl&&d.push(`xl:grid-cols-${t.xl}`),d.join(" ")||"grid-cols-1"}function y(t){return t===void 0?"gap-4":`gap-${t}`}function f({columns:t,gap:d,className:n,children:s,...a}){return e.jsx("div",{className:m("grid",j(t),y(d),n),...a,children:s})}const S={title:"Core/Primitives"},c={render:()=>e.jsxs(r,{gap:2,children:[e.jsx(i,{size:"xs",children:"Extra small text (xs)"}),e.jsx(i,{size:"sm",children:"Small text (sm)"}),e.jsx(i,{size:"base",children:"Base text (base)"}),e.jsx(i,{size:"lg",children:"Large text (lg)"}),e.jsx(i,{size:"xl",children:"Extra large text (xl)"}),e.jsx(i,{size:"2xl",children:"2XL text (2xl)"})]})},l={render:()=>e.jsxs(r,{gap:2,children:[e.jsx(i,{weight:"normal",children:"Normal weight"}),e.jsx(i,{weight:"medium",children:"Medium weight"}),e.jsx(i,{weight:"semibold",children:"Semibold weight"}),e.jsx(i,{weight:"bold",children:"Bold weight"})]})},x={render:()=>e.jsxs(r,{gap:2,children:[e.jsx(i,{color:"primary",children:"Primary color"}),e.jsx(i,{color:"secondary",children:"Secondary color"}),e.jsx(i,{color:"muted",children:"Muted color"}),e.jsx(i,{color:"accent",children:"Accent color"}),e.jsx(i,{color:"error",children:"Error color"}),e.jsx(i,{color:"success",children:"Success color"})]})},o={render:()=>e.jsxs(r,{gap:6,children:[e.jsxs("div",{children:[e.jsx(i,{weight:"semibold",size:"sm",children:"Vertical (default)"}),e.jsxs(r,{direction:"vertical",gap:2,children:[e.jsx("div",{style:{padding:"8px 16px",background:"#e0f5f7"},children:"Item 1"}),e.jsx("div",{style:{padding:"8px 16px",background:"#e0f5f7"},children:"Item 2"}),e.jsx("div",{style:{padding:"8px 16px",background:"#e0f5f7"},children:"Item 3"})]})]}),e.jsxs("div",{children:[e.jsx(i,{weight:"semibold",size:"sm",children:"Horizontal"}),e.jsxs(r,{direction:"horizontal",gap:2,children:[e.jsx("div",{style:{padding:"8px 16px",background:"#e0f5f7"},children:"Item 1"}),e.jsx("div",{style:{padding:"8px 16px",background:"#e0f5f7"},children:"Item 2"}),e.jsx("div",{style:{padding:"8px 16px",background:"#e0f5f7"},children:"Item 3"})]})]})]})},g={render:()=>e.jsxs(r,{gap:6,children:[e.jsxs("div",{children:[e.jsx(i,{weight:"semibold",size:"sm",children:"2 Columns"}),e.jsxs(f,{columns:2,gap:4,children:[e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"1"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"2"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"3"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"4"})]})]}),e.jsxs("div",{children:[e.jsx(i,{weight:"semibold",size:"sm",children:"3 Columns"}),e.jsxs(f,{columns:3,gap:4,children:[e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"1"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"2"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"3"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"4"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"5"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"6"})]})]}),e.jsxs("div",{children:[e.jsx(i,{weight:"semibold",size:"sm",children:"4 Columns"}),e.jsxs(f,{columns:4,gap:4,children:[e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"1"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"2"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"3"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"4"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"5"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"6"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"7"}),e.jsx("div",{style:{padding:"16px",background:"#e0f5f7",textAlign:"center"},children:"8"})]})]})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={2}>
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="base">Base text (base)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2XL text (2xl)</Text>
    </Stack>
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={2}>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </Stack>
}`,...l.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={2}>
      <Text color="primary">Primary color</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="accent">Accent color</Text>
      <Text color="error">Error color</Text>
      <Text color="success">Success color</Text>
    </Stack>
}`,...x.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={6}>
      <div>
        <Text weight="semibold" size="sm">Vertical (default)</Text>
        <Stack direction="vertical" gap={2}>
          <div style={{
          padding: '8px 16px',
          background: '#e0f5f7'
        }}>Item 1</div>
          <div style={{
          padding: '8px 16px',
          background: '#e0f5f7'
        }}>Item 2</div>
          <div style={{
          padding: '8px 16px',
          background: '#e0f5f7'
        }}>Item 3</div>
        </Stack>
      </div>
      <div>
        <Text weight="semibold" size="sm">Horizontal</Text>
        <Stack direction="horizontal" gap={2}>
          <div style={{
          padding: '8px 16px',
          background: '#e0f5f7'
        }}>Item 1</div>
          <div style={{
          padding: '8px 16px',
          background: '#e0f5f7'
        }}>Item 2</div>
          <div style={{
          padding: '8px 16px',
          background: '#e0f5f7'
        }}>Item 3</div>
        </Stack>
      </div>
    </Stack>
}`,...o.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Stack gap={6}>
      <div>
        <Text weight="semibold" size="sm">2 Columns</Text>
        <Grid columns={2} gap={4}>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>1</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>2</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>3</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>4</div>
        </Grid>
      </div>
      <div>
        <Text weight="semibold" size="sm">3 Columns</Text>
        <Grid columns={3} gap={4}>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>1</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>2</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>3</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>4</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>5</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>6</div>
        </Grid>
      </div>
      <div>
        <Text weight="semibold" size="sm">4 Columns</Text>
        <Grid columns={4} gap={4}>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>1</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>2</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>3</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>4</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>5</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>6</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>7</div>
          <div style={{
          padding: '16px',
          background: '#e0f5f7',
          textAlign: 'center'
        }}>8</div>
        </Grid>
      </div>
    </Stack>
}`,...g.parameters?.docs?.source}}};const z=["TextSizes","TextWeights","TextColors","StackDirections","GridColumns"];export{g as GridColumns,o as StackDirections,x as TextColors,c as TextSizes,l as TextWeights,z as __namedExportsOrder,S as default};
