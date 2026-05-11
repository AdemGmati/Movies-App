export const getPageItems = (current: number, total: number): (number | '…')[] => {
        const items: (number | '…')[] = [];

        if (total <= 7) {
            // show all pages if small number
            for (let i = 1; i <= total; i++) items.push(i);
            return items;
        }

        items.push(1);

        if (current > 3) items.push('…');

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) items.push(i);

        if (current < total - 2) items.push('…');

        items.push(total);

        return items;
}