const nearestDate = require('./utils/nearest-date')
const dateParser = require('./utils/date-parser')

// inputs = [
//   '1 14:45-14:47',
//   '2 08:24-10:54',
//   '1 08:45-12:59',
//   '3 09:56-16:25',
//   '5 15:16-16:28',
// ]

inputs = [
  //   '1 08:00-17:59',
  //   '1 12:23-16:27',
  //   '4 09:49-16:14',
  '2 8:50-9:00',
  '2 11:47-13:36',
  '2 12:47-15:05',
]

// inputs = [
//   '1 08:00-17:59',
//   '1 08:10-13:01',
//   '2 17:52-17:58',
//   '2 08:00-12:28',
//   '2 17:16-17:41',
//   '2 13:29-17:59',
//   '2 10:38-10:59',
// ]

const groupBy = (items, key) => {
  return items.reduce((result, item) => {
    ;(result[item[key]] = result[item[key]] || []).push(item)
    return result
  }, {})
}

const sortBy = (items, key) => {
  console.log('items==>', items)

  return items.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0))
}

const prepareInputs = () => {
  const arrayInputs = inputs.map((element) => dateParser(element))
  const groupedInputs = groupBy(arrayInputs, 'day')
  const sortedInputs = Object.keys(groupedInputs).map(function (key) {
    return sortBy(groupedInputs[key], 'timeFrom')
  })

  return sortedInputs
}

const getMeetingDate = () => {
  const inputs = prepareInputs()
  for (let groupTimes of inputs) {
    for (let [index, time] of groupTimes.entries()) {
      const currentNearest = nearestDate(time)
      if (!currentNearest) break
      console.log('currentNearest===>', currentNearest)
      if (groupTimes[index + 1]) {
        if (
          nearestDate.isOnIntersection(currentNearest, groupTimes[index + 1])
        ) {
          console.log('ops intersection :(')
        } else {
          console.log('no intersection', currentNearest)
          return currentNearest
        }
      } else {
        console.log('no group')
        if (currentNearest) {
          console.log('currentNearest-----true', currentNearest)
          return currentNearest
        } else {
          console.log('currentNearest-----false', currentNearest)
        }
      }

      //   console.log('index', index)
      //   if (currentNearest) return currentNearest
    }
    // groupTimes.forEach((time, index) => {
    //   console.log('time', index)
    //   if (index == 0) return
    // })
  }
  return 'nothing'
  //   inputs.map((groupTimes) => {
  //     groupTimes.map((time) => {
  //       console.log('nearestDate==>', nearestDate(time))
  //       if(nearestDate(time)){

  //       }
  //     })
  //   })
}

const init = () => {
  // console.dir(prepareInputs(), { depth: null })
  //   console.log(
  //     'nearestDate===>',
  //     nearestDate({ day: '1', timeFrom: '10:00', timeTo: '12:59' })
  //   )
  console.log('getMeetingDate====>', getMeetingDate())
  //   console.log(
  //     nearestDate.isOnIntersection(
  //       { day: '1', timeFrom: '13:00', timeTo: '13:59' },
  //       { day: '1', timeFrom: '14:00', timeTo: '15:00' }
  //     )
  //   )
}
init()
