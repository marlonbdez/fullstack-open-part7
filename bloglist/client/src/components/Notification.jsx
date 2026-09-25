import { Alert } from '@mui/material'
import { useNotificationStore }from '../store/notification'


const Notification = () => {
  const { text, type } = useNotificationStore()

  if (text === null) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
      {text}
    </Alert>
  )
}

export default Notification
