#!/usr/bin/python3
#Author: Charlie Chiccarine
#Email: src322@drexel.edu
#Last Editted: 4/2/2019
#  Updated some things
#Purpose: 
#  Alter CSV files for my Pokemon card collection
#  Currently they are formatted for Google Sheets
#  Need to be ready for the database

import sys

if __name__ == "__main__":
	if len(sys.argv) > 1:
		csvName = sys.argv[1]
	else:
		csvName = input("CSV File Name: ")

	csvFile = open(csvName).readlines()
	

	setnum = csvFile[1].split(",")
	setnum = setnum[6]
	setnum = setnum.split("/")
	setnum = setnum[1]

	print( csvFile[0] )

	for i in range(len(csvFile) - 1):
		line = csvFile[i + 1]
		line = line.split(",")
		line[7] = csvName.split(".")[0]
		
		appendLine = ""
		for j in range(len(line)):
			if j != 0 and j != (len(line) - 1):
				appendLine += ","
			appendLine += line[j]
		print( appendLine )
	
	totalcards = len(csvFile)
	print( totalcards )
	print( setnum )

