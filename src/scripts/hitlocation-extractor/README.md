# Remnant 2 HitLocation Extractor

This script extracts the HitLocations from the Remnant 2 game files.

## Requirements

- [NodeJS](https://nodejs.org/en/)

## Usage

1. Place the `.json` files in the `input` folder. **The files need to be in the `input` folder and not in any subfolders.**
2. Open a terminal and navigate to the script folder.
3. Run the following command:

```bash
npx ts-node index.ts
```

4. The extracted HitLocations will be saved in the `output` folder.
5. Any files that do not have HitLocations will be saved in the `output/nodata` folder.
