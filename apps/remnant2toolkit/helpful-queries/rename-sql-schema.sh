# First, dump the database from mysql to the current folder via:
# pscale database dump [database] [branch]

# Next run this script
# Update DIRECTORY to the absolute and full file path
# Then run `sh rename-sql-schema.sh`

# When done, run the following to import it
# cat pscale_dump_folder/*.sql | mysql dbname -u root -p

#!/bin/bash

# Directory to check
DIRECTORY="C:\path\to\dbdump\pscale"

# Loop through all files in the directory
for FILE in "$DIRECTORY"/*; do
  # Check if the file name contains the word 'schema'
  if [[ "$(basename "$FILE")" == *schema* ]]; then
    # Get the directory and the base name of the file
    DIR=$(dirname "$FILE")
    BASENAME=$(basename "$FILE")
    
    # Rename the file by prefixing it with '1'
    mv "$FILE" "$DIR/1$BASENAME"
  fi
done