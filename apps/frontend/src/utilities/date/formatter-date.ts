export function formatterDate(date: Date) {
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

export function parseDateString(value: string | Date | undefined) {
    if (!value) return undefined;
    if (value instanceof Date) return value;

    // ambil manual YYYY-MM-DD
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

export function checkDate(check: boolean | undefined) {
    const years = {
        fromYear: check ? new Date().getFullYear()
            : new Date().getFullYear() - 100,
        toYear: check ? new Date().getFullYear() + 100
            : new Date().getFullYear()
    }

    return years
}

export function disabledDate(date: Date, check: boolean | undefined) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // majukan 1 hari
    today.setDate(today.getDate() + 1);

    if (check) {
        return date < today;
    }

    return date > today;
}
