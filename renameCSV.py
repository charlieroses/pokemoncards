#!usr/bin/python3
#
#Author: Charlie Chiccarine
#Email: src322@drexel.edu
#
#Last Editted: 4/2/2019
#  Created Script
#
#Purpose:
#  Takes the argument of a directory
#  Takes all the csv files starting with "Pokemon Cards"
#  Moves them to a new csv file
#  New name is the name of the set in lowercase and no spaces

import os
import sys

if __name__ == "__main__":
	if len(sys.argv) == 1:
		print( "Incorrect Usage. Please give a directory" )
		sys.exit()

	dirName = sys.argv[1]
	dirFiles = os.listdir( dirName )

	for fileName in dirFiles:
		if fileName.split()[0] == "Pokemon":
			temp = fileName.lower()
			temp = temp.split()

			newFileName = ""
			for i in range(3, len(temp)):
				newFileName += temp[i]
			
			oldPath = dirName + "/" + fileName
			newPath = dirName + "/" + newFileName
			os.renames(oldPath, newPath)
			print( "Moved", fileName)

	print( "Complete" )
