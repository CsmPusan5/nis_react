// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    let out: string = `Name : ${user.name}, `;
    if (user.age !== undefined) {
        out += `Age : ${user.age}, `;
    }

    if (user.hobbies.length === 0) {
        out += "No hobbies";
    } else {
        out += `Hobbies: ${user.hobbies.join(", ")}`;
    }
    
    if ('email' in user.contact) {
        out += `, Email: ${user.contact.email}`
    }
    if ('phone' in user.contact) {
        out += `, Phone: ${user.contact.phone}`
    }
    return out;
}
