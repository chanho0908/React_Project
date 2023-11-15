export const COLUMNS = [
    {
        Header: '이수',
        accessor: 'classification',
    },
    {
        Header: '필수',
        accessor: 'necessity',
    },
    {
        Header: '과목명',
        accessor: 'subjectName',
    },
    {
        Header: '학점',
        Footer: 'creditResult',
        accessor: 'credit',
    },
    {
        Header: '출석점수',
        Footer: 'attendanceScoreResult',
        accessor: 'attendanceScore',
    },
    {
        Header: '과제점수',
        Footer: 'assignmentScoreResult',
        accessor: 'assignmentScore',
    },
    {
        Header: '중간고사',
        Footer: 'midtermExamScoreResult',
        accessor: 'midtermExamScore',
    },
    {
        Header: '기말고사',
        Footer: 'finalExamScoreResult',
        accessor: 'finalExamScore',
    },
    {
        Header: '총점',
        Footer: 'totalScoreResult',
        accessor: 'totalscore',
    },
    {
        Header: '평균',
        Footer: 'scoreMeanResult',
        accessor: 'mean',
    },
    {
        Header: '성적',
        Footer: 'gradeResult',
        accessor: 'grade',
    }
]