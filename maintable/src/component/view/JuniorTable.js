/**
 * useMemo 
 * 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 
 * 이전에 계산한 값을 메모리에 저장(캐싱) 동일한 계산의 반복 
 * 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술
 * **/
import React, { useMemo, useState, useEffect } from 'react' 
import { useTable, useRowSelect } from 'react-table' // react-table에서 useTable을 가져옴
import  { COLUMNS }  from '../model/columns'
import '../style/style.scss' // CSS 스타일,
import { Checkbox } from '../model/Checkbox'

// 테이블 컴포넌트 정의
export const JuniorTable = () => {

    // useTable 훅을 사용하여 테이블 인스턴스를 생성
    const [rowData, setRowData] = useState([
        {
            classification: '전공',
            necessity: '필수',
            subjectName: '',
            credit: '',
            attendanceScore: '',
            assignmentScore: '',
            midtermExamScore: '',
            finalExamScore: '',
            totalScoreResult: '',
            scoreMeanResult: '',
            gradeResult: '',
            showGradeSelect: false,
            pnp:'p'
        },
    ]);

    // useMemo를 사용하여 열 구성과 데이터를 최적화
    const columns = useMemo(() => COLUMNS, []) //열
    const data = useMemo(() => rowData, [rowData]) // 행

    /**
     * 해체 할당(Destructuring Assignment)
     * 객체나 배열에서 원하는 속성이나 요소를 추출하여 변수에 할당
     * 테이블 인스턴스로부터 필요한 속성들을 정의
     * */
    const {
        getTableProps,// 테이블 요소에 대한 속성
        getTableBodyProps,// 테이블 본문에 대한 속성
        headerGroups, // 테이블 헤더 그룹
        footerGroups, // 테이블 푸터 그룹
        rows, // 테이블 행들
        prepareRow,  // 행 준비 함수
        selectedFlatRows /* 현재 선택된 행(row)의 목록
                            데이터 테이블에서 사용자가 행을 선택하거나 선택 취소할 때, 
                            선택된 행들의 정보를 추적하고 작업을 수행해야 할 때 selectedFlatRows를 사용
                        */
    } = useTable({ 
        columns, 
        data }, 
        useRowSelect,
        hooks => {
            // columns: 이전에 정의된 열들
            hooks.visibleColumns.push(columns => [
            {
            id: 'selection',
            // getToggleAllRowsSelectedProps: 데이터 테이블에서 모든 행을 선택 또는 선택 해제
            Header: ({ getToggleAllRowsSelectedProps }) => (
                // getToggleAllRowsSelectedProps: "전체 선택" 체크박스를 구현할 때 사용되며, 해당 체크박스에 필요한 속성들을 반환
                <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            //각 행에 대한 열의 셀을 렌더링
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
            },
            ...columns
        ])
        }
    )
    

    function getGrade(totalScore) {

        if(!isNaN(totalScore)){
            if(totalScore >= 95) return "A+"
            else if(totalScore >= 90) return "A0"
            else if(totalScore >= 85) return "B+"
            else if(totalScore >= 80) return "B0"
            else if(totalScore >= 75) return "C+"
            else if(totalScore >= 70) return "C0"
            else if(totalScore >= 65) return "D+"
            else if(totalScore >= 60) return "D0"
            else return "F"
        }

        return 
    }

    const addRow = () => {
        const newRow = {
            classification: "전공",
            necessity: "필수",
            subjectName: "",
            credit: "",
            attendanceScore: "",
            assignmentScore: "",
            midtermExamScore: "",
            finalExamScore: "",
            totalScoreResult: "",
            scoreMeanResult: "",
            gradeResult: "",
            showGradeSelect: false,
            pnp:'p'
        };

        // 새로운 행을 기존 데이터 배열에 추가
        const newRowData = [...rowData]
        newRowData.push(newRow)

        // 업데이트된 데이터 배열을 상태로 설정
        setRowData(newRowData);
        
    }

    const deleteRow = () => {
        
        let creditSum = 0;
        let attendanceScoreSum = 0;
        let assignmentScoreSum = 0;
        let midtermExamScoreSum = 0;
        let finalExamScoreSum = 0;

        const selectedRows = selectedFlatRows.map(row => ({
            index: row.index, 
            data: row.original, 
        }))

        if(selectedRows.length == 0){
            alert("삭제할 과목을 선택해 주세요 :)")
        }else{
            // 삭제할 행의 인덱스
            const selectedRowIndex = selectedRows.map(selectedRow => selectedRow.index)

            // 새로운 행 데이터 배열을 생성, 삭제할 행을 제외
            const newRowData = rowData.filter((_, index) => !selectedRowIndex.includes(index));
        
            newRowData.map((row, rowIndex) => {
                if(row.credit === '2' || row.credit === '3'){
                    if (row.subjectName === '' || 
                        isNaN(row.credit) || 
                        isNaN(row.attendanceScore) || 
                        isNaN(row.assignmentScore) || 
                        isNaN(row.midtermExamScore) || 
                        isNaN(row.finalExamScore)) {

                        alert("입력되지 않은 값이 있습니다 :)");                        
                        return undefined; // 입력되지 않은 값이나 잘못된 값이 있으면 무시하고 다음 항목으로 진행
                    }
                        let _creditSum = parseInt(row.credit)
                        let _assignmentScoreSum = parseInt(row.assignmentScore)
                        let _attendanceScoreSum = parseInt(row.attendanceScore)
                        let _midtermExamScoreSum = parseInt(row.midtermExamScore)
                        let _finalExamScoreSum = parseInt(row.finalExamScore)
                        
                        // 1행의 합
                        let rowSum = _assignmentScoreSum + _attendanceScoreSum + _midtermExamScoreSum + _finalExamScoreSum

                        creditSum += _creditSum
                        attendanceScoreSum += _attendanceScoreSum
                        assignmentScoreSum += _assignmentScoreSum
                        midtermExamScoreSum += _midtermExamScoreSum
                        finalExamScoreSum += _finalExamScoreSum
                        
                        
                        if(!isNaN(rowSum)){
                            rowData[rowIndex].totalScoreResult = rowSum
                            return rowSum;
                        }                      
                    
                }else if(row.credit === '1'){
                    // 학점이 1점인 경우 점수를 입력할 수 없으므로 0으로 처리
                    creditSum += parseInt(row.credit)
                    attendanceScoreSum += 0
                    assignmentScoreSum += 0
                    midtermExamScoreSum += 0
                    finalExamScoreSum += 0
                }
            });

            const totalColScores = [
                creditSum,
                attendanceScoreSum,
                assignmentScoreSum,
                midtermExamScoreSum,
                finalExamScoreSum
            ]

            setRowData(newRowData)
            setTotalColScores(totalColScores) 
        }
    }

    // 총점을 저장하는 배열
    const [totalColScores, setTotalColScores] = useState([]);

    const calculateRow = () => {
        let creditSum = 0;
        let attendanceScoreSum = 0;
        let assignmentScoreSum = 0;
        let midtermExamScoreSum = 0;
        let finalExamScoreSum = 0;
        let missingValueAlertShown = false;

        rowData.map((row, rowIndex) => {
        if(row.credit === '2' || row.credit === '3'){
            if (row.subjectName === '' || 
                isNaN(row.credit) || 
                isNaN(row.attendanceScore) || 
                isNaN(row.assignmentScore) || 
                isNaN(row.midtermExamScore) || 
                isNaN(row.finalExamScore)) {

                if (!missingValueAlertShown) {
                    alert("입력되지 않은 값이 있습니다 :)");
                    missingValueAlertShown = true; // Set the flag to true after showing the alert
                }                     
                return // 입력되지 않은 값이나 잘못된 값이 있으면 무시하고 다음 항목으로 진행
            }
                let _creditSum = parseInt(row.credit)
                let _assignmentScoreSum = parseInt(row.assignmentScore)
                let _attendanceScoreSum = parseInt(row.attendanceScore)
                let _midtermExamScoreSum = parseInt(row.midtermExamScore)
                let _finalExamScoreSum = parseInt(row.finalExamScore)
                
                // 1행의 합
                let rowSum = _assignmentScoreSum + _attendanceScoreSum + _midtermExamScoreSum + _finalExamScoreSum

                creditSum += _creditSum
                attendanceScoreSum += _attendanceScoreSum
                assignmentScoreSum += _assignmentScoreSum
                midtermExamScoreSum += _midtermExamScoreSum
                finalExamScoreSum += _finalExamScoreSum
                
                if(!isNaN(rowSum)){
                    rowData[rowIndex].totalScoreResult = rowSum
                    missingValueAlertShown = false;
                    return rowSum;
                } 
                else{
                    if (!missingValueAlertShown) {
                        alert("입력되지 않은 값이 있습니다! :)");
                        missingValueAlertShown = true; // Set the flag to true after showing the alert
                    }  
                } 
            
        }else if(row.credit === '1'){
            // 학점이 1점인 경우 점수를 입력할 수 없으므로 0으로 처리
            creditSum += parseInt(row.credit)
            attendanceScoreSum += 0
            assignmentScoreSum += 0
            midtermExamScoreSum += 0
            finalExamScoreSum += 0
        }})

        const totalColScoresResult = [
            creditSum,
            attendanceScoreSum,
            assignmentScoreSum,
            midtermExamScoreSum,
            finalExamScoreSum
        ];

        setTotalColScores(totalColScoresResult)
        sortTable()
        
    }

    const sortTable = () => {
        const sortedRowData = [...rowData];
    
        sortedRowData.sort((a, b) => {
            // 이수 컬럼 비교
            const classificationA = a['classification'];
            const classificationB = b['classification'];
            if (classificationA < classificationB) return -1;
            if (classificationA > classificationB) return 1;
    
            // 필수 컬럼 비교
            const necessityA = a['necessity'];
            const necessityB = b['necessity'];
            if (necessityA < necessityB) return -1;
            if (necessityA > necessityB) return 1;
    
            // 과목명 컬럼 비교
            const subjectNameA = a['subjectName'];
            const subjectNameB = b['subjectName'];
            if (subjectNameA < subjectNameB) return -1;
            if (subjectNameA > subjectNameB) return 1;
    
            return 0;
        });
    
        setRowData(sortedRowData);
    }
    

    const sumTotalRowScores = () => {
        let total = 0;

        rowData.map(row => {
            let value = parseFloat(row.totalScoreResult)
            if(!isNaN(value)){
                total += value
            }
        })

        return total;
    };

    const getMean = () => {
        const sum = sumTotalRowScores();
        let creditIsOne = 0;
    
        rowData.forEach((row) => {
            if (row.credit === '1') creditIsOne++;
        });
        
        const mean = Math.round(sum / (rowData.length - creditIsOne))

        if(!isNaN(mean)) return mean

    }
    
    
    const onChange = (e, rowIndex) => {
        const currentValue = getTargetValue(e)
        const id = getTargetId(e)
        const updateData = [...rowData];
        
        // 학점이 1점이면 셀렉트 박스를 보여줌~
        if(id === 'credit'){
            if(currentValue === '1'){
                updateData[rowIndex].showGradeSelect = true; // pass / Non Pass
            } 
            else updateData[rowIndex].showGradeSelect = false; // Not pass / Non Pass
        }
        
        updateData[rowIndex][id] = currentValue;
        setRowData(updateData);
        
    }


    // 과목명 중복 검사
    const isDuplicatedSubjectName = (e, rowIndex) => {
        const currentValue = getTargetValue(e).trim()
        const id = getTargetId(e) // 입력값 앞뒤 공백 제거
        if (currentValue === "") {
            return; // 입력값이 빈 문자열인 경우 중복 확인 스킵
        }

        let isDuplicate = rowData.some((row, rowIndex) => {
            // 현재 입력값과 같은 과목명이 다른 행에 존재하는지 확인
            if (rowIndex !== e.target.parentNode.parentNode.rowIndex - 1) {
                return row.subjectName.trim() === currentValue;
            }
            return false;
        });
    
        if (isDuplicate) {
            alert('이미 존재하는 과목명입니다.');
            removeValue(e);

            const updateData = [...rowData];
            updateData[rowIndex][id] = ''
            setRowData(updateData);
        }
    };

    const isValidCredit = e =>{
        let credit = parseFloat(getTargetValue(e))
        
        if(isNaN(credit)) removeValue(e)

        if (credit > 3) {
            alert('최대 학점은 3점 입니다');
            removeValue(e)
        } else if (credit < 1) {
            alert('최소 학점은 0점 입니다.');
            removeValue(e)
        }
    }

    // 최소 최대 점수 유효성 검사
    const checkValidValue = e =>{
        let currentValue = parseFloat(getTargetValue(e))
        const id = getTargetId(e)
        if (isNaN(currentValue)) removeValue(e)

        switch(id){
            case 'attendanceScore' : 
                        if(currentValue > 20){
                            removeValue(e);
                            alert("출석점수는 최대 20점 입니다.");
                        } 
                        else if(currentValue < 0){
                            removeValue(e);
                            alert("출석점수는 최소 0점 입니다.")
                        } 
                        break;        
            case 'assignmentScore' : 
                        if(currentValue > 20){
                            removeValue(e);
                            alert("과제 점수는 최대 20점 입니다.");
                        } 
                        else if(currentValue < 0){
                            removeValue(e);
                            alert("과제 점수는 최소 0점 입니다.")
                        } 
                        break; 
            case 'midtermExamScore' : 
                        if(currentValue > 30){
                            removeValue(e);
                            alert("중간고사 점수는 최대 30점 입니다.");
                        } 
                        else if(currentValue < 0){
                            removeValue(e);
                            alert("중간고사 점수는 최소 0점 입니다.")
                        } 
                        break; 
            case 'finalExamScore' : 
                        if(currentValue > 30){
                            removeValue(e);
                            alert("기말고사 점수는 최대 30점 입니다.");
                        } 
                        else if(currentValue < 0){
                            removeValue(e);
                            alert("기말고사 점수는 최소 0점 입니다.")
                        } 
                        break; 
        }
    }

    // 이수와 필수 셀렉트 박스 핸들러
    const selectBoxHandler = (e, rowIndex) =>{
        const updatedRowData = [...rowData];
        const id = getTargetId(e)

        switch(id){
            case 'classification':
                updatedRowData[rowIndex].classification = e.target.value
                setRowData(updatedRowData)
                break
            case 'necessity':
                updatedRowData[rowIndex].necessity = e.target.value
                setRowData(updatedRowData)
                break
        }
    }

    // pass Non pass 셀렉트 박스 핸들러
    const pNpSelectHandler = (e, rowIndex) => {
        const updatedRowData = [...rowData];
        const value = getTargetValue(e)

        updatedRowData[rowIndex].pnp = value
        setRowData(updatedRowData)
    }

    // rowData 상태를 모니터링하여 변경될 때마다 로그 출력
    useEffect(() => {
        console.log("rowData 상태가 변경되었습니다.", rowData);
    }, [rowData]);


    const removeValue = e => e.target.value = ''
    const getTargetValue = e => e.target.value
    const getTargetId = e => e.target.id
    
    return (
        <div id='container'>
            <div id='button-container'>
                
                    <h2>3학년</h2>
                
                <div id='buttons'> 
                    <button onClick={addRow}>추가</button>
                    <button onClick={deleteRow}>삭제</button>
                    <button onClick={calculateRow}>저장</button>
                </div>
            </div>
            
                
            <table {...getTableProps()}> 
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <td key={column.id}>
                                    {column.render('Header')}
                                </td>
                            ))}                            
                        </tr>
                    ))}
                </thead>
                <tbody key='tbody' {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row)
                        let totalScore = rowData[rowIndex].totalScoreResult// 총점
                        let grade = ''
                        if(totalScore !== '') grade = getGrade(totalScore)
                        const showGradeSelect = rowData[rowIndex] ? rowData[rowIndex].showGradeSelect : false;
                        // rowData[rowIndex].showGradeSelect랑 같은 동작
                        // 행의 원본 데이터에서 가져옴

                        return (
                            <tr key={'tr'+rowIndex} {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    const header = cell.column.Header
                                    let cellClassName = '';
                                    let disabled = false;

                                    switch(header){
                                        case '이수' : return(
                                            <td style={{paddingRight:'10px', paddingLeft:'10px'}}
                                                key={cell.column.id} 
                                            >
                                                <select 
                                                    id='classification'
                                                    value={row.original.classification}
                                                    onChange={e => selectBoxHandler(e, rowIndex)}
                                                    >
                                                    <option value="전공">전공</option>
                                                    <option value="교양">교양</option>
                                                </select>
                                            </td>
                                        ) 
                                        case '필수' : return(
                                            <td 
                                                style={{paddingRight:'10px', paddingLeft:'10px'}} 
                                                key={cell.column.id} 
                                            >
                                                <select
                                                    id='necessity'
                                                    value={row.original.necessity}
                                                    onChange={e => selectBoxHandler(e, rowIndex)}
                                                >
                                                    <option value="필수">필수</option>
                                                    <option value="선택">선택</option>
                                                </select>
                                            </td>
                                        )
                                        case '과목명' : return(
                                            <td style={{ width: '270px' }} key={cell.column.id}>
                                                <input 
                                                    type="text" 
                                                    id="subjectName" 
                                                    className='no-border-input'
                                                    value={rowData[rowIndex].subjectName} 
                                                    onBlur={e=> isDuplicatedSubjectName(e, rowIndex)}
                                                    onChange={e=> onChange(e, rowIndex)} 
                                                />
                                            </td>
                                        )
                                        case '학점' : 
                                            return (
                                                <td style={{ width: '80px' }} key={cell.column.id}>
                                                    <input 
                                                        type="number" 
                                                        id="credit" 
                                                        className='no-border-input'
                                                        value={rowData[rowIndex].credit} 
                                                        onChange={e => onChange(e, rowIndex)} 
                                                        onInput={isValidCredit} 
                                                    />
                                                </td>
                                            );                                       
                                        case '출석점수' : 
                                                let att = rowData[rowIndex].attendanceScore
                                                if(showGradeSelect){
                                                    disabled = true
                                                    att = ''
                                                } 
                                                
                                                return(
                                                    <td style={{ width: '150px' }} key={cell.column.id}>
                                                        <input 
                                                            type="number" 
                                                            disabled={disabled}
                                                            id="attendanceScore" 
                                                            className='no-border-input'
                                                            value={att} 
                                                            onChange={ e=> onChange(e, rowIndex)} 
                                                            onInput={checkValidValue}
                                                        />
                                                    </td>
                                                )
                                            
                                        case '과제점수' : 
                                            let ass = rowData[rowIndex].assignmentScore
                                            if(showGradeSelect){
                                                disabled = true
                                                ass=''
                                            } 
                                            return(
                                                <td style={{ width: '150px' }} key={cell.column.id}>
                                                    <input 
                                                        type="number" 
                                                        disabled={disabled} 
                                                        id="assignmentScore" 
                                                        className='no-border-input'
                                                        value={ass} 
                                                        onChange={e=> onChange(e, rowIndex)} 
                                                        onInput={checkValidValue}
                                                    />
                                                </td>
                                            )
                                        case '중간고사' : 
                                            let mid = rowData[rowIndex].midtermExamScore
                                            if(showGradeSelect){
                                                disabled = true
                                                mid = ''
                                            } 
                                            return(
                                                <td style={{ width: '150px' }} key={cell.column.id}>
                                                    <input 
                                                        type="number" 
                                                        disabled={disabled}
                                                        id="midtermExamScore" 
                                                        className='no-border-input'
                                                        value={mid} 
                                                        onChange={e=> onChange(e, rowIndex)} 
                                                        onInput={checkValidValue}
                                                    />
                                                </td>
                                            )
                                        case '기말고사' : 
                                            let fin = rowData[rowIndex].finalExamScore
                                            if(showGradeSelect){
                                                disabled = true
                                                fin = ''
                                            } 
                                            return(
                                                <td style={{ width: '155px' }} key={cell.column.id}>
                                                    <input 
                                                        type="number" 
                                                        disabled={disabled}
                                                        id="finalExamScore" 
                                                        className='no-border-input'
                                                        value={fin} 
                                                        onChange={e=> onChange(e, rowIndex)} 
                                                        onInput={checkValidValue}
                                                    />
                                                </td>
                                            )
                                        case '총점' : 
                                            if(showGradeSelect)totalScore = ''   
                                            return(
                                                <td style={{ width: '80px'}}
                                                    value={totalScore}
                                                    key={cell.column.id}>
                                                    {isNaN(totalScore) ? '' : totalScore}
                                                </td>
                                            )
                                        case '성적' : 
                                            if(showGradeSelect){
                                                return(
                                                    <td style={{ width: '80px'}} key={cell.column.id}>
                                                        <select value={rowData[rowIndex].pnp} onChange={e => pNpSelectHandler(e, rowIndex)}>
                                                            <option value="P">P</option>
                                                            <option value="NP">NP</option>
                                                        </select>
                                                    </td>
                                            )}else{
                                                if (grade === 'F') cellClassName = 'fail'

                                                return(
                                                    <td 
                                                        style={{ width: '80px'}}
                                                        key={cell.column.id} 
                                                        className={cellClassName}
                                                    >
                                                    {isNaN(totalScore) ? '' : grade}
                                                    </td>
                                                )
                                            }                                    
                                    }
                                    
                                    return <td style={{ width: '80px' }}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                            
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => {
                                
                                // 아래 조건을 추가하지 않을 경우 현재 footerGroup의 열이 3개 더 생성됨!
                                if(
                                    column.id === 'classification' || 
                                    column.id === 'necessity' ||
                                    column.id === 'subjectName')
                                    {
                                        return null
                                    } 

                                if(column.id === 'selection'){
                                    return(
                                        <td 
                                            key={column.id}
                                            {...column.getFooterProps()}
                                            colSpan={4}
                                        >
                                        합계
                                        </td>
                                    )
                                }else{
                                    if(column.id === 'credit'){
                                        return(
                                            <td key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(totalColScores[0]) ? '' : totalColScores[0]}
                                        </td>
                                        )
                                    }else if(column.id === 'attendanceScore'){
                                        return(
                                            <td key={column.id}
                                            {...column.getFooterProps()}
                                            >
                                            {isNaN(totalColScores[1]) ? '' : totalColScores[1]}
                                        </td>
                                        )
                                    }else if(column.id === 'assignmentScore'){
                                        return(
                                            <td 
                                                key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(totalColScores[2]) ? '' : totalColScores[2]}
                                        </td>
                                        )
                                    }else if(column.id === 'midtermExamScore'){
                                        return(
                                            <td 
                                                key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(totalColScores[3]) ? '' : totalColScores[3]}
                                        </td>
                                        )
                                    }else if(column.id === 'finalExamScore'){
                                        return(
                                            <td 
                                                key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(totalColScores[4]) ? '' : totalColScores[4]}
                                        </td>
                                        )
                                    }else if(column.id === 'totalscore'){
                                        return(
                                            <td 
                                                key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(sumTotalRowScores()) ? '' : sumTotalRowScores() }
                                        </td>
                                        )
                                    }else if(column.id === 'mean'){
                                        return(
                                            <td 
                                                key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(getMean()) ? '' : getMean()}
                                        </td>
                                        )
                                    }else if(column.id === 'grade'){
                                        return(
                                            <td 
                                                key={column.id}
                                                {...column.getFooterProps()}
                                            >
                                            {isNaN(sumTotalRowScores()) ? '' : getGrade(getMean())}
                                        </td>
                                        )
                                    }
                                }
                            })}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}