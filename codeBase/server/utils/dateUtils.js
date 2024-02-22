// dateUtils.js

export function validateDate(date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for YYYY-MM-DD format
    return regex.test(date);
  }