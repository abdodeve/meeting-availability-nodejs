/**
 * dateParser
 * Extract day and times
 * @param {string} initDate
 */
module.exports = (initDate) => {
  const preparedDate = {
    day: initDate.split(' ')[0],
    timeFrom: initDate.split(' ')[1].split('-')[0],
    timeTo: initDate.split('-')[1],
  }
  return preparedDate
}

module.exports.dateUnparser = (initDate) => {
  //2 08:00-12:28
  const preparedDate = `${initDate.day} ${initDate.timeFrom}-${initDate.timeTo}`
  return preparedDate
}
