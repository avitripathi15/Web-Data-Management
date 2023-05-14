let $course := doc("reed.xml")/root/course
for $x at $i in distinct-values($course/subj)
	return <dept><code>{$x}</code> <count>{count(distinct-values($course[subj = $x]/title))}</count></dept>