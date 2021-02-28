const nearestDate = require('../src/utils/nearest-date')
const dateParser = require('../src/utils/date-parser')
const readInputFiles = require('../src/utils/readInputFiles')
const meeting = require('../src/meeting')
for (let i = 1; i <= 4; i++) {
  test('Test input1.txt', async () => {
    const getInputs = await readInputFiles.readFile(`./data/input${i}.txt`)
    const getOutput = await readInputFiles.readFile(`./data/output${i}.txt`)
    const availableTime = await meeting.getMeetingDate(getInputs)
    expect(dateParser.dateUnparser(availableTime)).toBe(getOutput[0])
  })
}
