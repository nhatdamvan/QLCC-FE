import React from 'react';
import { Box, TableCell, TableSortLabel } from '@mui/material';
import TableHeader from '@crema/components/TableHeader';
import IntlMessages from '@crema/helpers/IntlMessages';
import { visuallyHidden } from '@mui/utils';
import { usePermissionsActionContext, usePermissionsContext } from '../../context/PermissionsContextProvider';

const headCells = [
    {
        id: 'Code',
        label: <IntlMessages id="permissions.code" />,
    },
    {
        id: 'Name',
        label: <IntlMessages id="permissions.name" />,
    },
    {
        id: 'action',
        label: '',
    }
];


const TableHeading = () => {
    const { orderBy, order } = usePermissionsContext()
    const { handleRequestSort } = usePermissionsActionContext()

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


