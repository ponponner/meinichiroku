export function getYearth(date: string): number {
    return new Date().getFullYear() - new Date(date).getFullYear() + 1;
}

export function getDateAsISOLocalString(): string {
    return new Date(Date.now() + 9 * 3600000).toISOString().replace(/\..*/, '+09:00');
}
