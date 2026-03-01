import { Grid, Separator, Text } from '@surf-kit/core'
import {
  AgentCoordinator,
  AgentFacilities,
  AgentFinance,
  AgentGovernance,
  AgentHr,
  AgentIt,
  AlertTriangle,
  Building,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ConfidenceHigh,
  ConfidenceLow,
  ConfidenceMedium,
  Copy,
  ExternalLink,
  Info,
  Loader2,
  Menu,
  MessageSquare,
  Monitor,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Settings,
  Shield,
  ThumbsDown,
  ThumbsUp,
  User,
  Users,
  VerificationFailed,
  VerificationFlagged,
  VerificationPassed,
  X,
} from '@surf-kit/icons'
import { SectionWrapper } from './SectionWrapper'

const lucideIcons = [
  { name: 'Search', Icon: Search },
  { name: 'X', Icon: X },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'ChevronUp', Icon: ChevronUp },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'Copy', Icon: Copy },
  { name: 'Check', Icon: Check },
  { name: 'AlertTriangle', Icon: AlertTriangle },
  { name: 'Info', Icon: Info },
  { name: 'ExternalLink', Icon: ExternalLink },
  { name: 'ThumbsUp', Icon: ThumbsUp },
  { name: 'ThumbsDown', Icon: ThumbsDown },
  { name: 'MessageSquare', Icon: MessageSquare },
  { name: 'Send', Icon: Send },
  { name: 'Settings', Icon: Settings },
  { name: 'User', Icon: User },
  { name: 'Users', Icon: Users },
  { name: 'Shield', Icon: Shield },
  { name: 'Building', Icon: Building },
  { name: 'Monitor', Icon: Monitor },
  { name: 'Loader2', Icon: Loader2 },
  { name: 'MoreHorizontal', Icon: MoreHorizontal },
  { name: 'Menu', Icon: Menu },
  { name: 'Paperclip', Icon: Paperclip },
]

const customIcons = [
  { name: 'AgentCoordinator', Icon: AgentCoordinator },
  { name: 'AgentFacilities', Icon: AgentFacilities },
  { name: 'AgentFinance', Icon: AgentFinance },
  { name: 'AgentGovernance', Icon: AgentGovernance },
  { name: 'AgentHr', Icon: AgentHr },
  { name: 'AgentIt', Icon: AgentIt },
  { name: 'ConfidenceHigh', Icon: ConfidenceHigh },
  { name: 'ConfidenceLow', Icon: ConfidenceLow },
  { name: 'ConfidenceMedium', Icon: ConfidenceMedium },
  { name: 'VerificationFailed', Icon: VerificationFailed },
  { name: 'VerificationFlagged', Icon: VerificationFlagged },
  { name: 'VerificationPassed', Icon: VerificationPassed },
]

function IconCell({
  name,
  Icon,
}: {
  name: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-2">
      <Icon size={20} className="text-brand-cream/80" />
      <Text size="xs" color="muted" className="text-center leading-tight">
        {name}
      </Text>
    </div>
  )
}

export function IconsSection() {
  return (
    <SectionWrapper title="Icons">
      <div>
        <Text size="sm" color="muted" weight="semibold" className="mb-2">
          Lucide icons
        </Text>
        <Grid columns={{ default: 4, sm: 5, md: 6, lg: 8 }} gap={1}>
          {lucideIcons.map(({ name, Icon }) => (
            <IconCell key={name} name={name} Icon={Icon} />
          ))}
        </Grid>
      </div>

      <Separator className="my-4" />

      <div>
        <Text size="sm" color="muted" weight="semibold" className="mb-2">
          Custom icons
        </Text>
        <Grid columns={{ default: 3, sm: 4, md: 6 }} gap={1}>
          {customIcons.map(({ name, Icon }) => (
            <IconCell key={name} name={name} Icon={Icon} />
          ))}
        </Grid>
      </div>
    </SectionWrapper>
  )
}
