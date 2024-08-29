export function cleanItemName(itemName) {
    return itemName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
