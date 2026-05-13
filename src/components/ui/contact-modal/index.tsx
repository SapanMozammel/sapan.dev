'use client';

import Logo from '@/components/icons/logo';
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useContactForm } from '@/hooks/use-contact-form';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import ContactForm from './contact-form';
import { ContactError, ContactLoading, ContactSuccess } from './contact-status-states';

const ContactModal = memo(() => {
	const translateModal = useTranslations('common.contact.modal');
	const { isOpen, form, errors, status, handleOpenChange, handleClose, handleSubmit, handleRetry, handleChange, handleTurnstileToken } = useContactForm();

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className='w-screen max-w-xl p-0'>
				<div
					aria-hidden
					className='animate-faq-border-shift pointer-events-none absolute -inset-px mx-4 rounded-[calc(theme(borderRadius.2xl)+theme(spacing.px))] bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-success)_35%,var(--color-primary)_65%,var(--color-success)_100%)] bg-size-[300%_300%] outline-none! select-none'
				/>
				<div className='dark:bg-dark bg-secondary relative z-10 mx-4 overflow-hidden rounded-2xl shadow-[0_8px_32px_color-mix(in_srgb,var(--color-primary)_14%,transparent),0_2px_8px_color-mix(in_srgb,var(--color-success)_8%,transparent)]'>
					<div className='p-6 sm:p-7'>
						<DialogHeader className='mb-6 flex-row items-start justify-between gap-4 space-y-0 text-left'>
							<div className='flex items-center gap-4'>
								<Logo className='h-8 w-8 shrink-0 sm:h-9 sm:w-9' />
								<div className='flex flex-col gap-0.5'>
									<DialogTitle className='text-heading-small text-dark tracking-wide dark:text-white'>{translateModal('title')}</DialogTitle>
									<DialogDescription className='text-secondary-600 dark:text-secondary-400 text-paragraph-small tracking-widest'>{translateModal('description')}</DialogDescription>
								</div>
							</div>
							<DialogCloseButton />
						</DialogHeader>

						{status === 'loading' ? (
							<ContactLoading />
						) : status === 'success' ? (
							<ContactSuccess onClose={handleClose} />
						) : status === 'error' ? (
							<ContactError onRetry={handleRetry} />
						) : (
							<ContactForm form={form} errors={errors} onChange={handleChange} onSubmit={handleSubmit} onTurnstileToken={handleTurnstileToken} />
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
});

ContactModal.displayName = 'ContactModal';

export default ContactModal;
