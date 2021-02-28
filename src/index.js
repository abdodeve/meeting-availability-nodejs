const readInputFiles = require('./utils/readInputFiles')
const meeting = require('./meeting')
const dateParser = require('./utils/date-parser')

const init = async () => {
  const getInputs = await readInputFiles.readFile('./data/input1.txt')
  const retrieveMeeting = await meeting.getMeetingDate(getInputs)
  const unParsedDate = dateParser.dateUnparser(retrieveMeeting)
  console.log('getMeetingDate====>', unParsedDate)
}
init()
