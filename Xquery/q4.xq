let $course := doc("reed.xml")/root/course
for $x at $i in distinct-values($course/instructor)
	return <instructor><name>{$x}</name><count>{count(distinct-values($course[instructor = $x]))}</count></instructor>





