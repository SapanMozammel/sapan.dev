import { Body, Column, Container, Head, Heading, Hr, Html, Link, Preview, Row, Section, Text } from '@react-email/components';

type ContactAdminEmailProps = {
	name: string;
	email: string;
	title: string;
	message: string;
};

const PALETTE = {
	dark: '#0e0e2c',
	darkAlt: '#161636',
	success: '#43ead4',
	primary: '#4a4ded',
	white: '#ffffff',
	body: '#e2e8f0',
	muted: '#94a3b8',
	footer: '#64748b',
	divider: '#1e1b3a',
};

const FONT_SERIF = "'Georgia', 'Playfair Display', 'Garamond', serif";
const FONT_SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'SF Mono', Menlo, Consolas, 'Courier New', monospace";

const main = {
	backgroundColor: PALETTE.dark,
	fontFamily: FONT_SANS,
	margin: 0,
	padding: '32px 16px',
};

const gradientBar = {
	height: '4px',
	background: `linear-gradient(90deg, ${PALETTE.primary} 0%, ${PALETTE.success} 100%)`,
	borderRadius: '2px',
	margin: '0 0 32px',
};

const container = {
	maxWidth: '560px',
	margin: '0 auto',
	backgroundColor: PALETTE.darkAlt,
	borderRadius: '16px',
	padding: '40px 36px',
	border: `1px solid ${PALETTE.divider}`,
};

const brandmark = {
	color: PALETTE.white,
	fontFamily: FONT_SANS,
	fontSize: '14px',
	fontWeight: 700,
	letterSpacing: '0.02em',
	margin: 0,
};

const brandDot = {
	color: PALETTE.success,
	fontWeight: 700,
};

const brandTag = {
	color: PALETTE.muted,
	fontFamily: FONT_MONO,
	fontSize: '11px',
	letterSpacing: '0.08em',
	textTransform: 'uppercase' as const,
	margin: '2px 0 0',
};

const kicker = {
	color: PALETTE.success,
	fontFamily: FONT_MONO,
	fontSize: '11px',
	fontWeight: 700,
	letterSpacing: '0.18em',
	textTransform: 'uppercase' as const,
	margin: '32px 0 8px',
};

const heading = {
	color: PALETTE.white,
	fontFamily: FONT_SERIF,
	fontSize: '30px',
	fontWeight: 500,
	lineHeight: '1.2',
	letterSpacing: '-0.01em',
	margin: '0 0 28px',
};

const divider = {
	borderColor: PALETTE.divider,
	borderStyle: 'solid',
	borderWidth: '1px 0 0',
	margin: '0 0 28px',
};

const label = {
	color: PALETTE.muted,
	fontFamily: FONT_MONO,
	fontSize: '10px',
	fontWeight: 600,
	letterSpacing: '0.12em',
	textTransform: 'uppercase' as const,
	margin: '0 0 6px',
};

const value = {
	color: PALETTE.white,
	fontSize: '15px',
	lineHeight: '1.5',
	margin: '0 0 22px',
};

const emailValue = {
	color: PALETTE.success,
	fontFamily: FONT_MONO,
	fontSize: '14px',
	textDecoration: 'none',
};

const messageBody = {
	color: PALETTE.body,
	fontSize: '15px',
	lineHeight: '1.7',
	whiteSpace: 'pre-wrap' as const,
	margin: '0 0 28px',
};

const button = {
	display: 'inline-block',
	backgroundColor: PALETTE.success,
	color: PALETTE.dark,
	fontFamily: FONT_SANS,
	fontSize: '13px',
	fontWeight: 700,
	letterSpacing: '0.04em',
	textDecoration: 'none',
	textTransform: 'uppercase' as const,
	padding: '12px 22px',
	borderRadius: '8px',
};

const footerText = {
	color: PALETTE.footer,
	fontFamily: FONT_MONO,
	fontSize: '11px',
	lineHeight: '1.6',
	letterSpacing: '0.04em',
	margin: '28px 0 0',
};

const PREVIEW_PROPS: ContactAdminEmailProps = {
	name: 'Alice Johnson',
	email: 'alice@example.com',
	title: 'Landing page redesign',
	message: "Hey! I run a SaaS startup and we're looking to redesign our marketing site. Loved your portfolio — especially the Experience timeline. Do you have availability in the next 4–6 weeks?",
};

const ContactAdminEmail = ({ name = PREVIEW_PROPS.name, email = PREVIEW_PROPS.email, title = PREVIEW_PROPS.title, message = PREVIEW_PROPS.message }: Partial<ContactAdminEmailProps>) => (
	<Html>
		<Head />
		<Preview>
			New contact from {name} — {title}
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<div style={gradientBar} />
				<Row>
					<Column>
						<Text style={brandmark}>
							sapan<span style={brandDot}>.</span>dev
						</Text>
						<Text style={brandTag}>Contact form</Text>
					</Column>
				</Row>
				<Text style={kicker}>New message</Text>
				<Heading as='h1' style={heading}>
					{title}
				</Heading>
				<Hr style={divider} />
				<Section>
					<Text style={label}>From</Text>
					<Text style={value}>{name}</Text>
					<Text style={label}>Email</Text>
					<Text style={value}>
						<Link href={`mailto:${email}`} style={emailValue}>
							{email}
						</Link>
					</Text>
					<Text style={label}>Message</Text>
					<Text style={messageBody}>{message}</Text>
					<Link href={`mailto:${email}?subject=Re: ${encodeURIComponent(title)}`} style={button}>
						Reply to {name.split(' ')[0] || 'sender'}
					</Link>
				</Section>
				<Hr style={{ ...divider, margin: '32px 0 0' }} />
				<Text style={footerText}>
					sapan-dev.vercel.app
					<br />
					Frontend developer · Dhaka, Bangladesh
				</Text>
			</Container>
		</Body>
	</Html>
);

ContactAdminEmail.PreviewProps = PREVIEW_PROPS;

export default ContactAdminEmail;
