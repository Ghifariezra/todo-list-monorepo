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