import { useState, useRef } from "react";
import {
  Dialog,
  Popover,
  Tooltip,
  Sheet,
  DropdownMenu,
  HoverCard,
  Drawer,
  ContextMenu,
  Command,
  Button,
  Text,
  Stack,
  Separator,
} from "@surf-kit/core";
import { Settings, Copy, ExternalLink } from "@surf-kit/icons";
import { SectionWrapper } from "./SectionWrapper";

export function OverlaysSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);

  return (
    <SectionWrapper title="Overlays">
      <Stack gap={6}>
        {/* Dialog */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Dialog
          </Text>
          <Button intent="primary" size="sm" onPress={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
          <Dialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Confirm Action"
            footer={
              <Stack direction="horizontal" gap={2} justify="end">
                <Button intent="ghost" onPress={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button intent="primary" onPress={() => setDialogOpen(false)}>
                  Confirm
                </Button>
              </Stack>
            }
          >
            <Text>Are you sure you want to proceed? This action cannot be undone.</Text>
          </Dialog>
        </div>

        <Separator />

        {/* Popover */}
        <div className="relative">
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Popover
          </Text>
          <button
            ref={popoverRef}
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="px-3 py-1.5 rounded-lg text-sm border border-brand-gold/20 text-brand-cream/70 hover:bg-brand-gold/10 transition-colors"
          >
            Toggle Popover
          </button>
          <Popover
            triggerRef={popoverRef}
            isOpen={popoverOpen}
            onClose={() => setPopoverOpen(false)}
          >
            <div className="p-3">
              <Text size="sm" weight="semibold">
                Popover Content
              </Text>
              <Text size="xs" color="muted">
                This is positioned relative to the trigger.
              </Text>
            </div>
          </Popover>
        </div>

        <Separator />

        {/* Tooltip */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Tooltip
          </Text>
          <Stack direction="horizontal" gap={3}>
            <Tooltip content="Top tooltip" placement="top">
              <Button intent="secondary" size="sm">
                Top
              </Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <Button intent="secondary" size="sm">
                Bottom
              </Button>
            </Tooltip>
            <Tooltip content="Left tooltip" placement="left">
              <Button intent="secondary" size="sm">
                Left
              </Button>
            </Tooltip>
            <Tooltip content="Right tooltip" placement="right">
              <Button intent="secondary" size="sm">
                Right
              </Button>
            </Tooltip>
          </Stack>
        </div>

        <Separator />

        {/* Sheet */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Sheet
          </Text>
          <Button intent="secondary" size="sm" onPress={() => setSheetOpen(true)}>
            Open Sheet
          </Button>
          <Sheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Sheet Panel"
            side="right"
          >
            <div className="p-4">
              <Text>Sheet content — slides in from the right.</Text>
            </div>
          </Sheet>
        </div>

        <Separator />

        {/* DropdownMenu */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            DropdownMenu
          </Text>
          <DropdownMenu
            trigger={
              <Button intent="secondary" size="sm">
                Actions
              </Button>
            }
            items={[
              { key: "edit", label: "Edit" },
              { key: "duplicate", label: "Duplicate" },
              { key: "delete", label: "Delete" },
            ]}
            onAction={(key) => console.log("Action:", key)}
          />
        </div>

        <Separator />

        {/* HoverCard */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            HoverCard
          </Text>
          <HoverCard
            content={
              <div className="p-3 max-w-xs">
                <Text size="sm" weight="semibold">
                  Agent Profile
                </Text>
                <Text size="xs" color="muted">
                  Coordinator agent — handles routing and orchestration across the team.
                </Text>
              </div>
            }
          >
            <span className="text-sm text-brand-cyan underline underline-offset-2 cursor-pointer">
              Hover over me
            </span>
          </HoverCard>
        </div>

        <Separator />

        {/* Drawer */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Drawer
          </Text>
          <Button intent="secondary" size="sm" onPress={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Drawer"
            side="bottom"
          >
            <div className="p-4">
              <Text>Drawer content — slides up from the bottom.</Text>
            </div>
          </Drawer>
        </div>

        <Separator />

        {/* ContextMenu */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            ContextMenu (right-click the box)
          </Text>
          <ContextMenu
            items={[
              { key: "copy", label: "Copy", icon: <Copy size={14} /> },
              { key: "open", label: "Open in new tab", icon: <ExternalLink size={14} /> },
              { key: "settings", label: "Settings", icon: <Settings size={14} /> },
              { key: "delete", label: "Delete", isDanger: true },
            ]}
            onAction={(key) => console.log("Context:", key)}
          >
            <div className="p-6 border border-dashed border-brand-gold/30 rounded-xl text-center">
              <Text size="sm" color="muted">
                Right-click here
              </Text>
            </div>
          </ContextMenu>
        </div>

        <Separator />

        {/* Command palette */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Command Palette
          </Text>
          <Button
            intent="secondary"
            size="sm"
            onPress={() => setCommandOpen(true)}
          >
            Open Command Palette
          </Button>
          <Command
            isOpen={commandOpen}
            onClose={() => setCommandOpen(false)}
            onSelect={(value) => {
              console.log("Command:", value);
              setCommandOpen(false);
            }}
            placeholder="Search commands..."
          >
            <Command.Group heading="Navigation">
              <Command.Item value="home">Home</Command.Item>
              <Command.Item value="settings" icon={<Settings size={14} />}>
                Settings
              </Command.Item>
            </Command.Group>
            <Command.Group heading="Actions">
              <Command.Item value="copy" icon={<Copy size={14} />} shortcut="⌘C">
                Copy
              </Command.Item>
              <Command.Item
                value="export"
                icon={<ExternalLink size={14} />}
              >
                Export
              </Command.Item>
            </Command.Group>
          </Command>
        </div>
      </Stack>
    </SectionWrapper>
  );
}
