#!usr/bin/python3
#Author: Charlie Chiccarine
#Email: src322@drexel.edu
#Last Editted: 3/28/2019
#Purpose: 
#  Alter CSV files for my Pokemon card collection
#  Currently they are formatted for Google Sheets
#  Need to be ready for the database

import sys

if __name__ == "__main__":
    csvName = sys.argv[1]
    
    csvFile = open(csvName).readlines()
    allCardsCSV = open("allcards.csv", "a")

    setnum = csvFile[1].split(",")
    setnum = setnum[6]
    setnum = setnum.split("/")
    setnum = setnum[1]

    for i in range(len(csvFile) - 1):
        line = csvFile[i + 1]
        line = line.split(",")
        line[7] = csvName.split(".")[0]
        print( line )
        
        appendLine = ""
        print( appendLine )
        for element in line:
            appendLine += element + ","
        
        allCardsCSV.write(appendLine)

    totalcards = len(csvFile)
    print( totalcards )
    print( setnum )
