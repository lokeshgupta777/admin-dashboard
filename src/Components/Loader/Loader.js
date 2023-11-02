import { CircularProgress } from "@mui/material";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <tr>
      <td colSpan="5" className={styles.cont}>
        <CircularProgress size="3rem" thickness={4} />
      </td>
    </tr>
  )
}

export default Loader;