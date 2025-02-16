export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async acessWebPage(url) {
        await this.page.goto(url);
    }

    async fillCPF(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fullPassword(password) {
        for (const digit of password) {
            await this.page.getByRole('button', { name: digit }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fullInvalid2FACode() {
        await this.page.getByRole('textbox', { name: '000000' }).fill('43244');
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async fullValid2FACode(code) {
        await this.page.getByRole('textbox', { name: '000000' }).fill();
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }
}
