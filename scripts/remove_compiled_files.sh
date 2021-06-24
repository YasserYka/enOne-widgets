#!/bin/bash

# when you modify index.js file of a widget manually you need to delete its compiled.js file
# this script will help you to find and delete all compiled.js files 

TARGET_FILE_NAMES="compiled.js"

SOURCE_DIRECTORY=.

echo -e "\n"

find $SOURCE_DIRECTORY -name $TARGET_FILE_NAMES -print

echo -e "\n"

find $SOURCE_DIRECTORY -name $TARGET_FILE_NAMES -delete

echo -e "These compiled widget files were removed successfully.\n"
