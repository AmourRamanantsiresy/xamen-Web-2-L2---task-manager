/**
  Pauses the execution for a specified amount of time.
  @param {number} milliseconds - The duration to wait in milliseconds.
  @returns {Promise<void>} A Promise that resolves after the specified duration.
*/
const wait = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
/**
 * Display date to (DD-MM-AAAA HH:mm) format
 * @param date 
 */
const formatDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return date.toLocaleString('fr-FR', options).replace(/\//ig, "-");
}

export { wait, formatDateTime };
