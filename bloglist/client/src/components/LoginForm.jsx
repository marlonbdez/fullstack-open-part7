import { useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useField } from '../hooks/useField'

const LoginForm = ({ handleLogin, ref }) => {
  const username = useField('text')
  const password = useField('password')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = { username: username.value , password: password.value }
    const success = await handleLogin(newUser)
    if (success) navigate('/')
  }

  const resetForm = () => {
    username.reset()
    password.reset()
  }

  useImperativeHandle(ref, () => {
    return { resetForm }
  })

  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      <div style={{ marginTop: 10 }}>
        <TextField
          { ...username }
          label="username"
          slotProps={{ htmlInput: { 'data-testid': 'login-form-username' } }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <TextField
          {...password}
          label="password"
          slotProps={{ htmlInput: { 'data-testid': 'login-form-password' } }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <Button data-testid="login-form-submit-btn" type="submit" variant="contained">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
