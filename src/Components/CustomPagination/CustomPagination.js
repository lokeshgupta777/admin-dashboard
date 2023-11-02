import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Button } from '@mui/material';
import styles from "./CustomPagination.module.scss"

const CustomPagination = ({ count, page, pageSize, searchParams, setSearchParams, setLoading }) => {

  const pageClickHandler = (pageNo) => {
    if (pageNo === page)
      return;
    // setLoading(true);
    let search = searchParams.get('search')
    let tmpSearchParams = {}
    if (search)
      tmpSearchParams.search = search
    if (pageNo > 1)
      tmpSearchParams.page = pageNo

    setSearchParams({ ...tmpSearchParams })
  }

  if (!count)
    return null;

  return (
    <div className={styles.cont}>
      <div className={styles.cont__nav}>
        <Button variant='contained' onClick={(e) => pageClickHandler(1)} disabled={!page || (page <= 1)}><FirstPageIcon /></Button>
        <Button variant='contained' onClick={(e) => pageClickHandler(page - 1)} disabled={!page || (page <= 1)}><NavigateBeforeIcon /></Button>
      </div>
      <div>
        {Array.from(Array(Math.ceil(count / pageSize)), (x, i) => i + 1).map((pageNo) => (
          <Button
            key={pageNo}
            onClick={(e) => pageClickHandler(pageNo)}
            variant={page === pageNo ? "contained" : "text"}
          >
            {pageNo}
          </Button>
        ))}
      </div>
      <div className={styles.cont__nav}>
        <Button variant='contained' onClick={(e) => pageClickHandler(page + 1)} disabled={!page || (page === Math.ceil(count / pageSize))}><NavigateNextIcon /></Button>
        <Button variant='contained' onClick={(e) => pageClickHandler(Math.ceil(count / pageSize))} disabled={!page || (page === Math.ceil(count / pageSize))} ><LastPageIcon /></Button>
      </div>
    </div>
  )

}

export default CustomPagination;