export function objectValuesSum(obj) {
    return Object.keys(obj).reduce(
        (sum, key) => sum + parseFloat(obj[key] || 0),
        0
    );
}
