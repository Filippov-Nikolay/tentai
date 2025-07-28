// Validation to check the correctness of the time
export const validateTime = (val: string): boolean => {
    if (val === '') return true;
    const timeRegex = /^(0\d|1\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(val);
};

// Validation to check the correctness of the date
export const validateDate = (val: string, allowPast: boolean = false): boolean => {
    if (val === '') return true;

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateRegex.test(val)) return false;

    const [d, m, y] = val.split('.').map(Number);
    const inputDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
        inputDate.getDate() !== d ||
        inputDate.getMonth() !== m - 1 ||
        inputDate.getFullYear() !== y
    ) {
        return false;
    }

    if (!allowPast && inputDate < today) {
        return false;
    }

    return true;
};
