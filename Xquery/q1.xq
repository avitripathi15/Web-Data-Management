for $x at $i in doc("reed.xml")/root/course
    where $x/subj = "MATH" and $x/place/building="LIB" and $x/place/room="204"
            return <Math-Courses>
                {$x/title}
                {$x/instructor}
                {$x/time/start_time}
                {$x/time/end_time}
                </Math-Courses>

