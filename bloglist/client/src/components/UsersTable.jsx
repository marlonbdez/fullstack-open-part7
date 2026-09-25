import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useUsers } from '../hooks/useUsers'
import { Link } from 'react-router-dom'

function createData(
  name,
  username,
  blogsCreated
) {
  return { name, username, blogsCreated }
}

const UsersTable = () => {
  const { users } = useUsers()
  const rows = users.map((user) => ({ id: user.id, ...createData(user.name, user.username, user.blogs.length) }))

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Username</strong></TableCell>
            <TableCell align="right"><strong>Blogs Created</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/users/${row.id}`}>
                  {row.name}
                </Link>
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.blogsCreated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable