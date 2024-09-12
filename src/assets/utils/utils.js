export const formattedDate = (dateString) => {
    const dateObject = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(dateObject);
};

export const formattedTime = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Set to false for 24-hour format
    });
};