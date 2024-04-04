# Remnant 2 HitLocation Extractor

This script extracts the HitLocations from the Remnant 2 game files.

## Requirements

- [NodeJS]](https://nodejs.org/en/)

## Usage

1. Place the `.json` files in the `input` folder. **The files need to be in the `input` folder and not in any subfolders.**
2. Run the script with:

```bash
cd src/scripts/hitlocation-extractor
npx ts-node index.ts
```

3. The extracted HitLocations will be saved in the `output` folder.
4. Any files that do not have HitLocations will be saved in the `output/nodata` folder.
