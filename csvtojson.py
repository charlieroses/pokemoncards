#!usr/bin/python3
#
#Author: Charlie Chiccarine
#Email: src322@drexel.edu
#
#Last Edited: 4/2/2019
# Created the script

import sys

def createJSONFileName(csvName):
	temp = csvName
	temp = temp.split(".")
	temp.pop()
	jsonName = ""
	for sub in temp:
		jsonName += sub + "."
	jsonName += "json"
	return jsonName

if __name__ == "__main__":
	if len(sys.argv) != 1:
		csvFileName = sys.argv[1]
	else:
		csvFileName = input("CSV File:")

	jsonFileName = createJSONFileName(csvFileName)

	csvFile = open(csvFileName)
	jsonFile = open(jsonFileName, "w")

	csvFile = csvFile.readlines()
	
	#Removes new line characters and splits the csv file into a list of lists
	for i in range(len(csvFile)):
		csvFile[i] = csvFile[i][0:-1]
		csvFile[i] = csvFile[i].split(",")
	
	jsonFile.write("[")
	for i in range(1, len(csvFile)):
		if i != 1:
			jsonFile.write(",")

		jsonFile.write("{")
		for j in range(len(csvFile[i])):
			if j != 0:
				jsonFile.write(",")

			jsonFile.write("\"" + csvFile[0][j] + "\" : \"" + csvFile[i][j] + "\"")
		jsonFile.write("}")
	jsonFile.write("]")

	print("Completed")
	print("The JSON file for", csvFileName, "is at", jsonFileName)
