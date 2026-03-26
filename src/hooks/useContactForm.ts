'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeContactModal } from '@/store/slices/uiSlice';
import { ContactFormData, ContactFormErrors, ContactSubmitStatus } from '@/types/contact';
import { useCallback, useState } from 'react';

const INITIAL_FORM: ContactFormData = { name: '', email: '', title: '', message: '' };

export const useContactForm = () => {
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

	return { isOpen, form, errors, status, handleOpenChange, handleClose, handleSubmit, handleRetry, handleChange };
};
