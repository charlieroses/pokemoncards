#!usr/bin/python3
#
#Author: Charlie Chiccarine
#Email: src322@drexel.edu
#
#Purpose:
# Compile all the tcg csv files into one large csv file
#
#Last Edited: 6/20/2019
# Created the script

import os
import sys

if __name__ == "__main__":
	if sys.argv[1] == "-h" or sys.argv[1] == "--help":
		print("python3 combinecsv.py [directory name]")
		print("The first csv file will be used as the template")
		print("All following csv files should match the top line")
		sys.exit()

	dirName = sys.argv[1]		
	finalFile = open("alltcgcards.csv", "w")
	header = ""
	firstCSV = True

	for csv in os.listdir( dirName ):
		if csv[-4:] != ".csv":
			continue

		pathName = dirName + "/" + csv
		print("Started", pathName)
		currCSV = open(pathName, "r")
		currCSV = currCSV.readlines()

		if firstCSV:
			header = currCSV[0]
			finalFile.write(header)
			firstCSV = False

		if currCSV[0] != header:
			print( "ERROR : UNABLE TO COPY CSV" )
			print( "  CSV File does not match the original header" )
			print( "  Header  :", header)
			print( "  CurrCSV :", currCSV[0])
			print( "Ended", pathName )
			continue

		for line in currCSV:
			if line == header:
				continue
			tline = line.split(",")
			tline[7] = csv[:-4]
			sline = ""
			for i in tline:
				if i == tline[-1]:
					sline += i
				else:
					sline += i + ","
			finalFile.write(sline)	
		print( "Ended", pathName )
	print( "Completed: Completed file at alltcgcards.csv" )
