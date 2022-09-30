#!/bin/bash

FILE="$1"

[[ ! -e "${FILE}" ]] && exit 1

FIELDS="$(head -n 1 "${FILE}" | tr -dC "," | wc -c)"

[[ "${FIELDS}" == "10" ]] && exit 0

while IFS=',' read -r A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12
do
	echo -e "${A1}\t${A2}\t${A3}\t${A4}\t${A5}\t${A6}\t${A7%%\/*}\t${A9}\t${A10}\t${A11}\t${A12}" >> "${FILE}.tmp"
done < "${FILE}"

mv "${FILE}.tmp" "${FILE}"
