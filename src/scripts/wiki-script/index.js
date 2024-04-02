const fs = require('fs')
const path = require('path')

const inputFolder = path.join(__dirname, './input')
const outputFolder = path.join(__dirname, './output')

const files = fs.readdirSync(inputFolder)

files.forEach((file) => {
  console.info(`Reading ${file} file...`)
  const filePath = path.join(inputFolder, file)
  // Read the JSON file content
  const content = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(content)

  let bodySegments = []

  for (const key in data) {
    const value = data[key]
    if (value.Type === 'HitLogComponent') {
      bodySegments = value.Properties['']
      break
    }
  }

  const dataToWrite = []
  for (const segment of bodySegments) {
    const dataToPush = {
      NameID: segment.NameID,
      PhysMat_ObjectName: segment.PhysMat.ObjectName,
      PhysMat_ObjectPath: segment.PhysMat.ObjectPath,
      bCollisionInitiallyEnabled: segment.bCollisionInitiallyEnabled,
      DamageScalar: segment.DamageScalar,
      HealthRatio: segment.HealthRatio,
      EventOnDestroyed: segment.EventOnDestroyed,
      bIsWeakSpot: segment.bIsWeakSpot,
    }
    dataToWrite.push(dataToPush)
  }

  console.info('dataToWrite', dataToWrite)

  // Write the dataToWrite to a new CSV file
  console.info(`Writing ${file}.xlsx file...`)
  const outputFilePath = path.join(
    outputFolder,
    `${file.replace('.json', '')}.csv`,
  )
  const header =
    'NameID,PhysMat_ObjectName,PhysMat_ObjectPath,bCollisionInitiallyEnabled,DamageScalar,HealthRatio,EventOnDestroyed,bIsWeakSpot\n'
  let csvContent = header
  dataToWrite.forEach((data) => {
    csvContent += `${data.NameID},${data.PhysMat},${data.bCollisionInitiallyEnabled},${data.DamageScalar},${data.HealthRatio},${data.EventOnDestroyed},${data.blsWeakSpot}\n`
  })
  fs.writeFileSync(outputFilePath, csvContent)
  console.info(`File ${file}.csv written successfully!`)
})

console.info('Script executed successfully!')
