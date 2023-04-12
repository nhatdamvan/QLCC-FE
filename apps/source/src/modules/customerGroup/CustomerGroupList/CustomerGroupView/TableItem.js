import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const StyledTableCell = styled(TableCell)(() => ({
    fontSize: 14,
    padding: 8,
    '&:first-of-type': {
        paddingLeft: 20,
    },
    '&:last-of-type': {
        paddingRight: 20,
    },
}));
const TableItem = ({ data, onSelectContactsForDelete }) => {
    const navigate = useNavigate();
    const handleDelete = (id) => (e) => {
        e.stopPropagation();
        onSelectContactsForDelete(id);
    };

    // const showDetail = () => {
    //     navigate('/EmailTemplate/Detail/' + data.id);
    // }

    return (
        <TableRow
            hover
            key={data.id}
            sx={{ cursor: "pointer" }}
            onClick={() => {
                navigate('/CustomerGroup/' + data.id);
            }} className="item-hover">
            <StyledTableCell align="left">{data.Code}</StyledTableCell>
            <StyledTableCell component="th" scope="row"> {data.Name}</StyledTableCell>
            <StyledTableCell align="right">
                <IconButton
                    sx={{
                        color: (theme) => theme.palette.primary.main,
                        '& .MuiSvgIcon-root': {
                            fontSize: 24,
                        },
                    }}
                    size="large"
                    onClick={() => {
                        navigate('/CustomerGroup/' + data.id);
                    }}
                >
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton
                    sx={{
                        color: (theme) => theme.palette.warning.main,
                        "& .MuiSvgIcon-root": {
                            fontSize: 24,
                        },
                    }}
                    size="large"
                    onClick={handleDelete(data.id)}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </StyledTableCell>
        </TableRow>
    );
};

export default TableItem;

TableItem.propTypes = {
    data: PropTypes.object.isRequired,
    onSelectContactsForDelete: PropTypes.func.isRequired,
};
