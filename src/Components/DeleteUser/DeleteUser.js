import styles from "./DeleteUser.module.scss"
import styles2 from "../EditUser/EditUser.module.scss"

const DeleteUserModal = ({ user, editDeleteUser, deleteSelectedUsers, modalCloseHandler }) => {

  return (
    <div id="delete-user-modal" className={styles2.cont}>
      <h2 className={styles2.head}>{"Delete User" + (user.name ? "" : "s")}</h2>
      <div className={styles.para}>
        <p>Are you sure you want to delete {
          user.name
            ? <b>{user.name}?</b>
            : "Users?"
        }</p>
      </div>
      <div className={styles2.form__buttonsCont}>
        <button onClick={() => user.name ? editDeleteUser({ ...user }) : deleteSelectedUsers()}>Yes</button>
        <button onClick={modalCloseHandler}>No</button>
      </div>
    </div>
  )
}

export default DeleteUserModal;