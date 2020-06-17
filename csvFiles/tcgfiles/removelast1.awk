BEGIN { FS="," }

{
	printf $1
	for(i=2; i<=(NF-1); i++)
		printf "," $i
	printf "\n"
}
