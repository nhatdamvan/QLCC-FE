import { Box, TableCell, TableSortLabel } from '@mui/material';
import TableHeader from '@crema/components/TableHeader';
import IntlMessages from '@crema/helpers/IntlMessages';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import { useUserActionContext, useUserContext } from '../../context/UserContextProvider';

const headCells = [
  {
    id: 'Username',
    label: <IntlMessages id="user.username" />,
  },
  {
    id: 'Name',
    label: <IntlMessages id="user.name" />,
  },
  {
    id: 'Phonenumber',
    label: <IntlMessages id="user.phone" />,
  },
  {
    id: 'Email',
    label: <IntlMessages id="user.email" />,
  },
  {
    id: 'Address',
    label: <IntlMessages id="user.address" />,
  },
  {
    id: 'Roles',
    label: <IntlMessages id="user.role" />,
  },
  {
    id: 'action',
    label: '',
  }
];

// TableHeading.propTypes = {
//   onRequestSort: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

// TableHeading.defaultProps = {
//   onRequestSort: null,
//   order: 'asc',
//   orderBy: ''
// };

const TableHeading = () => {
  const { orderBy, order } = useUserContext()
  const { handleRequestSort } = useUserActionContext()

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHeader>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          id={headCell.id}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableHeader>
  );
};

export default TableHeading;


