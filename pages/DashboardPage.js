export class DashboardPage {

    constructor(page) {
        this.page = page;
    }

    async getBalance() {
        return await this.page.locator('#account-balance');
    }
}