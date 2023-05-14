let $course := doc("reed.xml")/root/course
for $x in distinct-values($course/title)
	return <course>
		<title>{$x}</title>
		{ for $y at $i in distinct-values($course[title = $x]/instructor)
				return <instructor>{$y}</instructor>}
		</course>