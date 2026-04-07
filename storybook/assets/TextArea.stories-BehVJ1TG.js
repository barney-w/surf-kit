import{j as u}from"./iframe-BVUpK0oZ.js";import{c as p}from"./chunk-CFAYAL3Z-Dz7QTUR3.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C12Xz2ZM.js";const y={title:"Core/TextArea",component:p,argTypes:{label:{control:"text"},description:{control:"text"},errorMessage:{control:"text"},placeholder:{control:"text"},value:{control:"text"},onChange:{action:"onChange"},isDisabled:{control:"boolean"},isRequired:{control:"boolean"},rows:{control:{type:"number",min:1,max:12,step:1}},className:{control:"text"}}},r={args:{label:"Message",placeholder:"Type your message…"}},s={args:{label:"Message",placeholder:"Type your message…",description:"Add any extra context you think is helpful."}},o={args:{label:"Message",placeholder:"Type your message…",errorMessage:"Message is required."}},t={args:{label:"Message",placeholder:"Type your message…",isDisabled:!0}},l={args:{label:"Message",placeholder:"Type your message…",isRequired:!0}},n={args:{label:"Detailed feedback",placeholder:"Write a few paragraphs…",rows:6}},e={args:{label:"Notes",placeholder:"Type here…",value:"Initial value you can edit",rows:4},render:a=>{const[i,c]=React.useState(a.value??"");return React.useEffect(()=>{c(a.value??"")},[a.value]),u.jsx(p,{...a,value:i,onChange:c})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Type your message…'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    description: 'Add any extra context you think is helpful.'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    errorMessage: 'Message is required.'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    isDisabled: true
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Type your message…',
    isRequired: true
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Detailed feedback',
    placeholder: 'Write a few paragraphs…',
    rows: 6
  }
}`,...n.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Notes',
    placeholder: 'Type here…',
    value: 'Initial value you can edit',
    rows: 4
  },
  render: args => {
    const [val, setVal] = React.useState(args.value ?? '');

    // keep local state in sync if someone edits args in the Controls panel
    React.useEffect(() => {
      setVal(args.value ?? '');
    }, [args.value]);
    return <TextArea {...args} value={val} onChange={setVal} />;
  }
}`,...e.parameters?.docs?.source},description:{story:"Controlled example: interactive typing while using `value` prop.\nThis avoids the “can’t type” issue you get when `value` is set but not updated.",...e.parameters?.docs?.description}}};const b=["Default","WithDescription","WithError","Disabled","Required","MoreRows","ControlledValue"];export{e as ControlledValue,r as Default,t as Disabled,n as MoreRows,l as Required,s as WithDescription,o as WithError,b as __namedExportsOrder,y as default};
