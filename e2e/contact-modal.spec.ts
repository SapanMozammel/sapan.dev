import enCommon from '../src/i18n/locales/en/common.json';
import { expect, test } from './fixtures';

const labels = enCommon.contact.form.labels;
const status = enCommon.contact.status;

const fieldByLabel = (page: import('@playwright/test').Page, label: string) => page.getByLabel(label, { exact: true });

const openModal = async (page: import('@playwright/test').Page) => {
	await page.goto('/');
	const cta = page.getByRole('button', { name: new RegExp(enCommon.buttons.letsConnect, 'i') }).first();
	await cta.waitFor({ state: 'visible', timeout: 15_000 });
	await cta.click();
	await expect(page.getByRole('dialog', { name: new RegExp(enCommon.contact.modal.title, 'i') })).toBeVisible({ timeout: 15_000 });
};

const fillValid = async (page: import('@playwright/test').Page) => {
	await fieldByLabel(page, labels.name).fill('Ada Lovelace');
	await fieldByLabel(page, labels.email).fill('ada@example.com');
	await fieldByLabel(page, labels.title).fill('Test integration');
	await fieldByLabel(page, labels.message).fill('Hello from a Playwright spec.');
};

test.describe('contact modal', () => {
	test('opens via the Connect CTA and renders all four fields', async ({ page, mockTurnstile }) => {
		await mockTurnstile();
		await openModal(page);

		await expect(fieldByLabel(page, labels.name)).toBeVisible();
		await expect(fieldByLabel(page, labels.email)).toBeVisible();
		await expect(fieldByLabel(page, labels.title)).toBeVisible();
		await expect(fieldByLabel(page, labels.message)).toBeVisible();
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
