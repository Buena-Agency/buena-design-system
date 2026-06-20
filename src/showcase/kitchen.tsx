import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/brand.css';
import '../components/components.css';
import {
  Text,
  Button,
  IconButton,
  Pill,
  Field,
  Input,
  Checkbox,
  Radio,
  Switch,
  Badge,
  Chip,
  Tag,
  StatusDot,
  Avatar,
  AvatarGroup,
  Card,
  Stack,
  Inline,
  Divider,
  Kbd,
  Link,
  Icon,
  Alert,
  Banner,
  Toast,
  Tooltip,
  Tabs,
  Tab,
  Breadcrumb,
  Pagination,
  SegmentedControl,
  Menu,
  MenuItem,
  MenuDivider,
  MenuLabel,
  ListItem,
  Stat,
  SearchInput,
  ButtonGroup,
  EmptyState,
  Modal,
} from '../components';
import {
  IconSearch,
  IconSettings,
  IconTrash,
  IconInfo,
  IconStar,
  IconUser,
  IconPlus,
  IconCopy,
  IconBell,
  IconFolder,
  IconCheckCircle,
} from '../icons';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="sm">
      <Text variant="footnote" color="third" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </Text>
      {children}
    </Stack>
  );
}

function Sink() {
  const [tab, setTab] = useState('overview');
  const [seg, setSeg] = useState('week');
  const [page, setPage] = useState(2);
  const [q, setQ] = useState('design');
  const [modal, setModal] = useState(false);

  return (
    <Stack gap="xl" style={{ padding: 28, background: 'var(--color-bg-low)', minHeight: '100%' }}>
      <Section title="Typography (atom)">
        <Text variant="largeTitle">Large title</Text>
        <Text variant="title2">Title two</Text>
        <Text variant="body" color="second">
          Body copy at the body step, second color. <Link href="#">A link</Link>, a <Kbd>⌘K</Kbd> key.
        </Text>
        <Text variant="footnote" color="third">
          Footnote, third color.
        </Text>
      </Section>

      <Section title="Buttons (atom)">
        <Inline gap="sm" wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
        </Inline>
        <Inline gap="sm" align="center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <IconButton aria-label="Settings">
            <Icon icon={IconSettings} size="sm" />
          </IconButton>
          <ButtonGroup>
            <Button variant="secondary">Day</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="secondary">Month</Button>
          </ButtonGroup>
          <Pill pressed>Pill</Pill>
        </Inline>
      </Section>

      <Section title="Inputs (atom)">
        <Field label="Email" helper="We never share it.">
          <Input placeholder="you@buena.org" />
        </Field>
        <Inline gap="lg" wrap>
          <Checkbox label="Checkbox" defaultChecked />
          <Radio name="r" label="Radio" defaultChecked />
          <Switch label="Switch" defaultChecked />
          <Switch label="Default tone" tone="default" defaultChecked />
        </Inline>
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder="Search…" />
      </Section>

      <Section title="Tags / badges / indicators (atom)">
        <Inline gap="sm" wrap align="center">
          <Badge tone="primary">NEW</Badge>
          <Badge tone="success">LIVE</Badge>
          <Badge tone="error">ERROR</Badge>
          <Chip color="green">Green</Chip>
          <Chip color="blue" outlined>
            Blue
          </Chip>
          <Tag onRemove={() => {}}>Removable</Tag>
          <Inline gap="xs" align="center">
            <StatusDot tone="success" /> <Text variant="footnote" color="third">Online</Text>
          </Inline>
        </Inline>
        <Inline gap="sm" align="center">
          <Avatar initials="DB" />
          <AvatarGroup max={3}>
            <Avatar initials="DB" />
            <Avatar initials="JS" />
            <Avatar initials="AM" />
            <Avatar initials="KL" />
            <Avatar initials="RT" />
          </AvatarGroup>
        </Inline>
      </Section>

      <Section title="Feedback (molecule)">
        <Alert tone="info" title="Heads up" icon={IconInfo}>
          This alert composes Surface + Icon + Text atoms.
        </Alert>
        <Alert tone="success" title="Saved" icon={IconCheckCircle}>
          Your changes are live.
        </Alert>
        <Banner tone="warning" icon={IconInfo} onDismiss={() => {}}>
          A full-width banner with a dismiss.
        </Banner>
        <Toast tone="success" title="Deployed" icon={IconCheckCircle} onDismiss={() => {}}>
          v0.3.0 is on Vercel.
        </Toast>
        <Inline gap="sm">
          <Tooltip title="Tooltip" content="Composed from Text atoms.">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
        </Inline>
      </Section>

      <Section title="Navigation (molecule)">
        <Tabs>
          <Tab selected={tab === 'overview'} onClick={() => setTab('overview')}>
            Overview
          </Tab>
          <Tab selected={tab === 'activity'} onClick={() => setTab('activity')}>
            Activity
          </Tab>
          <Tab selected={tab === 'settings'} onClick={() => setTab('settings')}>
            Settings
          </Tab>
        </Tabs>
        <Breadcrumb
          items={[{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Buena DS' }]}
        />
        <Inline gap="lg" align="center" wrap>
          <SegmentedControl
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
            value={seg}
            onChange={setSeg}
          />
          <Pagination page={page} total={5} onChange={setPage} />
        </Inline>
      </Section>

      <Section title="Dropdown menu (organism → molecule → atoms)">
        <Menu style={{ alignSelf: 'flex-start' }}>
          <MenuLabel>Account</MenuLabel>
          <MenuItem leadingIcon={IconUser}>Profile</MenuItem>
          <MenuItem leadingIcon={IconSettings} shortcut="⌘,">
            Settings
          </MenuItem>
          <MenuItem leadingIcon={IconCopy} shortcut="⌘C">
            Duplicate
          </MenuItem>
          <MenuDivider />
          <MenuItem leadingIcon={IconTrash} destructive>
            Delete
          </MenuItem>
        </Menu>
      </Section>

      <Section title="Data display (molecule)">
        <Inline gap="md" wrap>
          <Stat label="Revenue" value="$48.2k" trend={{ direction: 'up', label: '12% MoM' }} />
          <Stat label="Churn" value="1.4%" trend={{ direction: 'down', label: '0.3pt' }} />
        </Inline>
        <Card>
          <ListItem
            leading={<Avatar initials="DB" />}
            title="Doug Burnett"
            subtitle="doug@buena.org"
            trailing={<Icon icon={IconStar} size="sm" />}
          />
          <Divider />
          <ListItem
            leading={<Icon icon={IconFolder} size="md" />}
            title="Design System"
            subtitle="22 components"
            trailing={<Badge tone="success">v0.3</Badge>}
          />
        </Card>
      </Section>

      <Section title="Empty state + modal (organism)">
        <EmptyState
          icon={IconBell}
          title="No notifications"
          description="You're all caught up."
          action={
            <Button variant="accent">
              <Icon icon={IconPlus} size="sm" /> Create one
            </Button>
          }
        />
        <Button variant="secondary" style={{ alignSelf: 'flex-start' }} onClick={() => setModal(true)}>
          Open modal
        </Button>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Delete project?"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setModal(false)}>
                Delete
              </Button>
            </>
          }
        >
          This can't be undone. The modal is a Surface composing Inline, Text, IconButton, and Icon atoms.
        </Modal>
      </Section>
    </Stack>
  );
}

function App() {
  return (
    <div
      data-brand="atho"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'var(--font-sans)' }}
    >
      <div data-theme="dark">
        <Sink />
      </div>
      <div data-theme="light">
        <Sink />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
