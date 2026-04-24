import { Body, Column, Container, Head, Heading, Hr, Html, Link, Preview, Row, Section, Text } from '@react-email/components';

type ContactAutoReplyProps = {
	name: string;
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
	fontSize: '32px',
	fontWeight: 500,
	lineHeight: '1.2',
	letterSpacing: '-0.01em',
	margin: '0 0 24px',
};

const body = {
	color: PALETTE.body,
	fontSize: '15px',
	lineHeight: '1.7',
	margin: '0 0 16px',
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
	margin: '8px 0 0',
};

const signature = {
	color: PALETTE.white,
	fontFamily: FONT_SERIF,
	fontSize: '17px',
	fontStyle: 'italic' as const,
	margin: '32px 0 4px',
};

const signatureRole = {
	color: PALETTE.muted,
	fontFamily: FONT_MONO,
	fontSize: '11px',
	letterSpacing: '0.08em',
	textTransform: 'uppercase' as const,
	margin: 0,
};

const divider = {
	borderColor: PALETTE.divider,
	borderStyle: 'solid',
	borderWidth: '1px 0 0',
	margin: '32px 0 20px',
};

const footerText = {
	color: PALETTE.footer,
	fontSize: '12px',
	lineHeight: '1.6',
	margin: '0 0 10px',
};

const footerMono = {
	color: PALETTE.footer,
	fontFamily: FONT_MONO,
	fontSize: '11px',
	letterSpacing: '0.06em',
	lineHeight: '1.6',
	margin: 0,
};

const PREVIEW_PROPS: ContactAutoReplyProps = {
	name: 'Alice',
};

const ContactAutoReply = ({ name = PREVIEW_PROPS.name }: Partial<ContactAutoReplyProps>) => (
	<Html>
		<Head />
		<Preview>Thanks for reaching out — I'll get back to you within 24 hours.</Preview>
		<Body style={main}>
			<Container style={container}>
				<div style={gradientBar} />
				<Row>
					<Column>
						<Text style={brandmark}>
							sapan<span style={brandDot}>.</span>dev
						</Text>
						<Text style={brandTag}>Auto-reply</Text>
					</Column>
				</Row>
				<Text style={kicker}>Message received</Text>
				<Heading as='h1' style={heading}>
					Hi {name},
				</Heading>
				<Section>
					<Text style={body}>Thanks for reaching out. Your message just landed in my inbox — I'll get back to you personally within 24 hours.</Text>
					<Text style={body}>In the meantime, feel free to browse more of my work:</Text>
					<Link href='https://sapan-dev.vercel.app' style={button}>
						View portfolio →
					</Link>
				</Section>
				<Text style={signature}>— Sapan Mozammel</Text>
				<Text style={signatureRole}>Frontend developer</Text>
				<Hr style={divider} />
				<Text style={footerText}>This is an automated reply. You can respond to this email directly — your message will route back to me.</Text>
				<Text style={footerMono}>sapan-dev.vercel.app · Dhaka, Bangladesh</Text>
			</Container>
		</Body>
	</Html>
);

ContactAutoReply.PreviewProps = PREVIEW_PROPS;

export default ContactAutoReply;
