import { useState } from "react";
import {
  Badge,
  Spinner,
  Skeleton,
  Alert,
  ProgressBar,
  Avatar,
  AvatarRings,
  AvatarGenerationLoader,
  ToastProvider,
  Stack,
  Text,
  Separator,
  Button,
} from "@surf-kit/core";
import { SectionWrapper } from "./SectionWrapper";
import { ToastTrigger } from "./ToastTrigger";

export function FeedbackSection() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <SectionWrapper title="Feedback">
      <Stack gap={6}>
        {/* Badges */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Badge — all intents
          </Text>
          <Stack direction="horizontal" gap={2} align="center">
            <Badge intent="default">Default</Badge>
            <Badge intent="success">Success</Badge>
            <Badge intent="warning">Warning</Badge>
            <Badge intent="error">Error</Badge>
            <Badge intent="info">Info</Badge>
            <Badge intent="founding-member" size="sm">
              Founding
            </Badge>
          </Stack>
        </div>

        <Separator />

        {/* Spinner */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Spinner — sizes &amp; variants
          </Text>
          <Stack direction="horizontal" gap={4} align="center">
            <Spinner size="sm" label="Small" />
            <Spinner size="md" label="Medium" />
            <Spinner size="lg" label="Large" />
            <Spinner size="md" variant="dual-ring" label="Dual ring" />
          </Stack>
        </div>

        <Separator />

        {/* Skeleton */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Skeleton — variants
          </Text>
          <Stack gap={2}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Stack direction="horizontal" gap={3} align="center">
              <Skeleton variant="circle" width={40} height={40} />
              <Stack gap={1} className="flex-1">
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="30%" />
              </Stack>
            </Stack>
            <Skeleton variant="rect" width="100%" height={80} />
          </Stack>
        </div>

        <Separator />

        {/* Alert */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Alert — all intents
          </Text>
          <Stack gap={2}>
            <Alert intent="info" title="Info">
              This is an informational message.
            </Alert>
            <Alert intent="success" title="Success">
              Operation completed successfully.
            </Alert>
            <Alert intent="warning" title="Warning">
              Please review before continuing.
            </Alert>
            {showAlert && (
              <Alert
                intent="error"
                title="Error"
                onDismiss={() => setShowAlert(false)}
              >
                Something went wrong. Click the dismiss button to close.
              </Alert>
            )}
            {!showAlert && (
              <Button
                intent="ghost"
                size="sm"
                onPress={() => setShowAlert(true)}
              >
                Show error alert again
              </Button>
            )}
          </Stack>
        </div>

        <Separator />

        {/* ProgressBar */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            ProgressBar
          </Text>
          <Stack gap={2}>
            <ProgressBar value={25} label="Upload progress" size="sm" />
            <ProgressBar value={65} label="Processing" />
            <ProgressBar value={100} label="Complete" />
          </Stack>
        </div>

        <Separator />

        {/* Avatar */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Avatar — sizes
          </Text>
          <Stack direction="horizontal" gap={3} align="center">
            <Avatar name="Alice" size="xs" />
            <Avatar name="Bob" size="sm" />
            <Avatar name="Carol" size="md" />
            <Avatar name="Dave" size="lg" />
            <Avatar name="Eve" size="xl" />
          </Stack>
        </div>

        {/* AvatarRings & AvatarGenerationLoader */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            AvatarRings &amp; AvatarGenerationLoader
          </Text>
          <Stack direction="horizontal" gap={6} align="center">
            <AvatarRings />
            <AvatarGenerationLoader
              primaryText="Creating avatar..."
              secondaryText="Almost done"
            />
          </Stack>
        </div>

        <Separator />

        {/* Toast */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Toast (click to trigger)
          </Text>
          <ToastProvider>
            <ToastTrigger />
          </ToastProvider>
        </div>
      </Stack>
    </SectionWrapper>
  );
}
