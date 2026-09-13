// Задание 4*. Правила валидации (со звёздочкой)
//
// 1. Опишите Rules так, чтобы ключом могло быть только поле формы (keyof).
// 2. Реализуйте validateForm: в результате только те поля,
//    которые не прошли проверку.
// 3. Сообщения собирайте шаблонной строкой.
//
// Подсказка: тип ошибок — { [K in keyof IFormData]?: string }.
// Отображённые типы (mapped types) — тема следующей лекции,
// поэтому задание необязательное.

export interface IFormData {
    username: string;
    email: string;
    age: number;
}

export type Rules = {
    [K in keyof IFormData]: (value: IFormData[K]) => boolean;
};

export type Errors = {
    [K in keyof IFormData]?: string;
};

export const defaultRules: Rules = {
    username: (value) => value.trim().length > 0,
    email: (value) => value.includes("@"),
    age: (value) => value > 0,
};

function checkField<K extends keyof IFormData>(key: K, data: IFormData, rules: Rules, errors: Errors): void {
    const rule = rules[key];
    const value = data[key];
    if (!rule(value)) {
        errors[key] = `Поле "${key}": неверное значение "${value}"`;
    }
};

export function validateForm(data: IFormData, rules: Rules): Errors {
    const errors: Errors = {};
    checkField("username", data, rules, errors);
    checkField("email", data, rules, errors);
    checkField("age", data, rules, errors);
    return errors;
}
