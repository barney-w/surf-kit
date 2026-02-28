import { Button, Stack, useToast } from "@surf-kit/core";

export function ToastTrigger() {
  const toast = useToast();

  return (
    <Stack direction="horizontal" gap={2}>
      <Button
        intent="primary"
        size="sm"
        onPress={() => toast({ message: "Action completed!", intent: "success" })}
      >
        Success toast
      </Button>
      <Button
        intent="secondary"
        size="sm"
        onPress={() => toast({ message: "Something to note.", intent: "info" })}
      >
        Info toast
      </Button>
      <Button
        intent="ghost"
        size="sm"
        onPress={() =>
          toast({ message: "Check your settings.", intent: "warning" })
        }
      >
        Warning toast
      </Button>
      <Button
        intent="danger"
        size="sm"
        onPress={() =>
          toast({ message: "Operation failed!", intent: "error" })
        }
      >
        Error toast
      </Button>
    </Stack>
  );
}
