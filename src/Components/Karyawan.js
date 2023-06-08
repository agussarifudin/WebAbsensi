import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Karyawan(e) {
    const [users,setUsers]=React.useState(e.users)
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NIP</TableCell>
            <TableCell align="center">NAMA</TableCell>
            <TableCell align="center">JABATAN</TableCell>
            <TableCell align="center">Jam Masuk</TableCell>
            <TableCell align="center">Jam Pulang</TableCell>
            <TableCell align="center">KETERLAMBATAN</TableCell>
            <TableCell align="center">PULANG CEPAT</TableCell>
            <TableCell align="center">LEMBUR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  
          {e.users.map((row) => (
        
            <TableRow
              key={row.nip}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nip}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.jabatan}</TableCell>
              <TableCell align="center">{row.waktu}</TableCell>
              <TableCell align="center">{row.pulang}</TableCell>
              <TableCell align="center">{row.keterlambatan} menit</TableCell>
              <TableCell align="center">{row.pulang_cepat} menit</TableCell>
              <TableCell align="center">{row.lembur} menit</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}