export default function dateFilter(value, format = 'date') {
    const options = {};
    if (format.includes('date')) {
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric'
    }
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}
