import { useState } from "react";
import styles from "./EditUser.module.scss"

const EditUser = ({ user, editDeleteUser, modalCloseHandler }) => {

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    editDeleteUser({
      id: user.id,
      name,
      email,
      role
    })
  }

  return (
    <div className={styles.cont}>
      <h2 className={styles.head}>
        Edit User
      </h2>
      <form onSubmit={formSubmitHandler} autoComplete="off" className={styles.form}>
        <div className={styles.form__inputCont}>
          <label htmlFor="user-name">Name:</label>
          <input
            id="user-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.form__inputCont}>
          <label htmlFor="user-email">Email:</label>
          <input
            id="user-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          // autoComplete="do-not-autofill"
          />
        </div>
        <div className={styles.form__selectCont}>
          <label htmlFor="user-role">Role:</label>
          <select
            id="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>
        <div className={styles.form__buttonsCont}>
          <button type="submit">Save</button>
          <button type="button" onClick={modalCloseHandler}>Cancel</button>
        </div>
      </form>
    </div>

    // <div className="ui mini modal" id="edit-user-modal">
    //   <div className="header">Edit User</div>
    //   <div className="content">editDeleteUser
    //     <form className="ui form">
    //       <div className="inline fields">
    //         <label className="three wide field">Name</label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           placeholder="Name"
    //           required
    //         // className="nine wide field"
    //         />
    //       </div>
    //       <div className="inline fields">
    //         <label className="three wide field">Email</label>
    //         <input
    //           type="text"
    //           name="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Email"
    //           required
    //         />
    //       </div>
    //       <div className="inline fields sixteen wide field">
    //         <label className="three wide field">Role</label>
    //         <select
    //           className="ui selection dropdown"
    //           id='role-selection'
    //           value={role}
    //           onChange={(e) => setRole(e.target.value)}
    //         >
    //           <option value="admin">Admin</option>
    //           <option value="member">Member</option>
    //         </select>
    //       </div>
    //       <div className="two fields sixteen wide field">
    //         <button className="ui button green " type="submit">Submit</button>
    //         <button className="ui button red " type="button">Cancel</button>
    //       </div>

    //     </form>
    //   </div>
    // </div>
  )
}

export default EditUser;