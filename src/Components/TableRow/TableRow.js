import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, IconButton } from '@mui/material';
import styles from "./TableRow.module.scss";

const TableRow = ({ user, checked, toggleUser, setEditDeleteMode, setEditDeleteUserDetails }) => {

  return (
    <tr id={'user-row-' + user.id} style={{ background: checked ? 'lightgray' : 'white' }}>
      <td>
        <Checkbox
          onChange={(e) => toggleUser(e.target.checked, user.id)}
          checked={checked ?? false}
          size="medium"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "1.8rem"
            }
          }}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <IconButton onClick={() => { setEditDeleteMode("edit"), setEditDeleteUserDetails({ ...user }) }}>
          <EditIcon htmlColor='gray' className={styles.icon}/>
        </IconButton>
        <IconButton onClick={() => { setEditDeleteMode("delete"), setEditDeleteUserDetails({ ...user }) }}>
          <DeleteIcon htmlColor='crimson' className={styles.icon}/>
        </IconButton>
      </td>
    </tr>
  )
}

export default TableRow;