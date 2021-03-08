const moment = require('moment')

module.exports = (inputDate, isMultipeTimes = false, nextTime = null) => {
  console.log({ inputDate, nextTime })
  let startTime
  const parsedDate = inputDate
  const parsedTimeInput = {
    ...parsedDate,
    ...{
      timeFrom: moment(parsedDate.timeFrom, 'HH:mm'),
      timeTo: moment(parsedDate.timeTo, 'HH:mm'),
    },
  }
  if (isMultipeTimes) startTime = moment(parsedTimeInput.timeFrom)
  else startTime = moment('07:59', 'HH:mm')

  const endTime = moment('17:59', 'HH:mm')
  let dynamicTime = moment(startTime)
  let isTimeToReset = false

  // Iterate from 08:00 to 17:59
  while (dynamicTime.isBefore(endTime)) {
    console.log('dynamicTime', dynamicTime)
    if (
      moment(dynamicTime).isAfter(moment(parsedTimeInput.timeTo)) &&
      !isTimeToReset
    ) {
      isTimeToReset = true
      dynamicTime = moment(parsedTimeInput.timeTo)
    }

    const firstAvailableDate = {
      timeFrom: moment(dynamicTime).add('1', 'minutes'),
      timeTo: moment(dynamicTime).add('60', 'minutes'),
    }

    // Check if the firstAvailableDate.from + 60 minutes doesn't excess 17:59 (endTime)
    if (moment(firstAvailableDate.timeTo).isAfter(moment(endTime))) {
      return false
    }
    if (nextTime) {
      if (
        !isOnIntersection(firstAvailableDate, nextTime) &&
        moment(firstAvailableDate.timeTo, 'HH:mm') <
          moment(nextTime.timeTo, 'HH:mm')
      ) {
        console.log('1')
        return {
          ...parsedTimeInput,
          timeFrom: firstAvailableDate.timeFrom.format('HH:mm'),
          timeTo: firstAvailableDate.timeTo.format('HH:mm'),
        }
      }
    } else {
      if (!isOnIntersection(firstAvailableDate, parsedTimeInput)) {
        return {
          ...parsedTimeInput,
          timeFrom: firstAvailableDate.timeFrom.format('HH:mm'),
          timeTo: firstAvailableDate.timeTo.format('HH:mm'),
        }
      }
    }

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
