#!/bin/bash
content=$(echo cat -s "config/npm-config.json") 
shouldGenerate=$(echo jq -r '.shouldGenerate' <<< "${content}") 
echo ${shouldGenerate}

if [ ${shouldGenerate} ==: 'true' ]
then
	echo "New version being generated..."
else
	echo "Error! Make sure to change should generate to true for a new version number"
	exit 64
fi