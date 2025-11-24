
// Function to remove duplicate jsonData
const removeDuplicates = (arr: any) => {
    const seen = new Set();
    return arr.filter((item:any) => {
        const duplicate = seen.has(item.jsonData);
        seen.add(item.jsonData);
        return !duplicate;
    });
};

export default removeDuplicates;