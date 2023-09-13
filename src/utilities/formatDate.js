import React from 'react';

// Function to format Date string to user friendly type
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now - date;

  const seconds = Math.floor(timeDifference / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  //  if days greater than a week then the date is displayed
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

const FormatDate = ({ dateString }) => {
  const formattedDate = formatDate(dateString);
  return <span>{formattedDate}</span>;
};

export default FormatDate;
