import fs from 'fs'
import path from 'path'

type HitLocationSegment = {
  NameID: string
  PhysMat: {
    ObjectName: string
    ObjectPath: string
  } | null
  bCollisionInitiallyEnabled: true
  DamageScalar: number
  HealthRatio: 1
  EventOnDestroyed: string
  EventOnRepaired: string
  KillOnDestroyed: boolean
  DestroyedAnimTag: string
  DebrisSocketLocationOnDestroy: string
  DebrisOnDestroy: {
    ObjectName: string
    ObjectPath: string
  } | null
  bResistSpot: boolean
  bIsWeakSpot: boolean
  AoEPriority: number
  bAoERequiresLoS: boolean
  DestroyedDependentHitLocationsToActivate: string[]
  BoneNamesToActivateCollision: []
}

const CSV_HEADERS = [
  'Source Name',
  'NameID',
  'PhysMat_ObjectName',
  'PhysMat_ObjectPath',
  'bCollisionInitiallyEnabled',
  'DamageScalar',
  'HealthRatio',
  'EventOnDestroyed',
  'EventOnRepaired',
  'KillOnDestroyed',
  'DestroyedAnimTag',
  'DebrisSocketLocationOnDestroy',
  'DebrisOnDestroy_ObjectName',
  'DebrisOnDestroy_ObjectPath',
  'bResistSpot',
  'bIsWeakSpot',
  'AoEPriority',
  'bAoERequiresLoS',
  'DestroyedDependentHitLocationsToActivate',
  'BoneNamesToActivateCollision',
  'WeakSpotDamageScalar',
]

type HitLogComponent = {
  Type: 'HitLogComponent'
  Name: 'HitLogComp'
  Outer: string
  Class: string
  Template: {
    ObjectName: string
    ObjectPath: string
  }
  Properties?: {
    WeakSpotDamageScalar?: number
    HitLocations: HitLocationSegment[]
  }
}

function isHitLogComponent(value: any): value is HitLogComponent {
  return value.Type === 'HitLogComponent'
}

const INPUT_FOLDER = path.join(__dirname, './input')
const OUTPUT_FOLDER = path.join(__dirname, './output')
const NO_DATA_FOLDER = path.join(__dirname, './output/no-data')

const OUTPUT_FILE_NAME = path.join(OUTPUT_FOLDER, 'hit-location-output.csv')

function recreateOutputFolders() {
  // delete folders
  if (fs.existsSync(OUTPUT_FOLDER)) {
    fs.rmdirSync(OUTPUT_FOLDER, { recursive: true })
  }
  if (fs.existsSync(NO_DATA_FOLDER)) {
    fs.rmdirSync(NO_DATA_FOLDER, { recursive: true })
  }

  // create folders
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER)
  }
  if (!fs.existsSync(NO_DATA_FOLDER)) {
    fs.mkdirSync(NO_DATA_FOLDER)
  }
}

function createNoDataFile(value: HitLogComponent, fileName: string) {
  const objectPath = value.Template.ObjectPath
  const csvContent = `see: ${objectPath} for hit locations`

  console.info(`Writing ${fileName}.csv file...`)

  const outputFilePath = path.join(
    NO_DATA_FOLDER,
    `${fileName.replace('.json', '')}.csv`,
  )
  fs.writeFileSync(outputFilePath, csvContent)

  console.info(`File ${fileName}.csv written successfully!`)
}

function main() {
  console.info('Starting the HitLocation script...')

  recreateOutputFolders()

  let csvContent = CSV_HEADERS.join(',') + '\n'

  const inputFileNames = fs.readdirSync(INPUT_FOLDER)
  inputFileNames.forEach((inputFileName) => {
    console.info(`Reading ${inputFileName} file...`)

    const filePath = path.join(INPUT_FOLDER, inputFileName)
    const jsonContent = fs.readFileSync(filePath, 'utf8')
    const parsedData = JSON.parse(jsonContent)

    let hitLocationSegments: HitLocationSegment[] = []
    const otherProperties = []

    // The data is an array of objects
    // We are looking for the object with Type: HitLogComponent
    for (const key in parsedData) {
      const value = parsedData[key]

      if (isHitLogComponent(value)) {
        if (!value.Template && !value.Properties) {
          console.error(
            `File ${inputFileName} has no Template and Properties key. Skipping it.`,
          )
          return
        }

        if (!value.Properties) {
          createNoDataFile(value, inputFileName)
          return
        }

        if (!value.Properties.HitLocations) {
          console.error(
            `File ${inputFileName} has no HitLocations key. Skipping it.`,
          )
          return
        }

        // If the current object has HitLocation information, store it and break the loop
        hitLocationSegments = value.Properties.HitLocations

        // Add other Properties
        // ! Must be pushed in the same order as CSV_HEADERS
        otherProperties.push(
          value.Properties.WeakSpotDamageScalar?.toString() || '',
        )

        break
      }
    }

    for (const segment of hitLocationSegments) {
      let row = [
        inputFileName.replace('.json', '.uasset'),
        segment.NameID,
        segment.PhysMat?.ObjectName ?? null,
        segment.PhysMat?.ObjectPath ?? null,
        segment.bCollisionInitiallyEnabled,
        segment.DamageScalar,
        segment.HealthRatio,
        segment.EventOnDestroyed,
        segment.EventOnRepaired,
        segment.KillOnDestroyed,
        segment.DestroyedAnimTag,
        segment.DebrisSocketLocationOnDestroy,
        segment.DebrisOnDestroy?.ObjectName ?? null,
        segment.DebrisOnDestroy?.ObjectPath ?? null,
        segment.bResistSpot,
        segment.bIsWeakSpot,
        segment.AoEPriority,
        segment.bAoERequiresLoS,
        segment.DestroyedDependentHitLocationsToActivate.join('|'),
        segment.BoneNamesToActivateCollision.join('|'),
      ]

      // Add other properties
      row = row.concat(otherProperties)

      csvContent += row.join(',') + '\n'
    }
  })

  console.info(`Writing ${OUTPUT_FILE_NAME}.csv file...`)
  fs.writeFileSync(OUTPUT_FILE_NAME, csvContent)
  console.info(`File ${OUTPUT_FILE_NAME}.csv written successfully!`)
}

// Run the script
main()
