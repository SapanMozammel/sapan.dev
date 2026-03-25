'use client';

import Logo from '@/components/icons/Logo';
import { Button } from '@/components/layout/common/Button';
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeContactModal } from '@/store/slices/uiSlice';
import { ContactFormData, ContactFormErrors, ContactSubmitStatus } from '@/types/contact';
import { IconAlertTriangle, IconLoader, IconSend } from '@tabler/icons-react';
import { memo, useCallback, useState } from 'react';

const INITIAL_FORM: ContactFormData = { name: '', email: '', title: '', message: '' };

const INPUT_BASE =
	'font-sora text-dark dark:text-white w-full rounded-md border bg-transparent px-3 py-2.5 text-sm font-regular leading-tight outline-none transition-colors duration-150 placeholder:text-secondary-600/50 dark:placeholder:text-secondary-400/50 focus:ring-0';
const INPUT_BORDER = 'border-secondary-300 dark:border-secondary-800 focus:border-primary dark:focus:border-success';
const INPUT_ERROR = 'border-danger dark:border-danger';

const ContactModal = memo(() => {
	const isOpen = useAppSelector((state) => state.ui.isContactModalOpen);
	const dispatch = useAppDispatch();

	const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
	const [errors, setErrors] = useState<ContactFormErrors>({});
	const [status, setStatus] = useState<ContactSubmitStatus>('idle');

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				dispatch(closeContactModal());
				setForm(INITIAL_FORM);
				setErrors({});
				setStatus('idle');
			}
		},
		[dispatch]
	);

	const handleClose = useCallback(() => {
		dispatch(closeContactModal());
		setForm(INITIAL_FORM);
		setErrors({});
		setStatus('idle');
	}, [dispatch]);

	const validate = useCallback((): boolean => {
		const next: ContactFormErrors = {};
		if (!form.name.trim()) {
			next.name = 'Name is required';
		}
		if (!form.email.trim()) {
			next.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			next.email = 'Enter a valid email address';
		}
		if (!form.title.trim()) {
			next.title = 'Title is required';
		}
		if (!form.message.trim()) {
			next.message = 'Message is required';
		}
		setErrors(next);
		return Object.keys(next).length === 0;
	}, [form]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!validate()) {
				return;
			}
			setStatus('loading');
			try {
				await new Promise<void>((resolve) => setTimeout(resolve, 1500));
				setStatus('success');
			} catch {
				setStatus('error');
			}
		},
		[validate]
	);

	const handleRetry = useCallback(() => {
		setStatus('idle');
	}, []);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => {
			const next = { ...prev };
			delete next[name as keyof ContactFormErrors];
			return next;
		});
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className='mx-4 max-w-lg p-0'>
				<div
					aria-hidden
					className='animate-faq-border-shift pointer-events-none absolute -inset-px rounded-[calc(theme(borderRadius.2xl)+theme(spacing.px))] bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-success)_35%,var(--color-primary)_65%,var(--color-success)_100%)] [background-size:300%_300%] !outline-none select-none'
				/>
				<div className='dark:bg-dark bg-light relative z-10 overflow-hidden rounded-2xl shadow-[0_8px_32px_color-mix(in_srgb,var(--color-primary)_14%,transparent),0_2px_8px_color-mix(in_srgb,var(--color-success)_8%,transparent)]'>
					<div className='p-6 sm:p-7'>
						<DialogHeader className='mb-6 flex-row items-start justify-between gap-4 space-y-0 text-left'>
							<div className='flex items-center gap-4'>
								<Logo className='h-8 w-8 shrink-0 sm:h-9 sm:w-9' />
								<div className='flex flex-col gap-1.5'>
									<DialogTitle className='font-hg text-xl !leading-none font-medium tracking-wide text-black sm:text-2xl dark:text-white'>Let&apos;s connect</DialogTitle>
									<DialogDescription className='text-secondary-600 dark:text-secondary-400 font-regular text-xs leading-none tracking-widest sm:text-sm'>
										I&apos;ll get back to you within 24&nbsp;hours.
									</DialogDescription>
								</div>
							</div>
							<DialogCloseButton />
						</DialogHeader>

						{status === 'loading' ? (
							<div className='flex flex-col items-center gap-4 pt-8 pb-12 text-center'>
								<IconLoader className='text-primary dark:text-success h-8 w-8 animate-spin' />
								<p className='text-secondary-600 dark:text-secondary-400 text-sm tracking-wide'>Sending your message...</p>
							</div>
						) : status === 'success' ? (
							<div className='flex flex-col items-center gap-3 py-6 text-center'>
								<div className='bg-success flex h-14 w-14 items-center justify-center rounded-xl'>
									<IconSend className='h-6 w-6 text-black' />
								</div>
								<h4 className='font-hg text-xl !leading-tight font-medium tracking-wide text-black dark:text-white'>Message sent!</h4>
								<p className='text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed tracking-wide'>Thanks for reaching out. I&apos;ll be in touch soon.</p>
								<Button className='mt-4' onClick={handleClose}>
									Close
								</Button>
							</div>
						) : status === 'error' ? (
							<div className='flex flex-col items-center gap-3 py-6 text-center'>
								<div className='bg-danger/10 flex h-14 w-14 items-center justify-center rounded-xl'>
									<IconAlertTriangle className='text-danger h-6 w-6' />
								</div>
								<h4 className='font-hg text-xl !leading-tight font-medium tracking-wide text-black dark:text-white'>Something went wrong</h4>
								<p className='text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed tracking-wide'>Please try again or reach out via email.</p>
								<Button className='mt-4' onClick={handleRetry}>
									Try Again
								</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
								<div className='flex flex-col gap-4 sm:flex-row'>
									<fieldset className='flex flex-1 flex-col gap-2'>
										<label className='text-secondary-500 dark:text-secondary-400 text-sm leading-none font-medium tracking-wider uppercase'>Name</label>
										<input
											type='text'
											name='name'
											value={form.name}
											onChange={handleChange}
											placeholder='John Doe'
											autoComplete='name'
											className={cn(INPUT_BASE, errors.name ? INPUT_ERROR : INPUT_BORDER)}
										/>
										{errors.name ? <p className='text-danger text-xs leading-none'>{errors.name}</p> : null}
									</fieldset>
									<fieldset className='flex flex-1 flex-col gap-2'>
										<label className='text-secondary-500 dark:text-secondary-400 text-sm leading-none font-medium tracking-wider uppercase'>Email</label>
										<input
											type='email'
											name='email'
											value={form.email}
											onChange={handleChange}
											placeholder='john@example.com'
											autoComplete='email'
											className={cn(INPUT_BASE, errors.email ? INPUT_ERROR : INPUT_BORDER)}
										/>
										{errors.email ? <p className='text-danger text-xs leading-none'>{errors.email}</p> : null}
									</fieldset>
								</div>
								<fieldset className='flex flex-col gap-2'>
									<label className='text-secondary-500 dark:text-secondary-400 text-sm leading-none font-medium tracking-wider uppercase'>Title</label>
									<input
										type='text'
										name='title'
										value={form.title}
										onChange={handleChange}
										placeholder='e.g. Landing page redesign'
										className={cn(INPUT_BASE, errors.title ? INPUT_ERROR : INPUT_BORDER)}
									/>
									{errors.title ? <p className='text-danger text-xs leading-none'>{errors.title}</p> : null}
								</fieldset>
								<fieldset className='flex flex-col gap-2'>
									<label className='text-secondary-500 dark:text-secondary-400 text-sm leading-none font-medium tracking-wider uppercase'>Message</label>
									<textarea
										name='message'
										value={form.message}
										onChange={handleChange}
										placeholder='Tell me about your project...'
										rows={3}
										className={cn(INPUT_BASE, 'leading-relaxed', errors.message ? INPUT_ERROR : INPUT_BORDER)}
									/>
									{errors.message ? <p className='text-danger text-xs leading-none'>{errors.message}</p> : null}
								</fieldset>

								<Button fill gradient className='mt-1 w-full justify-center'>
									Send Message
								</Button>
							</form>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
});

ContactModal.displayName = 'ContactModal';

export default ContactModal;
