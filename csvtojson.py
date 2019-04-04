#!usr/bin/python3
#
#Author: Charlie Chiccarine
#Email: src322@drexel.edu
#
#Last Edited: 4/3/2019
# Altered to work on directories

import os
import sys

def createJSONFileName(csvPath):
	temp = csvPath
	temp = temp.split("/")
	csvName = temp.pop()
	dirName = ""
	if len(temp) != 0:
		for sub in temp:
			dirName += sub + "/"
	else:
		dirName = "./"
	
	temp = csvName.split(".")
	temp.pop()
	
	jsonName = ""
	for sub in temp:
		jsonName += sub + "."
	jsonName += "json"

	jsonName = dirName + jsonName
	return jsonName

def convertCSV(csvFileName):
	jsonFileName = createJSONFileName(csvFileName)

	csvFile = open(csvFileName)
	jsonFile = open(jsonFileName, "w")

	csvFile = csvFile.readlines()
	
	#Removes new line characters and splits the csv file into a list of lists
	for i in range(len(csvFile)):
		csvFile[i] = csvFile[i].replace("\n", "")
		csvFile[i] = csvFile[i].split(",")

	jsonFile.write("[")
	for i in range(len(csvFile) - 1):
		i += 1

		if i != 1:
			jsonFile.write(",")

		jsonFile.write("{")
		for j in range(len(csvFile[i])):
			if j != 0:
				jsonFile.write(",")
			jsonFile.write("\"" + csvFile[0][j] + "\" : \"" + csvFile[i][j] + "\"")
		jsonFile.write("}")
	jsonFile.write("]")

	print("The JSON file for", csvFileName, "is at", jsonFileName)

if __name__ == "__main__":
	onDir = False

	if len(sys.argv) != 1:		
		if sys.argv[1] == "-d":
			if len(sys.argv) < 3:
				print( "Incorrect Usage" )
				print( "For individual file:" )
				print( "  python3 csvtojson.py [fileName.csv]" )
				print( "For all .csv files in a directory:" )
				print( "  python3 csvtojson.py -d [directoryName]" )
				sys.exit()
			
			dirName = sys.argv[2]	
			onDir = True
		else:	
			csvFileName = sys.argv[1]
	else:
		csvFileName = input("CSV File:")

	if onDir:
		for csv in os.listdir( dirName ):
			if csv[-4:] != ".csv":
				continue
			pathName = dirName + "/" + csv
			convertCSV(pathName)

	else:
		convertCSV(csvFileName)

	print( "Completed" )
