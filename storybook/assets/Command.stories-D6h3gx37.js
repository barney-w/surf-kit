import{r as m,j as e}from"./iframe-BsSRimq6.js";import{o as t}from"./chunk-4KH4NCSB-CDC86_-d.js";import"./preload-helper-PPVm8Dsz.js";import"./index-asa8OAme.js";const p={title:"Core/Overlay/Command",component:t},s={render:()=>{const[r,o]=m.useState(!0);return e.jsxs("div",{children:[e.jsx("button",{onClick:()=>o(!0),children:"Open Command Palette"}),e.jsxs(t,{isOpen:r,onClose:()=>o(!1),onSelect:n=>{console.log("Selected:",n),o(!1)},children:[e.jsxs(t.Group,{heading:"File",children:[e.jsx(t.Item,{value:"new-file",shortcut:"⌘N",children:"New File"}),e.jsx(t.Item,{value:"open-file",shortcut:"⌘O",children:"Open File"}),e.jsx(t.Item,{value:"save",shortcut:"⌘S",children:"Save"})]}),e.jsxs(t.Group,{heading:"Edit",children:[e.jsx(t.Item,{value:"undo",shortcut:"⌘Z",children:"Undo"}),e.jsx(t.Item,{value:"redo",shortcut:"⌘⇧Z",children:"Redo"})]})]})]})}},a={render:()=>{const[r,o]=m.useState(!0),n=()=>e.jsx("svg",{viewBox:"0 0 16 16",fill:"currentColor",className:"h-4 w-4",children:e.jsx("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z"})});return e.jsxs("div",{children:[e.jsx("button",{onClick:()=>o(!0),children:"Open Command Palette"}),e.jsx(t,{isOpen:r,onClose:()=>o(!1),onSelect:l=>{console.log("Selected:",l),o(!1)},children:e.jsxs(t.Group,{heading:"Actions",children:[e.jsx(t.Item,{value:"search",icon:e.jsx(n,{}),shortcut:"⌘K",children:"Search"}),e.jsx(t.Item,{value:"settings",icon:e.jsx(n,{}),shortcut:"⌘,",children:"Settings"}),e.jsx(t.Item,{value:"disabled-item",icon:e.jsx(n,{}),isDisabled:!0,children:"Disabled Action"})]})})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return <div>
        <button onClick={() => setIsOpen(true)}>Open Command Palette</button>
        <Command isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={v => {
        console.log('Selected:', v);
        setIsOpen(false);
      }}>
          <Command.Group heading="File">
            <Command.Item value="new-file" shortcut="⌘N">
              New File
            </Command.Item>
            <Command.Item value="open-file" shortcut="⌘O">
              Open File
            </Command.Item>
            <Command.Item value="save" shortcut="⌘S">
              Save
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Edit">
            <Command.Item value="undo" shortcut="⌘Z">
              Undo
            </Command.Item>
            <Command.Item value="redo" shortcut="⌘⇧Z">
              Redo
            </Command.Item>
          </Command.Group>
        </Command>
      </div>;
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const Icon = () => <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" />
      </svg>;
    return <div>
        <button onClick={() => setIsOpen(true)}>Open Command Palette</button>
        <Command isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={v => {
        console.log('Selected:', v);
        setIsOpen(false);
      }}>
          <Command.Group heading="Actions">
            <Command.Item value="search" icon={<Icon />} shortcut="⌘K">
              Search
            </Command.Item>
            <Command.Item value="settings" icon={<Icon />} shortcut="⌘,">
              Settings
            </Command.Item>
            <Command.Item value="disabled-item" icon={<Icon />} isDisabled>
              Disabled Action
            </Command.Item>
          </Command.Group>
        </Command>
      </div>;
  }
}`,...a.parameters?.docs?.source}}};const h=["Default","WithIcons"];export{s as Default,a as WithIcons,h as __namedExportsOrder,p as default};
