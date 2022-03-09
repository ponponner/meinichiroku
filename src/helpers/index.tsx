export function getYearth(date: string): number {
    return new Date().getFullYear() - new Date(date).getFullYear() + 1;
}
