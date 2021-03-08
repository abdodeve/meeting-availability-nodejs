const readInputFiles = require('./utils/readInputFiles')
const meeting = require('./meeting')
const dateParser = require('./utils/date-parser')
fs = require('fs')

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

const testFuncWtire = async () => {
  const getInputs = await readInputFiles.readFile('./data/input5.txt')
  const remove = getInputs.filter((element, index) => {
    if (
      element.split(' ')[0] == 1 &&
      Number(element.split(' ')[1].split('-')[0].split(':')[0]) < 16
    )
      return element
  })
  console.log({ remove })
  const convertToString = remove.reduce((cumule, newEL) => {
    return cumule + '\r\n' + newEL
  })

  fs.writeFile('helloworld.txt', convertToString, function (err) {
    if (err) return console.log(err)
    console.log('Hello World > helloworld.txt')
  })
  console.log(remove)
}

const testFuncRead = async () => {}

const init = async () => {
  // await testFuncWtire()
  const getInputs = await readInputFiles.readFile('./data/input5.txt')
  // const getInputs = await readInputFiles.readFile('./helloworld.txt')
  const retrieveMeeting = await meeting.getMeetingDate(getInputs)
  const unParsedDate = dateParser.dateUnparser(retrieveMeeting)
  console.log('getMeetingDate====>', unParsedDate)
}
init()
