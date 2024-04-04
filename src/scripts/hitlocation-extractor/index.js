const fs = require('fs')
const path = require('path')

function createNoDataFile(value, file, noDataOutputFolder) {
  console.info(`Writing ${file}.csv file...`)

  const objectPath = value.Template.ObjectPath
  const csvContent = `see: ${objectPath} for hit locations`
  const outputFilePath = path.join(
    noDataOutputFolder,
    `${file.replace('.json', '')}.csv`,
  )
  fs.writeFileSync(outputFilePath, csvContent)
  console.info(`File ${file}.csv written successfully!`)
}

function main() {
  const inputFolder = path.join(__dirname, './input')
  const outputFolder = path.join(__dirname, './output')
  /** The folder for files that don't have HitLocation information */
  const noDataOutputFolder = path.join(outputFolder, 'nodata')

  // create folders if they don't exist
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder)
  }
  if (!fs.existsSync(noDataOutputFolder)) {
    fs.mkdirSync(noDataOutputFolder)
  }

  // Read all files in the input folder
  const files = fs.readdirSync(inputFolder)

  files.forEach((file) => {
    console.info(`Reading ${file} file...`)

    // Read the JSON file content
    const filePath = path.join(inputFolder, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(content)

    /** Stores the parsed hitLocations */
    let hitLocationSegments = []

    // The data is an array of keyless objects
    // We are looking for the object with Type: HitLogComponent
    for (const obj in data) {
      const value = data[obj]

      if (value.Type === 'HitLogComponent') {
        // If no Properties key, then the file has no HitLocation information
        if (!value.Properties) {
          createNoDataFile(value, file, noDataOutputFolder)
          return
        }

        // If the current object has HitLocation information, store it and break the loop
        hitLocationSegments = value.Properties.HitLocations
        break
      }
    }

    /** The content that will ultimately be written to the CSV output for this file. */
    const dataToWrite = []
    for (const segment of hitLocationSegments) {
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

    // Initialize the CSV data with the column headers
    let csvContent = `NameID,PhysMat_ObjectName,PhysMat_ObjectPath,bCollisionInitiallyEnabled,DamageScalar,HealthRatio,EventOnDestroyed,EventOnRepaired,KillOnDestroyed,DestroyedAnimTag, DebrisSocketLocationOnDestroy,DebrisOnDestroy,bResistSpot,bIsWeakSpot,AoEPriority,bAoERequiresLoS,DestroyedDependentHitLocationsToActivate,BoneNamesToActivateCollision\n`
    // Add the data to the CSV content
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
}

// Run the script
main()
