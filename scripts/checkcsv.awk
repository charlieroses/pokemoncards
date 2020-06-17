BEGIN { 
	FS="," 
	error = 0
}

{
	if ( FNR == 1 )
	{
		fields = NF
		print "File should have " fields " fields"
	}
	if ( NF != fields)
	{
		error = error + 1
		print "Line " FNR " has " NF " fields" 
	}
}

END { print "Completed. Found " error " errors" }
