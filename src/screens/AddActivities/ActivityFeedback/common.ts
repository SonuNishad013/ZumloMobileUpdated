const processQuestions = (data: any, ActivityDetails: any) => {
    /**
     * Helper function to convert duration to minutes.
     * @param {string} duration
     * @returns {number|null}
     */
    const convertToMinutes = (duration: any) => {
        if (!duration) return null;
        const match = duration.match(/\d+/); // Extract numeric part
        return match ? parseInt(match[0], 10) : null;
    };
    console.log("ActivityDetails==>", ActivityDetails);

    // Convert duration from ActivityDetails to minutes
    const durationInMinutes: any = convertToMinutes(ActivityDetails?.duration);
    console.log("durationInMinutes-=-=>", durationInMinutes);

    // Filter questions based on conditions
    const filteredData = data.filter((question: any) => {
        if (durationInMinutes > 1 && question.id === 8) {
            return false; // Remove question with id = 8
        }
        if (!durationInMinutes && question.id === 7) {
            return false; // Remove question with id = 7
        }
        return true; // Keep all other questions
    });

    // Reverse the filtered array
    return filteredData.reverse();
};