import enCommon from '../src/i18n/locales/en/common.json';
import { expect, test } from './fixtures';

const status = enCommon.contact.status;

const fieldByName = (page: import('@playwright/test').Page, name: 'name' | 'email' | 'title' | 'message') => {
	return name === 'message' ? page.locator('textarea[name="message"]') : page.locator(`input[name="${name}"]`);
};

const openModal = async (page: import('@playwright/test').Page) => {
	await page.goto('/');
	const cta = page.getByRole('button', { name: new RegExp(enCommon.buttons.letsConnect, 'i') }).first();
	await cta.click();
	await expect(page.getByRole('dialog', { name: new RegExp(enCommon.contact.modal.title, 'i') })).toBeVisible();
};

const fillValid = async (page: import('@playwright/test').Page) => {
	await fieldByName(page, 'name').fill('Ada Lovelace');
	await fieldByName(page, 'email').fill('ada@example.com');
	await fieldByName(page, 'title').fill('Test integration');
	await fieldByName(page, 'message').fill('Hello from a Playwright spec.');
};

test.describe('contact modal', () => {
	test('opens via the Connect CTA and renders all four fields', async ({ page, mockTurnstile }) => {
		await mockTurnstile();
		await openModal(page);

		await expect(fieldByName(page, 'name')).toBeVisible();
		await expect(fieldByName(page, 'email')).toBeVisible();
		await expect(fieldByName(page, 'title')).toBeVisible();
		await expect(fieldByName(page, 'message')).toBeVisible();
	});

	test('submitting an empty form surfaces validation errors', async ({ page, mockContact, mockTurnstile }) => {
		await mockTurnstile();
		await mockContact('success');
		await openModal(page);

		const submit = page.getByRole('button', { name: new RegExp(enCommon.contact.form.submit, 'i') });
		await expect(submit).toBeEnabled({ timeout: 10_000 });
		await submit.click();

		await expect(page.getByText('Name is required')).toBeVisible();
		await expect(page.getByText('Email is required')).toBeVisible();
		await expect(page.getByText('Title is required')).toBeVisible();
		await expect(page.getByText('Message is required')).toBeVisible();
	});

	test('valid submission with mocked Resend success → success state', async ({ page, mockContact, mockTurnstile }) => {
		await mockTurnstile();
		await mockContact('success');
		await openModal(page);

		const submit = page.getByRole('button', { name: new RegExp(enCommon.contact.form.submit, 'i') });
		await expect(submit).toBeEnabled({ timeout: 10_000 });

		await fillValid(page);
		await submit.click();

		await expect(page.getByText(status.successTitle)).toBeVisible({ timeout: 10_000 });
	});

	test('valid submission with mocked Resend failure → error state with retry', async ({ page, mockContact, mockTurnstile }) => {
		await mockTurnstile();
		await mockContact('error');
		await openModal(page);

		const submit = page.getByRole('button', { name: new RegExp(enCommon.contact.form.submit, 'i') });
		await expect(submit).toBeEnabled({ timeout: 10_000 });

		await fillValid(page);
		await submit.click();

		await expect(page.getByText(status.errorTitle)).toBeVisible({ timeout: 10_000 });
		await expect(page.getByRole('button', { name: new RegExp(enCommon.buttons.tryAgain, 'i') })).toBeVisible();
	});

	test('Escape key closes the modal', async ({ page, mockTurnstile }) => {
		await mockTurnstile();
		await openModal(page);
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog', { name: new RegExp(enCommon.contact.modal.title, 'i') })).toBeHidden();
	});

	test('Close (X) button closes the modal', async ({ page, mockTurnstile }) => {
		await mockTurnstile();
		await openModal(page);
		const dialog = page.getByRole('dialog', { name: new RegExp(enCommon.contact.modal.title, 'i') });
		await dialog.getByRole('button', { name: new RegExp(enCommon.buttons.close, 'i') }).click();
		await expect(dialog).toBeHidden();
	});
});
