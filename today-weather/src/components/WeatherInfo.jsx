import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

export default function WeatherTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {

    const request = {
      pageNo: 1,
      numOfRows: 1000,
      dataType: 'JSON',
      base_date: '20240911',
      base_time: '0600',
      nx: 62,
      ny: 123,
      authKey: ''
    };

    const queryString = new URLSearchParams(request).toString()

    fetch('https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getUltraSrtNcst?' + queryString, {
      mode: 'no-cors',
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = { city: "판교" }
        data.body.items.item.forEach((info) => {
          if (info.category == "PTY") formattedData.pty = info.obsrValue
          if (info.category == "RN1") formattedData.rn1 = info.obsrValue
          if (info.category == "REH") formattedData.reh = info.obsrValue
          if (info.category == "TH1") formattedData.th1 = info.obsrValue
          if (info.category == "VEC") formattedData.vec = info.obsrValue
          if (info.category == "WSD") formattedData.wsd = info.obsrValue
        })

        console.log(formattedData)
        setRows(formattedData)
      })
      .catch((error) => {
        console.log(error + 'API 에러 발생')
      })
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>기온</TableCell>
            <TableCell>강수량</TableCell>
            <TableCell>습도</TableCell>
            <TableCell>강수 형태</TableCell>
            <TableCell>풍향</TableCell>
            <TableCell>풍속</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.city}
              sx={{ ':last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.th1}</TableCell>
              <TableCell>{row.rn1}</TableCell>
              <TableCell>{row.reh}</TableCell>
              <TableCell>{row.pty}</TableCell>
              <TableCell>{row.vec}</TableCell>
              <TableCell>{row.wsd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
