module.exports = function getPageOfCollection(collection, page, itemsPerPage) {
    const length = collection.length;
    const possiblePageEnd = page * itemsPerPage;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = length < possiblePageEnd ? length : possiblePageEnd;

    let itemsOnPage = collection.slice(startIndex, endIndex);

    return itemsOnPage;
}