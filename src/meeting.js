const nearestDate = require('./utils/nearest-date')
const dateParser = require('./utils/date-parser')
const readInputFiles = require('./utils/readInputFiles')

async function readInputs() {
  const res = await readInputFiles.readFile('./data/input1.txt')
  return res
}

var minutesOfDay = function (m) {
  const hours = m.split(':')[0]
  const minutes = m.split(':')[1]
  const total = hours * 60 + minutes
  return Number(total)
}

const groupBy = (items, key) => {
  return items.reduce((result, item) => {
    ;(result[item[key]] = result[item[key]] || []).push(item)
    return result
  }, {})
}

const sortBy = (items, key) => {
  return items.sort((a, b) => {
    if (minutesOfDay(a[key]) > minutesOfDay(b[key])) {
      return 1
    } else if (minutesOfDay(b[key]) > minutesOfDay(a[key])) {
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
    return sortBy(groupedInputs[key], 'timeFrom')
  })

  return sortedInputs
}

const getMeetingDate = async (data) => {
  const inputs = prepareInputs(data)
  let currentNearest = null
  for (let groupTimes of inputs) {
    for (let [index, time] of groupTimes.entries()) {
      if (index > 0) {
        currentNearest = nearestDate(currentNearest, true, time)
      } else currentNearest = nearestDate(time)
      if (!currentNearest) break
      if (groupTimes[index + 1]) {
        if (
          nearestDate.isOnIntersection(currentNearest, groupTimes[index + 1])
        ) {
          console.log('ops intersection :(')
        } else {
          return currentNearest
        }
      } else {
        if (currentNearest) {
          return currentNearest
        } else {
        }
      }
    }
  }
  return false
}
module.exports.getMeetingDate = getMeetingDate
