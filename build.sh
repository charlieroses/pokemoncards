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
MENU_CONTENT="<h3>TCG Sets</h3><table id=\"menutable\"><tr>"
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
	SET_IMG="images/sets/${SET_FNAME}.png"
	SET_TITLEIMG="images/sets/${SET_FNAME}title.png"
	SET_HTML="${SET_FNAME}.html"

	SET_LINK="<td><a href=\"${SET_HTML}\"><img src=\"${SET_IMG}\"> ${SET_NAME}</a></td>"
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
	
	HTML_CONTENT="<h2>${SET_NAME}</h2>"
	HTML_CONTENT="${HTML_CONTENT}<img src=\"${SET_TITLEIMG}\"><br><hr>"
	HTML_CONTENT="${HTML_CONTENT}${SET_TABLE}"
	

	echo "  Built set table"

	HTML_PAGE=${TEMPLATE}
	HTML_PAGE="${HTML_PAGE/<!-- CONTENT -->/${HTML_CONTENT}}"
	echo "${HTML_PAGE}" > ${HTML_SRC}/${SET_HTML}

	echo "  Built HTML file"

	echo "  Completed ${SET_NAME}"

done
IFS=$OIFS

MENU_CONTENT="${MENU_CONTENT}</tr></table>"

echo "Completed main sets"

MENU_CONTENT="${MENU_CONTENT}<h3>Other Sets</h3><table><tr>"

echo "Starting half decks..."

HD_TABLE=`awk -f scripts/halfdeckTable.awk ${TCG_SRC}/halfdecks.csv`
HTML_CONTENT="<h2>Half Decks</h2> ${HD_TABLE}"
HTML_PAGE=${TEMPLATE}
HTML_PAGE="${HTML_PAGE/<!-- CONTENT -->/${HTML_CONTENT}}"
echo "${HTML_PAGE}" > ${HTML_SRC}/halfdecks.html
echo "  Built HTML file"

MENU_CONTENT="${MENU_CONTENT}<td><a href=\"halfdecks.html\">Half Decks</a></td>"
echo "  Added to Menu"

echo "Completed half decks"

echo "Starting Black Star Promos"

PROMO_TABLE=`awk -f scripts/bspromoTable.awk ${TCG_SRC}/promo.csv`
HTML_CONTENT="<h2>Black Star Promos</h2> ${PROMO_TABLE}"
HTML_PAGE=${TEMPLATE}
HTML_PAGE="${HTML_PAGE/<!-- CONTENT -->/${HTML_CONTENT}}"
echo "${HTML_PAGE}" > ${HTML_SRC}/promo.html
echo "  Built HTML file"

MENU_CONTENT="${MENU_CONTENT}<td><a href=\"promo.html\"><img src=\"images/general/promo.png\"> Black Star Promo</a></td>"
echo "  Added to Menu"

echo "Completed Black Star Promos"

echo "Starting Pop Series Promo"

PROMO_TABLE=`awk -f scripts/poppromoTable.awk ${TCG_SRC}/popseriespromo.csv`
HTML_CONTENT="<h2>Pop Series Promos</h2> ${PROMO_TABLE}"
HTML_PAGE=${TEMPLATE}
HTML_PAGE="${HTML_PAGE/<!-- CONTENT -->/${HTML_CONTENT}}"
echo "${HTML_PAGE}" > ${HTML_SRC}/popseriespromo.html
echo "  Built HTML file"

MENU_CONTENT="${MENU_CONTENT}<td><a href=\"popseriespromo.html\">Pop Series Promo</a></td></tr>"
echo "  Added to Menu"

echo "Completed Pop Series Promo"

echo "Starting Non-English Cards"
PROMO_TABLE=`awk -f scripts/setTable.awk ${TCG_SRC}/othercards.csv`
HTML_CONTENT="<h2>Non-English Cards</h2> ${PROMO_TABLE}"
HTML_PAGE=${TEMPLATE}
HTML_PAGE="${HTML_PAGE/<!-- CONTENT -->/${HTML_CONTENT}}"
echo "${HTML_PAGE}" > ${HTML_SRC}/nonenglish.html
echo "  Built HTML file"

MENU_CONTENT="${MENU_CONTENT}<tr><td><a href=\"nonenglish.html\">Non-English Cards</a></td>"
echo "  Added to Menu"

echo "Completed Non-English Cards"

echo "Starting Topps Chrome"
PROMO_TABLE=`awk -f scripts/toppsTable.awk ${CSV_SRC}/otherfiles/toppschrome.csv`
HTML_CONTENT="<h2>Topps Chrome</h2> ${PROMO_TABLE}"
HTML_PAGE=${TEMPLATE}
HTML_PAGE="${HTML_PAGE/<!-- CONTENT -->/${HTML_CONTENT}}"
echo "${HTML_PAGE}" > ${HTML_SRC}/toppschrome.html
echo "  Built HTML file"

MENU_CONTENT="${MENU_CONTENT}<td><a href=\"toppschrome.html\">Topps Chrome</a></td>"
echo "  Added to Menu"

echo "Completed Topps Chrome"



INDEX=${TEMPLATE}
INDEX="${INDEX/<!-- CONTENT -->/${MENU_CONTENT}}"

echo "${INDEX}" > docs/index.html


