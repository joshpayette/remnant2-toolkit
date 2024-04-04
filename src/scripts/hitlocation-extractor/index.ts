import fs from 'fs'
import path from 'path'

type HitLocationSegment = {
  NameID: string
  PhysMat: {
    ObjectName: string
    ObjectPath: string
  }
  bCollisionInitiallyEnabled: true
  DamageScalar: number
  HealthRatio: 1
  EventOnDestroyed: string
  EventOnRepaired: string
  KillOnDestroyed: boolean
  DestroyedAnimTag: string
  DebrisSocketLocationOnDestroy: string
  DebrisOnDestroy: string | null
  bResistSpot: boolean
  bIsWeakSpot: boolean
  AoEPriority: number
  bAoERequiresLoS: boolean
  DestroyedDependentHitLocationsToActivate: string[]
  BoneNamesToActivateCollision: []
}

const CSV_HEADERS = [
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
  'DebrisOnDestroy',
  'bResistSpot',
  'bIsWeakSpot',
  'AoEPriority',
  'bAoERequiresLoS',
  'DestroyedDependentHitLocationsToActivate',
  'BoneNamesToActivateCollision',
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

  const inputFileNames = fs.readdirSync(INPUT_FOLDER)
  inputFileNames.forEach((inputFileName) => {
    console.info(`Reading ${inputFileName} file...`)

    const filePath = path.join(INPUT_FOLDER, inputFileName)
    const jsonContent = fs.readFileSync(filePath, 'utf8')
    const parsedData = JSON.parse(jsonContent)

    let hitLocationSegments: HitLocationSegment[] = []

    // The data is an array of objects
    // We are looking for the object with Type: HitLogComponent
    for (const key in parsedData) {
      const value = parsedData[key]

      if (isHitLogComponent(value)) {
        // If no Properties key, then the file has no HitLocation information
        if (!value.Properties) {
          createNoDataFile(value, inputFileName)
          return
        }

        // If the current object has HitLocation information, store it and break the loop
        hitLocationSegments = value.Properties.HitLocations
        break
      }
    }

    let csvContent = CSV_HEADERS.join(',') + '\n'

    for (const segment of hitLocationSegments) {
      const row = [
        segment.NameID,
        segment.PhysMat.ObjectName,
        segment.PhysMat.ObjectPath,
        segment.bCollisionInitiallyEnabled,
        segment.DamageScalar,
        segment.HealthRatio,
        segment.EventOnDestroyed,
        segment.EventOnRepaired,
        segment.KillOnDestroyed,
        segment.DestroyedAnimTag,
        segment.DebrisSocketLocationOnDestroy,
        segment.DebrisOnDestroy,
        segment.bResistSpot,
        segment.bIsWeakSpot,
        segment.AoEPriority,
        segment.bAoERequiresLoS,
        segment.DestroyedDependentHitLocationsToActivate.join('|'),
        segment.BoneNamesToActivateCollision.join('|'),
      ]

      csvContent += row.join(',') + '\n'
    }

    const outputFileName = path.join(
      OUTPUT_FOLDER,
      inputFileName.replace('.json', '.csv'),
    )

    console.info(`Writing ${outputFileName}.csv file...`)
    fs.writeFileSync(outputFileName, csvContent)
    console.info(`File ${outputFileName}.csv written successfully!`)
  })
}

// Run the script
main()
