import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const LoggedUser = ({ user, handleLogout }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    handleLogout(e)
    navigate('/')
  }

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <div>
      {user && (
        <Button color="inherit" onClick={handleClick} sx={style}>
          logout
        </Button>
      )}
    </div>
  )
}

export default LoggedUser
