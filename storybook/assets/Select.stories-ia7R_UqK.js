import{y as o}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./iframe-BsSRimq6.js";import"./index-asa8OAme.js";import"./preload-helper-PPVm8Dsz.js";const s=[{key:"cat",label:"Cat"},{key:"dog",label:"Dog"},{key:"fish",label:"Fish"},{key:"bird",label:"Bird"}],p={title:"Core/Select",component:o,argTypes:{label:{control:"text"},placeholder:{control:"text"},isDisabled:{control:"boolean"},errorMessage:{control:"text"}}},e={args:{label:"Favorite pet",items:s}},r={args:{label:"Favorite pet",items:s,placeholder:"Choose a pet..."}},a={args:{label:"Favorite pet",items:s,isDisabled:!0}},t={args:{label:"Favorite pet",items:s,errorMessage:"Please select a pet."}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items,
    placeholder: 'Choose a pet...'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items,
    isDisabled: true
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Favorite pet',
    items,
    errorMessage: 'Please select a pet.'
  }
}`,...t.parameters?.docs?.source}}};const m=["Default","WithPlaceholder","Disabled","WithError"];export{e as Default,a as Disabled,t as WithError,r as WithPlaceholder,m as __namedExportsOrder,p as default};
