export class LoginActions {

    constructor(page) {
        this.page = page;
    }

    async acessWebPage() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async fillCPF(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fillPassword(password) {
        for (const digit of password) {
            await this.page.getByRole('button', { name: digit }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fillInvalid2FACode() {
        await this.page.getByRole('textbox', { name: '000000' }).fill('432644');
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async fillValid2FACode(code) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(code);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async getBalance() {
        return await this.page.locator('#account-balance');
    }
}