import{j as e,r as l}from"./iframe-BsSRimq6.js";import{K as t}from"./index-DS2v21UH.js";import"./preload-helper-PPVm8Dsz.js";import"./chunk-4KH4NCSB-CDC86_-d.js";import"./index-asa8OAme.js";const y={title:"Agent/TypewriterText",component:t},r="The quick brown fox jumps over the lazy dog. This sentence demonstrates the typewriter animation effect.",s={render:()=>e.jsx(t,{text:r})},o={render:()=>e.jsx(t,{text:r,speed:10})},a={render:()=>e.jsx(t,{text:r,speed:80})},n={render:()=>e.jsx(t,{text:r,delay:1500})},p={render:()=>e.jsx(t,{text:r,showCursor:!1})},c={render:()=>{const[m,d]=l.useState(!1);return e.jsxs("div",{children:[e.jsx(t,{text:"This text will trigger a callback when done.",speed:20,onComplete:()=>d(!0)}),m&&e.jsx("p",{className:"mt-4 text-sm text-text-secondary",children:"Animation complete!"})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <TypewriterText text={sampleText} />
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <TypewriterText text={sampleText} speed={10} />
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <TypewriterText text={sampleText} speed={80} />
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <TypewriterText text={sampleText} delay={1500} />
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <TypewriterText text={sampleText} showCursor={false} />
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [completed, setCompleted] = useState(false);
    return <div>
        <TypewriterText text="This text will trigger a callback when done." speed={20} onComplete={() => setCompleted(true)} />
        {completed && <p className="mt-4 text-sm text-text-secondary">
            Animation complete!
          </p>}
      </div>;
  }
}`,...c.parameters?.docs?.source}}};const h=["Default","Fast","Slow","WithDelay","NoCursor","OnComplete"];export{s as Default,o as Fast,p as NoCursor,c as OnComplete,a as Slow,n as WithDelay,h as __namedExportsOrder,y as default};
