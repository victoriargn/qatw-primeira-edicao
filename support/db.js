// npm i pg-promise
import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB');

export async function get2FACode(cpf) {
    const query = `
        SELECT Tfc."code" 
        FROM public."TwoFactorCode" Tfc
        JOIN public."User" Users
        ON Users."id" = Tfc."userId"
        WHERE Users."cpf" = '${cpf}'
        ORDER BY Tfc."id" DESC
        LIMIT 1;
    `
    const result = await db.oneOrNone(query);

    return result.code;
}