let $course := doc("reed.xml")/root/course
for $x in distinct-values($course/instructor)
	return <instructor>
		{ $x }
		{ for $y in distinct-values($course[instructor = $x]/title)
				return <title>{$y}</title>}
		</instructor>