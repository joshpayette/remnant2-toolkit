const fs = require('fs')
const path = require('path')

const inputFolder = path.join(__dirname, './input')
const outputFolder = path.join(__dirname, './output')
const noDataOutputFolder = path.join(outputFolder, 'nodata')

// create folders if they don't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder)
}
if (!fs.existsSync(noDataOutputFolder)) {
  fs.mkdirSync(noDataOutputFolder)
}

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
      // If not hitlocations, write text to point to Template.ObjectPath
      if (!value.Properties) {
        const objectPath = value.Template.ObjectPath
        const csvContent = `see: ${objectPath} for hit locations`
        console.info(`Writing ${file}.csv file...`)
        const outputFilePath = path.join(
          outputFolder,
          'nodata',
          `${file.replace('.json', '')}.csv`,
        )
        fs.writeFileSync(outputFilePath, csvContent)
        console.info(`File ${file}.csv written successfully!`)
        return
      }
      bodySegments = value.Properties.HitLocations
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
      EventOnRepaired: segment.EventOnRepaired,
      KillOnDestroyed: segment.KillOnDestroyed,
      DestroyedAnimTag: segment.DestroyAnimTag,
      DebrisSocketLocationOnDestroy: segment.DebrisSocketLocationOnDestroy,
      DebrisOnDestroy: segment.DebrisOnDestroy,
      bResistSpot: segment.bResistSpot,
      bIsWeakSpot: segment.bIsWeakSpot,
      AoEPriority: segment.AoEPriority,
      bAoERequiresLoS: segment.bAoERequiresLoS,
      DestroyedDependentHitLocationsToActivate:
        segment.DestroyedDependentHitLocationsToActivate,
      BoneNamesToActivateCollision: segment.BoneNamesToActivateCollision,
    }
    dataToWrite.push(dataToPush)
  }

  // Write the dataToWrite to a new CSV file
  console.info(`Writing ${file}.xlsx file...`)
  const outputFilePath = path.join(
    outputFolder,
    `${file.replace('.json', '')}.csv`,
  )

  const header = `NameID,PhysMat_ObjectName,PhysMat_ObjectPath,bCollisionInitiallyEnabled,DamageScalar,HealthRatio,EventOnDestroyed,EventOnRepaired,KillOnDestroyed,DestroyedAnimTag, DebrisSocketLocationOnDestroy,DebrisOnDestroy,bResistSpot,bIsWeakSpot,AoEPriority,bAoERequiresLoS,DestroyedDependentHitLocationsToActivate,BoneNamesToActivateCollision\n`

  let csvContent = header
  csvContent += dataToWrite
    .map(
      (data) =>
        `${data.NameID},${data.PhysMat_ObjectName},${data.PhysMat_ObjectPath},${data.bCollisionInitiallyEnabled},${data.DamageScalar},${data.HealthRatio},${data.EventOnDestroyed},${data.EventOnRepaired},${data.KillOnDestroyed},${data.DestroyedAnimTag},${data.DebrisSocketLocationOnDestroy},${data.DebrisOnDestroy},${data.bResistSpot},${data.bIsWeakSpot},${data.AoEPriority}, ${data.bAoERequiresLoS},${data.DestroyedDependentHitLocationsToActivate},${data.BoneNamesToActivateCollision}`,
    )
    .join('\n')
  fs.writeFileSync(outputFilePath, csvContent)
  console.info(`File ${file}.csv written successfully!`)
})

console.info('Script executed successfully!')
