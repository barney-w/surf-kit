import {
  Accordion,
  Button,
  Card,
  Carousel,
  Collapsible,
  DataList,
  Separator,
  type SortDescriptor,
  Stack,
  Table,
  Text,
} from '@surf-kit/core'
import { useState } from 'react'
import { accordionItems, dataListItems, tableColumns, tableRows } from '../showcase-data'
import { SectionWrapper } from './SectionWrapper'

export function DataDisplaySection() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })

  const sortedRows = [...tableRows].sort((a, b) => {
    const col = sortDescriptor.column as keyof (typeof tableRows)[0]
    const aVal = String(a[col])
    const bVal = String(b[col])
    const cmp = aVal.localeCompare(bVal)
    return sortDescriptor.direction === 'ascending' ? cmp : -cmp
  })

  return (
    <SectionWrapper title="Data Display">
      <Stack gap={6}>
        {/* Table */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Table (sortable)
          </Text>
          <Table
            columns={tableColumns}
            rows={sortedRows}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          />
        </div>

        <Separator />

        {/* DataList */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            DataList
          </Text>
          <DataList items={dataListItems} />
        </div>

        <Separator />

        {/* Card */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Card — variants
          </Text>
          <Stack direction="horizontal" gap={3}>
            <Card variant="default" className="flex-1">
              <Card.Header>
                <Text weight="semibold" size="sm">
                  Default
                </Text>
              </Card.Header>
              <Card.Body>
                <Text size="xs" color="muted">
                  A standard card.
                </Text>
              </Card.Body>
            </Card>
            <Card variant="elevated" className="flex-1">
              <Card.Header>
                <Text weight="semibold" size="sm">
                  Elevated
                </Text>
              </Card.Header>
              <Card.Body>
                <Text size="xs" color="muted">
                  With shadow.
                </Text>
              </Card.Body>
            </Card>
            <Card variant="outlined" className="flex-1">
              <Card.Header>
                <Text weight="semibold" size="sm">
                  Outlined
                </Text>
              </Card.Header>
              <Card.Body>
                <Text size="xs" color="muted">
                  With border.
                </Text>
              </Card.Body>
            </Card>
          </Stack>
        </div>

        <Separator />

        {/* Accordion */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Accordion
          </Text>
          <Accordion items={accordionItems} />
        </div>

        <Separator />

        {/* Collapsible */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Collapsible
          </Text>
          <Collapsible>
            <Collapsible.Trigger>
              <Button intent="ghost" size="sm">
                Toggle details
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div className="mt-2 p-3 rounded-lg border border-brand-gold/15">
                <Text size="sm">
                  This content can be toggled open and closed. It supports controlled and
                  uncontrolled modes.
                </Text>
              </div>
            </Collapsible.Content>
          </Collapsible>
        </div>

        <Separator />

        {/* Carousel */}
        <div>
          <Text size="sm" color="muted" weight="semibold" className="mb-2">
            Carousel
          </Text>
          <Carousel showDots loop>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex items-center justify-center h-32 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20"
              >
                <Text size="lg" weight="bold">
                  Slide {n}
                </Text>
              </div>
            ))}
          </Carousel>
        </div>
      </Stack>
    </SectionWrapper>
  )
}
