// Задание 3. Платежи (20 минут)
//
// 1. Реализуйте describePayment: switch по метке kind.
// 2. Закройте switch проверкой полноты через never.
// 3. Реализуйте total — сумма только наличных платежей.
// 4. Добавьте четвёртый вариант оплаты и посмотрите, где компилятор
//    покажет незакрытые места.

import { assert } from "vitest";
import { assertNever } from "./01-status";

export type Payment =
    | { kind: "card"; last4: string }
    | { kind: "cash"; amount: number }
    | { kind: "transfer"; iban: string }
    | { kind: "sbp"; qr: string };

export function describePayment(payment: Payment): string {
    switch (payment.kind) {
        case "card":
            return payment.last4;
        case "cash":
            return payment.amount.toString();
        case "transfer":
            return payment.iban;
        case "sbp":
            return payment.qr;
        default:
            assertNever(payment);
    }
}

export function total(payments: Payment[]): number {
    let sum: number = 0;
    for (const p of payments) {
        if (p.kind === 'cash') {
            sum += p.amount;
        }
    }
    return sum;
}
