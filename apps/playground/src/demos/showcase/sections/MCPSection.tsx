import { useState } from "react";
import {
  MCPToolCall,
  MCPResourceView,
  MCPServerStatus,
  MCPApprovalDialog,
} from "@surf-kit/agent";
import { Stack, Text, Separator, Button } from "@surf-kit/core";
import {
  mockMCPToolCall,
  mockMCPToolCallPending,
  mockMCPResource,
  mockMCPServer,
  mockMCPServerDisconnected,
} from "../showcase-data";
import { SectionWrapper } from "./SectionWrapper";

export function MCPSection() {
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [toolExpanded, setToolExpanded] = useState(false);

  return (
    <SectionWrapper title="MCP Components">
      <Stack gap={6}>
        {/* MCPToolCall */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            MCPToolCall — success &amp; pending
          </Text>
          <Stack gap={3}>
            <MCPToolCall
              call={mockMCPToolCall}
              isExpanded={toolExpanded}
              onToggleExpand={() => setToolExpanded((p) => !p)}
            />
            <MCPToolCall call={mockMCPToolCallPending} />
          </Stack>
        </div>

        <Separator />

        {/* MCPResourceView */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            MCPResourceView
          </Text>
          <MCPResourceView resource={mockMCPResource} />
        </div>

        <Separator />

        {/* MCPServerStatus */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            MCPServerStatus — connected &amp; disconnected
          </Text>
          <Stack gap={3}>
            <MCPServerStatus server={mockMCPServer} />
            <MCPServerStatus server={mockMCPServerDisconnected} />
          </Stack>
        </div>

        <Separator />

        {/* MCPApprovalDialog */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            MCPApprovalDialog
          </Text>
          <Button
            intent="secondary"
            size="sm"
            onPress={() => setApprovalOpen(true)}
          >
            Open Approval Dialog
          </Button>
          <MCPApprovalDialog
            call={mockMCPToolCallPending}
            riskLevel="medium"
            isOpen={approvalOpen}
            onApprove={() => {
              console.log("Approved");
              setApprovalOpen(false);
            }}
            onDeny={() => {
              console.log("Denied");
              setApprovalOpen(false);
            }}
          />
        </div>
      </Stack>
    </SectionWrapper>
  );
}
