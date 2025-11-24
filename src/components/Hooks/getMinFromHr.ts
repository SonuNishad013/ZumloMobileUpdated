export const convertToMinutes = (duration:any) => {
    console.log("duration-=-=>",duration);
    
    // Regular expressions to extract hours and minutes from the string with multiple variations
    const hourMatch = duration.match(/(\d+)\s*(hr|hour|hours|Hr|Hour|Hours)/i);  // Capture the hours variations
    const minuteMatch = duration.match(/(\d+)\s*(min|minute|minutes|Min|Minute|Minutes)/i);  // Capture the minutes variations

    // Convert the extracted values to integers and default to 0 if not found
    const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

    // Return the total minutes (hours converted to minutes + remaining minutes)
    return hours * 60 + minutes;
};
