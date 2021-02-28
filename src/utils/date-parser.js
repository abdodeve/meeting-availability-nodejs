/**
 * dateParser
 * Extract day and times
 * @param {string} initDate
 */
module.exports = (initDate) => {
  const preparedDate = {
    day: initDate.split(" ")[0],
    timeFrom: initDate.split(" ")[1].split("-")[0],
    timeTo: initDate.split("-")[1],
  };
  return preparedDate;
};
