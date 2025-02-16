// @ts-check
import { test, expect } from '@playwright/test';
import { get2FACode } from '../support/db';
import { LoginPage } from '../pages/loginPage';

test('It shoudln\'t log in when de auth code is invalid', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  loginPage.acessWebPage('http://paybank-mf-auth:3000/');

  loginPage.fillCPF(user.cpf);
  loginPage.fullPassword(user.password);

  loginPage.fullInvalid2FACode();

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('It shoud log in sucesssfully ', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  loginPage.acessWebPage('http://paybank-mf-auth:3000/');

  loginPage.fillCPF(user.cpf);
  loginPage.fullPassword(user.password);

  loginPage.fullInvalid2FACode();

  // Temporário, para que dê tempo de pegar o código correto
  await page.waitForTimeout(3000);

  const code = await get2FACode();

  loginPage.fullValid2FACode(code);

  await page.waitForTimeout(2000);

  await expect(page.locator('#account-balance')).toHaveText('R$ 5.000,00');
});