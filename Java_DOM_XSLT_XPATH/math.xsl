<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<h1>Math courses</h1>
		 		<table border="1">
		    		<tr>
		      			<th>Course</th>
		      			<th>Section</th>
						<th>Title</th>
						<th>Units</th>
						<th>Instructor</th>
						<th>Days</th>
						<th>Time</th>
						<th>Place</th>
		    		</tr>
					<xsl:for-each select="root/course[subj='MATH']">
				    	<tr>
				
				      		<td><xsl:value-of select="crse"/></td>
				      		<td><xsl:value-of select="sect"/></td>
					  		<td><xsl:value-of select="title"/></td>
					  		<td><xsl:value-of select="units"/></td>
					  		<td><xsl:value-of select="instructor"/></td>
					  		<td><xsl:value-of select="days"/></td>
					  		<td><xsl:value-of select="time"/></td>
					  		<td><xsl:value-of select="place"/></td>
				    	
						</tr>
					</xsl:for-each>
			  	</table>
		  	</body>
		</html>
	</xsl:template>
</xsl:stylesheet>