import CircularProgress from '@mui/material/CircularProgress';
import { styles } from '../styles'

const Loading = () => (
  <div style={styles.loadingContainer}>
      <CircularProgress />
  </div>
)

export default Loading;