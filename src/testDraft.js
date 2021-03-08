const readInputFiles = require('./utils/readInputFiles')

const dateParser = (initDate) => {
  const preparedDate = {
    day: initDate.split(' ')[0],
    min: initDate.split(' ')[1].split('-')[0],
    max: initDate.split('-')[1],
  }
  return preparedDate
}

function findMeeting(data) {
  const inputs = prepareInputs(data)
  for (let element of inputs) {
    checkResult = checkGroup(element)
    // if (!checkResult) {
    //   console.log('No disponibility in day: ', element[0].day)
    //   return false
    // }
    console.log('checkResult', checkResult)
    if (checkResult) {
      return checkResult
    }
  }
}

function checkGroup(inputs) {
  const min = stringToMinutes('08:00')
  const max = stringToMinutes('17:59')
  let tmpMax = min

  const inputsFormatted = inputs.map((value) => ({
    min: stringToMinutes(value.min),
    max: stringToMinutes(value.max),
  }))
  let dynamicValue = min
  let isFound = false
  for (let [index, el] of inputsFormatted.entries()) {
    dynamicValue = tmpMax
    // if (el.max + 60 > max || dynamicValue + 60 > max) {
    //   return false
    // }

    // '1 08:45-10:00',
    // '1 14:00-16:00',

    while (el.max <= max && dynamicValue <= tmpMax && !isFound) {
      let hasIntersection = checkIntersection(inputsFormatted, dynamicValue)
      // console.log({
      //   hasIntersection,
      //   inputsFormatted,
      //   dynamicValue,
      // })
      if (!hasIntersection) {
        return {
          day: inputs[0].day,
          min: minutesToString(dynamicValue),
          max: minutesToString(dynamicValue + 59),
        }
      }

      if (el.max > tmpMax) {
        tmpMax = el.max
      }
      dynamicValue++
    }
  }
  // if (dynamicValue + 60 < max) {
  //   return {
  //     finish: 'OK',
  //     day: inputs[0].day,
  //     min: minutesToString(dynamicValue),
  //     max: minutesToString(dynamicValue + 59),
  //   }
  // }
}

const checkIntersection = (inputsFormatted, dynamicValue) => {
  let hasIntersection = false
  for (let [index, el2] of inputsFormatted.entries()) {
    if (dynamicValue >= el2.min && dynamicValue <= el2.max) {
      hasIntersection = true
    }
    if (dynamicValue + 60 > el2.min && dynamicValue + 60 < el2.max) {
      hasIntersection = true
    }
  }
  return hasIntersection
}

const groupBy = (items, key) => {
  return items.reduce((result, item) => {
    ;(result[item[key]] = result[item[key]] || []).push(item)
    return result
  }, {})
}

const sortBy = (items, key) => {
  return items.sort((a, b) => {
    if (stringToMinutes(a[key]) > stringToMinutes(b[key])) {
      return 1
    } else if (stringToMinutes(b[key]) > stringToMinutes(a[key])) {
      return -1
    } else {
      return 0
    }
  })
}

const prepareInputs = (inputs) => {
  const arrayInputs = inputs.map((element) => dateParser(element))
  const groupedInputs = groupBy(arrayInputs, 'day')
  const sortedInputs = Object.keys(groupedInputs).map(function (key) {
    return sortBy(groupedInputs[key], 'min')
  })

  return sortedInputs
}

var stringToMinutes = function (m) {
  const hours = Number(m.split(':')[0])
  const minutes = Number(m.split(':')[1])
  let total = hours * 60 + minutes
  return Number(total)
}

const minutesToString = (totalMinutes) => {
  let minutes = formatTime(totalMinutes % 60)
  let hours = formatTime((totalMinutes - minutes) / 60)
  return hours + ':' + minutes
}

const formatTime = (time) => {
  if (time < 10) {
    return `0${time}`
  }
  return String(time)
}

async function init() {
  const getInputs = await readInputFiles.readFile('./data/inputTest4.txt')
  console.log('findMeeting', findMeeting(getInputs))
}
init()

// console.log(findMeeting())
// console.log(checkGroup())
// console.log(formatTime(13))
// stringToMinutes('08:30')
// minutesToNumber(510)
