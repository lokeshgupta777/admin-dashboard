import { useEffect, useState } from 'react';
import Loader from './Components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import TableRow from './Components/TableRow/TableRow';
import EditUser from './Components/EditUser/EditUser';
import DeleteUser from './Components/DeleteUser/DeleteUser';
import { Button, Checkbox, Dialog, Paper } from '@mui/material';
import CustomPagination from './Components/CustomPagination/CustomPagination';
import Search from './Components/Search/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./Dashboard.module.scss"

const PAGE_SIZE = 10;

const Dashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [usersData, setUsersData] = useState([]);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usersInPage, setUsersInPage] = useState([]);
  const [usersChecked, setUsersChecked] = useState({});
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [editDeleteMode, setEditDeleteMode] = useState("");
  const [editDeleteUserDetails, setEditDeleteUserDetails] = useState({});

  const getUsersData = () => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => res.json())
      .then((body) => setUsersData([...body]))
      .catch((err) => {
        setError(true);
        setLoading(false);
        // console.log(err);
      })
  }

  useEffect(() => {
    getUsersData();
  }, [])

  useEffect(() => {
    if (usersData?.length || (!loading)) {
      let pageNo = searchParams.get('page') || 1;
      let search = searchParams.get('search') || "";

      // console.log(searchParams.get('search'))

      let filteredData = [...usersData];
      if (search) {
        filteredData = usersData.filter((user) => {
          if (
            user?.name?.toLowerCase()?.includes(search.toLowerCase())
            || user?.email?.toLowerCase()?.includes(search.toLowerCase())
            || user?.role?.toLowerCase()?.includes(search.toLowerCase())
          )
            return true;
          return false;
        })
      }

      const startIdx = (pageNo - 1) * PAGE_SIZE;
      if (Number(pageNo) !== 1 && (startIdx >= usersData?.length)) {
        setSearchParams({
          search: search,
          page: Math.max(1, Math.ceil(usersData?.length / PAGE_SIZE))
        })
        return;
      }
      const endIdx = startIdx + PAGE_SIZE;
      setFilteredUsersData([...filteredData]);
      setUsersInPage(filteredData?.slice(startIdx, endIdx));
      setUsersChecked({});
      setPage(Number(pageNo));
      setSearchText(search);
      loading && setLoading(false);
    }
  }, [usersData, searchParams])

  const isUsersInPageChecked = () => {
    if (usersInPage.some((user) => usersChecked[user.id] !== true))
      return false;
    return true;
  }

  const toggleAllUsersInPage = (checked) => {
    let tmpUersChecked = { ...usersChecked };
    if (checked) {
      usersInPage.forEach((user) => tmpUersChecked[user?.id] = true);
    } else {
      usersInPage.forEach((user) => tmpUersChecked[user?.id] = false);
    }
    setUsersChecked({ ...tmpUersChecked });

  }

  const toogleUser = (checked, userId) => {
    setUsersChecked((usersChecked) => ({ ...usersChecked, [userId]: checked }))
  }

  const editDeleteUser = (newUserDetails) => {
    const userToEditIdx = usersData.findIndex((user) => user.id === newUserDetails.id);
    let tmpUsersData = [...usersData];
    if (editDeleteMode === 'edit')
      tmpUsersData.splice(userToEditIdx, 1, { ...newUserDetails });
    else
      tmpUsersData.splice(userToEditIdx, 1);
    setUsersData([...tmpUsersData]);
    modalCloseHandler();
  }

  const getSelectedUsers = () => {
    let usersToDelete = [];
    for (const userId in usersChecked) {
      if (usersChecked[userId])
        usersToDelete.push(userId);
    }
    return usersToDelete;
  }

  const deleteSelectedUsers = () => {
    const usersToDelete = getSelectedUsers();
    let tmpUsersData = [...usersData];
    let remainingUsers = tmpUsersData.filter((user) => !usersToDelete.includes(user?.id));
    setUsersData([...remainingUsers]);
    modalCloseHandler();
  }

  const modalCloseHandler = () => {
    setEditDeleteMode("");
    setTimeout(() => {
      setEditDeleteUserDetails({});
    }, 500)
  }

  return (
    <div className={styles.cont}>
      <h1 className={styles.head}>Admin Dashboard</h1>
      <div className={styles.searchDelCont}>
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setLoading={setLoading}
        />
        <Button
          disabled={!getSelectedUsers()?.length}
          startIcon={<DeleteIcon />}
          variant='contained'
          onClick={() => setEditDeleteMode("delete")}
          className={styles.searchDelCont__delete}
        >
          Delete Selected
        </Button>
      </div>
      <Paper className={styles.tableCont}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  checked={(loading || !usersInPage?.length) ? false : isUsersInPageChecked()}
                  onChange={(e) => toggleAllUsersInPage(e.target.checked)}
                  size="medium"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.8rem"
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader />
            ) : usersInPage?.length ? (
              usersInPage.map((user) => (
                <TableRow
                  key={user?.id}
                  user={user}
                  toggleUser={toogleUser}
                  checked={usersChecked[user.id]}
                  setEditDeleteMode={setEditDeleteMode}
                  setEditDeleteUserDetails={setEditDeleteUserDetails}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  {error
                    ? "Sorry!There seems to be some error.Try refreshing the page"
                    : "No Data Found !!"
                  }
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <CustomPagination
                  count={filteredUsersData?.length}
                  page={page}
                  pageSize={PAGE_SIZE}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  setLoading={setLoading}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </Paper>

      <Dialog
        open={editDeleteMode === 'edit'}
        onClose={modalCloseHandler}
        keepMounted={false}
      >
        <EditUser
          user={editDeleteUserDetails}
          editDeleteUser={editDeleteUser}
          modalCloseHandler={modalCloseHandler}
        />
      </Dialog>

      <Dialog
        open={editDeleteMode === 'delete'}
        onClose={modalCloseHandler}
        keepMounted={false}
      >
        <DeleteUser
          user={editDeleteUserDetails}
          editDeleteUser={editDeleteUser}
          deleteSelectedUsers={deleteSelectedUsers}
          modalCloseHandler={modalCloseHandler}
        />
      </Dialog>
    </div>
  );
}

export default Dashboard;