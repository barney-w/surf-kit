import { useState } from "react";
import {
  Button,
  IconButton,
  Toggle,
  ToggleGroup,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  SearchInput,
  Slider,
  Calendar,
  Stack,
  Text,
  Separator,
} from "@surf-kit/core";
import { Settings, Copy, Check } from "@surf-kit/icons";
import { SectionWrapper } from "./SectionWrapper";

export function ButtonsInputsSection() {
  const [switchOn, setSwitchOn] = useState(false);
  const [checkboxOn, setCheckboxOn] = useState(true);
  const [radioValue, setRadioValue] = useState("light");
  const [selectKey, setSelectKey] = useState("pro");
  const [searchValue, setSearchValue] = useState("");
  const [sliderValue, setSliderValue] = useState(65);
  const [toggleOn, setToggleOn] = useState(false);

  return (
    <SectionWrapper title="Buttons & Inputs">
      <Stack gap={6}>
        {/* Buttons */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Button — variants &amp; sizes
          </Text>
          <Stack direction="horizontal" gap={2} align="center">
            <Button intent="primary" size="sm">
              Primary SM
            </Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="ghost" size="lg">
              Ghost LG
            </Button>
            <Button intent="danger" size="sm">
              Danger
            </Button>
            <Button isDisabled>Disabled</Button>
          </Stack>
        </div>

        {/* IconButton */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            IconButton
          </Text>
          <Stack direction="horizontal" gap={2} align="center">
            <IconButton aria-label="Settings" intent="primary">
              <Settings size={16} />
            </IconButton>
            <IconButton aria-label="Copy" intent="secondary">
              <Copy size={16} />
            </IconButton>
            <IconButton aria-label="Confirm" intent="ghost">
              <Check size={16} />
            </IconButton>
          </Stack>
        </div>

        {/* Toggle & ToggleGroup */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Toggle &amp; ToggleGroup
          </Text>
          <Stack direction="horizontal" gap={3} align="center">
            <Toggle
              isSelected={toggleOn}
              onChange={setToggleOn}
              aria-label="Bold"
              size="sm"
            >
              B
            </Toggle>
            <ToggleGroup type="single" defaultValue="left">
              <Toggle value="left" aria-label="Align left" size="sm">
                L
              </Toggle>
              <Toggle value="center" aria-label="Align center" size="sm">
                C
              </Toggle>
              <Toggle value="right" aria-label="Align right" size="sm">
                R
              </Toggle>
            </ToggleGroup>
          </Stack>
        </div>

        <Separator />

        {/* Text Inputs */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            TextInput &amp; TextArea
          </Text>
          <Stack gap={3}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
            />
            <TextInput
              label="With error"
              errorMessage="This field is required"
              value=""
            />
            <TextArea
              label="Notes"
              placeholder="Add any additional notes..."
              rows={2}
            />
          </Stack>
        </div>

        {/* Select */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Select
          </Text>
          <Select
            label="Plan"
            items={[
              { key: "free", label: "Free" },
              { key: "pro", label: "Pro" },
              { key: "enterprise", label: "Enterprise" },
            ]}
            selectedKey={selectKey}
            onSelectionChange={setSelectKey}
          />
        </div>

        <Separator />

        {/* Checkbox, RadioGroup, Switch */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Checkbox, RadioGroup &amp; Switch
          </Text>
          <Stack gap={3}>
            <Checkbox
              label="Accept terms and conditions"
              isSelected={checkboxOn}
              onChange={setCheckboxOn}
            />
            <RadioGroup
              label="Color mode"
              items={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "brand", label: "Brand" },
              ]}
              value={radioValue}
              onChange={setRadioValue}
              orientation="horizontal"
            />
            <Switch
              label="Enable notifications"
              isSelected={switchOn}
              onChange={setSwitchOn}
            />
          </Stack>
        </div>

        <Separator />

        {/* SearchInput */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            SearchInput
          </Text>
          <SearchInput
            label="Search components"
            placeholder="Search..."
            value={searchValue}
            onChange={setSearchValue}
            onClear={() => setSearchValue("")}
          />
        </div>

        {/* Slider */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Slider
          </Text>
          <Slider
            label="Confidence threshold"
            minValue={0}
            maxValue={100}
            value={sliderValue}
            onChange={setSliderValue}
          />
        </div>

        {/* Calendar */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Calendar
          </Text>
          <Calendar />
        </div>
      </Stack>
    </SectionWrapper>
  );
}
