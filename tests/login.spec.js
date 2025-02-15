// @ts-check
import { test, expect } from '@playwright/test';

test('It shoudln\'t log in when de auth code is invalid', async ({ page }) => {

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await page.goto('http://paybank-mf-auth:3000/');
  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(user.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();

  for (const digit of user.password) {
    await page.getByRole('button', { name: digit }).click();
  }

  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('textbox', { name: '000000' }).fill('123444');
  await page.getByRole('button', { name: 'Verificar' }).click();

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});