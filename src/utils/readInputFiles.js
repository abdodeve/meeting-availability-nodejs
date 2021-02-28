const fs = require('fs')

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8')

    const convertedTextToArray = data.toString().split('\r\n')
    return convertedTextToArray
  } catch (err) {
    console.error(err)
    return false
  }
}
module.exports.readFile = readFile
