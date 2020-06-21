#!/bin/bash

CSV_SRC="./csvFiles"
TCG_SRC="${CSV_SRC}/tcgfiles"
INFO_SRC="${CSV_SRC}/infofiles"
HTML_SRC="./docs"

TCGINFO_SRC="${INFO_SRC}/setsinfo.csv"
INFO_CONTENT=`cat ${TCGINFO_SRC}`

TEMPLATE=`cat docs/template.html`

echo "Building sets pages..."

OIFS=$IFS
IFS=$'\n'
HEADING=0
MENU_CONTENT="<h3>Sets</h3><table><tr>"
TABLE_WIDTH=3
CURR_TD=1

for LINE in ${INFO_CONTENT}
do
	# Skip the header line in the csv file
	if [ ${HEADING} = 0 ]
	then
		HEADING=1
		continue
	fi
	
	# oh my goodness this code is a mess but it works
	# Parse the line of the csv file
	SET_NAME=`echo "${LINE}" | awk -F "," '{print $1}'`
	SET_YEAR=`echo "${LINE}" | awk -F "," '{print $2}'`
	SET_TOTAL=`echo "${LINE}" | awk -F "," '{print $3}'`
	SET_COUNT=`echo "${LINE}" | awk -F "," '{print $4}'`
	SET_NUM=`echo "${LINE}" | awk -F "," '{print $5}'`
	SET_CATEGORY=`echo "${LINE}" | awk -F "," '{print $6}'`
	
	echo "Starting ${SET_NAME}"

	# Use the SET_NAME to get the file names from my homemade, organic, non-GMO relational database
	# Basically the SET_NAME is the pretty version of the name
	# Each file name can be derived from the SET_NAME by removing the spaces and making it lowercase
	# EX : Unified Minds > UnifiedMinds > unifiedminds > add appropriate extension
	SET_FNAME=`echo "${SET_NAME}" | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]'`
	SET_CSV="${SET_FNAME}.csv"
	SET_IMG="${SET_FNAME}.png"
	SET_TITLEIMG="${SET_FNAME}title.png"
	SET_HTML="${SET_FNAME}.html"

	SET_LINK="<td><a href=\"${SET_HTML}\">${SET_NAME}</a></td>"
	MENU_CONTENT="${MENU_CONTENT}${SET_LINK}"

	if [ ${CURR_TD} -lt ${TABLE_WIDTH} ]
	then
		CURR_TD=$(( CURR_TD + 1 ))
	else
		CURR_TD=1
		MENU_CONTENT="${MENU_CONTENT}</tr><tr>"
	fi

	echo "  Added to landing menu"

	SET_TABLE=`awk -f scripts/setTable.awk ${TCG_SRC}/${SET_CSV}`
	

	echo "  Built set table"

	HTML_CONTENT=${TEMPLATE}
	HTML_CONTENT="${HTML_CONTENT/<!-- CONTENT -->/${SET_TABLE}}"
	echo "${HTML_CONTENT}" > ${HTML_SRC}/${SET_HTML}

	echo "  Built HTML file"

	echo "  Completed ${SET_NAME}"

done
IFS=$OIFS

MENU_CONTENT="${MENU_CONTENT}</tr></table>"

INDEX=${TEMPLATE}
INDEX="${INDEX/<!-- CONTENT -->/${MENU_CONTENT}}"

echo "${INDEX}" > docs/index.html


