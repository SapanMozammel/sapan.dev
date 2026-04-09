import { IconArchive, IconArchiveOff, IconBox, IconBug, IconFile, IconInbox, IconLogout, IconMessages, IconUsers } from '@tabler/icons-react';

export const menuItems = [
	{
		title: 'Projects',
		icon: <IconBox className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Index',
		icon: <IconInbox className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Promotions',
		icon: <IconMessages className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Teams',
		icon: <IconUsers className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'My Issues',
		icon: <IconBug className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Junk',
		icon: <IconArchiveOff className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Drafts',
		icon: <IconFile className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Archive',
		icon: <IconArchive className='h-[1.1em] w-[1.1em]' />,
	},
	{
		title: 'Logout',
		icon: <IconLogout className='h-[1.1em] w-[1.1em]' />,
	},
];

export const inboxList = [
	{
		name: 'William Smith',
		email: 'williamsmith@example.com',
		title: 'Meeting Tomorrow',
		time: '5 hours ago',
		tags: ['meeting', 'work', 'important'],
		message: `Hi! Lets's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project success. <br /> <br />Please come prepared with any questions or insights you may have. Looking forward to our meeting! <br /> <br /> Best regards, William`,
		status: 'read',
	},
	{
		name: 'Olivia Martinez',
		email: 'oliviamartinez@example.com',
		title: 'Feedback on UI Designs',
		time: '6 hours ago',
		tags: ['design', 'feedback', 'ui'],
		message: `Hi Team, I've reviewed the UI designs shared earlier and added some comments for improvement. Please take a look and share your thoughts before the client presentation. <br /> <br />Thanks, Olivia`,
		status: 'unread',
	},
	{
		name: 'Charlotte Lee',
		email: 'charlottelee@example.com',
		title: 'Project Proposal Review',
		time: '2 day ago',
		tags: ['proposal', 'review', 'high-priority'],
		message: `Hello, I have attached the project proposal for your review. Please provide feedback and let me know if there are any changes required. I'd like to finalize this by the end of the week. <br /> <br />Thanks, Sophia`,
		status: 'read',
	},
	{
		name: 'Sophia Johnson',
		email: 'sophiajohnson@example.com',
		title: 'Team Outing Plans',
		time: '3 days ago',
		tags: ['team', 'outing', 'social'],
		message: `Hey Everyone, Let's finalize the plans for the team outing this Friday. Please RSVP by tomorrow evening so we can make necessary arrangements. <br /> <br />Cheers, Charlotte`,
		status: 'unread',
	},
	{
		name: 'Daniel Miller',
		email: 'danielmiller@example.com',
		title: 'Onboarding New Team Member',
		time: '1 week ago',
		tags: ['onboarding', 'team', 'new-hire'],
		message: `Hi Everyone, Please welcome our new team member, Sarah. She will be joining as a backend developer. Let's ensure a smooth onboarding process for her. <br /> <br />Regards, Daniel`,
		status: 'unread',
	},
	{
		name: 'Michael Brown',
		email: 'michaelbrown@example.com',
		title: 'Weekly Progress Update',
		time: '2 weeks ago',
		tags: ['update', 'progress', 'weekly'],
		message: `Good morning, Please find the attached weekly progress report for the current sprint. Let me know if you have any questions or need additional details. <br /> <br /> Regards, Michael`,
		status: 'read',
	},
];
