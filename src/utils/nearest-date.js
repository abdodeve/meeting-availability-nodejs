const moment = require('moment')
const dateParser = require('./date-parser')

/**
 *  nearestDate
 *  Retrieve the nearest available time of a given date
 *  @param {string} inputDate
 *  @returns {object}
 */

// module.exports = (inputDate) => {
//   const parsedDate = inputDate
//   const parsedTimeInput = {
//     from: moment(inputDate.timeFrom, 'HH:mm'),
//     to: moment(inputDate.timeTo, 'HH:mm'),
//   }
//   const startTime = moment('08:00', 'HH:mm')
//   const endTime = moment('17:59', 'HH:mm')

//   // Check if the firstAvailableDate.from + 60 minutes doesn't excess 17:59 (endTime)
//   // console.log('parsedTimeInput.to', parsedTimeInput.to)
//   if (moment(parsedTimeInput.to).isSameOrAfter(endTime)) {
//     console.log('is depaaaaaaased')
//     //Go to the next day
//     return false
//   }

//   // firstAvailableDate
//   const firstAvailableDate = {
//     from: moment(parsedTimeInput.to).add('1', 'minutes'),
//     to: moment(parsedTimeInput.to).add('60', 'minutes'),
//   }

//   // Check if the firstAvailableDate.from + 60 minutes doesn't excess 17:59 (endTime)
//   if (moment(firstAvailableDate.to).isAfter(moment(endTime))) {
//     //Go to the next day
//     return false
//   }
//   return {
//     ...inputDate,
//     ...{
//       timeFrom: firstAvailableDate.from.format('HH:mm'),
//       timeTo: firstAvailableDate.to.format('HH:mm'),
//     },
//   }
// }

module.exports = (inputDate) => {
  // const parsedDate = dateParser(inputDate);
  console.log('inputDate=>', inputDate)
  const parsedDate = inputDate
  const parsedTimeInput = {
    from: moment(parsedDate.timeFrom, 'HH:mm'),
    to: moment(parsedDate.timeTo, 'HH:mm'),
  }
  const startTime = moment('08:00', 'HH:mm')
  const endTime = moment('17:59', 'HH:mm')
  let dynamicTime = moment(startTime)

  // Iterate from 08:00 to 17:59
  while (dynamicTime.isBefore(endTime)) {
    // Check if the current dynamicTime is in the given range from-to (inputs time)
    console.log('dynamicTime=>', dynamicTime)
    // if (
    //   dynamicTime.isAfter(
    //     moment(parsedTimeInput.from).subtract(1, 'minutes')
    //   ) &&
    //   dynamicTime.isBefore(moment(parsedTimeInput.to).add(1, 'minutes'))
    // ) {
    if (moment(dynamicTime).isAfter(moment(parsedTimeInput.to))) {
      dynamicTime = parsedTimeInput.to
    }
    const firstAvailableDate = {
      timeFrom: moment(dynamicTime).add('1', 'minutes'),
      timeTo: moment(dynamicTime).add('60', 'minutes'),
    }

    // Check if the firstAvailableDate.from + 60 minutes doesn't excess 17:59 (endTime)
    if (moment(firstAvailableDate.to).isAfter(moment(endTime))) {
      console.log('Go to the next day')
      return false
    }
    // console.log('check', moment(firstAvailableDate).add('60', 'minutes'))
    if (isOnIntersection(firstAvailableDate, parsedTimeInput)) {
      console.log('isOnIntersection', { firstAvailableDate, parsedTimeInput })
    }
    return {
      timeFrom: firstAvailableDate.timeFrom.format('HH:mm'),
      timeTo: firstAvailableDate.timeTo.format('HH:mm'),
    }
    // }

    // At the last iterate force it to to go until 17:59
    if (dynamicTime.format('HH:mm') === '17:50') {
      dynamicTime.add('9', 'minutes')
    } else {
      // Add 59 minutes in every iterate
      dynamicTime.add('59', 'minutes')
    }
  }

  return 0
  // throw new Error(
  //   `The given inputs are not valid, it should be
  //   between 08:00 and 17:59, but you passed: ${parsedTimeInput.from} and ${parsedTimeInput.to}`
  // )
}

const isOnIntersection = (currentTime, newTime) => {
  const currentTimeParsed = {
    timeFrom: moment(currentTime.timeFrom, 'HH:mm'),
    timeTo: moment(currentTime.timeTo, 'HH:mm'),
  }
  const newTimeParsed = {
    timeFrom: moment(newTime.timeFrom, 'HH:mm'),
    timeTo: moment(newTime.timeTo, 'HH:mm'),
  }

  // Check timeFrom of the current time
  // is on intersection with next time
  if (
    currentTimeParsed.timeFrom.isAfter(
      newTimeParsed.timeFrom.subtract(1, 'minutes')
    ) &&
    currentTimeParsed.timeFrom.isBefore(newTimeParsed.timeTo.add(1, 'minutes'))
  ) {
    return true
  }

  // Check timeTo of the current time
  // is on intersection with next time
  if (
    currentTimeParsed.timeTo.isAfter(newTimeParsed.timeFrom) &&
    currentTimeParsed.timeTo.isBefore(newTimeParsed.timeTo.add(1, 'minutes'))
  ) {
    return true
  }

  return false
}
module.exports.isOnIntersection = isOnIntersection
