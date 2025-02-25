// @ts-check
import { test, expect } from '@playwright/test';

import { get2FACode } from '../support/db';
import { LoginPage } from '../pages/LoginPage';
import { LoginActions } from '../actions/LoginActions';

import { cleanJobs, getJob } from '../support/redis';

test('It shoudln\'t log in when de auth code is invalid', async ({ page }) => {

  const loginPage = new LoginPage(page);

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.acessWebPage();

  await loginPage.fillCPF(user.cpf);
  await loginPage.fillPassword(user.password);
  await loginPage.fillInvalid2FACode();

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('It shoud log in sucesssfully', async ({ page }) => {

  const loginActions = new LoginActions(page);

  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await cleanJobs();

  await loginActions.acessWebPage();

  await loginActions.fillCPF(user.cpf);
  await loginActions.fillPassword(user.password);

  await page.getByRole('heading', { name: 'Verificação em duas etapas' })
    .waitFor({ timeout: 7000 })

  const code = await getJob();
  
  await loginActions.fillValid2FACode(code);

  await expect(await loginActions.getBalance()).toHaveText('R$ 5.000,00');
});