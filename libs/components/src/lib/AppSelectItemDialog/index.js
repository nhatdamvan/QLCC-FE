import AppDialog from "@crema/components/AppDialog";
import AppLoader from "@crema/components/AppLoader";
import {
  Box,
  Button,
  Checkbox,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import HeaderFilter from "./HeaderFilter";
import TableHeadDialog from "./TableHead";
import PropTypes from "prop-types";
import IntlMessages from "@crema/helpers/IntlMessages";

const AppSelectItemDialog = ({
  isOpen,
  title,
  urlCreate,
  setSelectedItem,
  handleDialogClose,
  selectedEdit,
  loading,
  itemList,
  totalCount,
  multipleSelect,
  page,
  onSearch,
  setPage,
  getData,
}) => {
  const [selected, setSelected] = useState(selectedEdit);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(itemList);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.map((item) => item.id).indexOf(id) !== -1;

  const handleClickCheckbox = (event, item) => {
    const itemSelected = {
      id: item.id,
      Name: item.Name,
      Code: item.Code,
    };
    const selectedIndex = selected
      .map((item) => item.id)
      .indexOf(itemSelected.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, itemSelected);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleClickRadio = (event, item) => {
    const itemSelected = {
      id: item.id,
      Name: item.Name,
      Code: item.Code,
    };
    setSelected([itemSelected]);
  };

  const handleClick = (event, item) => {
    if (multipleSelect) {
      handleClickCheckbox(event, item);
    } else {
      handleClickRadio(event, item);
    }
  };

  const handleSave = () => {
    setSelectedItem(selected);
    handleDialogClose();
  };

  return (
    <AppDialog
      fullHeight
      open={isOpen}
      onClose={() => handleDialogClose(1232)}
      title={title}
    >
      <HeaderFilter
        totalCount={totalCount}
        urlCreate={urlCreate}
        page={page}
        onSearch={onSearch}
        setPage={setPage}
      />
      <TableContainer sx={{ overflowX: "initial", minHeight: "349px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeadDialog
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={totalCount}
          />

          {loading ? (
            <AppLoader />
          ) : (
            <TableBody>
              {itemList?.map((item, index) => {
                const isItemSelected = isSelected(item.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    key={item.id}
                    role="checkbox"
                    hover
                    onClick={(event) => handleClick(event, item)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      {multipleSelect ? (
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      ) : (
                        <Radio
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {item?.Code || item?.Username}
                    </TableCell>
                    <TableCell align="left">{item.Name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box
        sx={{
          textAlign: "right",
          mt: 3,
          position: "sticky",
          bottom: 0,
          background: "white",
        }}
      >
        <Button
          color="error"
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={getData}
        >
          Reset
        </Button>

        <Button color="primary" variant="outlined" onClick={handleSave}>
          <IntlMessages id="sidebar.mui.inputs.selects" />
        </Button>
      </Box>
    </AppDialog>
  );
};

export default AppSelectItemDialog;

AppSelectItemDialog.defaultProps = {
  multipleSelect: true,
};

AppSelectItemDialog.propTypes = {
  title: PropTypes.string.isRequired,
  urlCreate: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setSelectedItem: PropTypes.func,
  handleDialogClose: PropTypes.func.isRequired,
  selectedEdit: PropTypes.array.isRequired,
  multipleSelect: PropTypes.bool,
  itemList: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};
