{
	printf $1
	for(i=2; i<=(NF-2); i++)
		printf "," $i
	printf "\n"
}
