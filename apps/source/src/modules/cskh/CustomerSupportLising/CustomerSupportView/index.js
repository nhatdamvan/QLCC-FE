import AppTableContainer from "@crema/components/AppTableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TableHeading from "./TableHeading";
import AppLoader from "@crema/components/AppLoader";
import TableItem from "./TableItem";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AppConfirmDialog from "@crema/components/AppConfirmDialog";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { useCustomerSupportActionsContext } from "../../context/CustomerSupportContextProvider";
import AppSelectItemDialog from "@crema/components/AppSelectItemDialog";
import { useIntl } from "react-intl";
import {
  useUserActionContext,
  useUserContext,
} from "../../../userList/context/UserContextProvider";
import { postData } from "@crema/hooks/APIHooks";

const CustomerSupportView = ({
  loading,
  list,
  order,
  orderBy,
  handleRequestSort,
}) => {
  const { messages } = useIntl();
  const {
    users,
    loading: loadingUser,
    totalCount: totalCountUser,
    page: pageUser,
  } = useUserContext();
  const {
    onSearchUser,
    setPage: setPageUser,
    getData: getUsers,
  } = useUserActionContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const { getData } = useCustomerSupportActionsContext();

  const [isOpenAssign, setIsOpenAssign] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [ticketSelected, setTicketSelected] = useState("");

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  useEffect(() => {
    if (selectedUser.length) {
      handleAssignTicket();
    }
  }, [selectedUser]);

  const handleOpenAssign = (id) => {
    setIsOpenAssign(true);
    setTicketSelected(id);
  };

  const handleCloseAssign = () => {
    setIsOpenAssign(false);
  };

  const handleAssignTicket = () => {
    postData("asignTicket", infoViewActionsContext, {
      AsignUserId: selectedUser[0].id,
      TicketRequestId: ticketSelected,
    })
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    deleteData(`ticketRequest/${itemSelected}`, infoViewActionsContext)
      .then(() => {
        getData();
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <AppTableContainer>
      <Table stickyHeader className="table">
        <TableHead>
          <TableHeading
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
          />
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow sx={{ position: "relative", height: "100px" }}>
              <TableCell sx={{ border: "0 none" }}>
                <AppLoader />
              </TableCell>
            </TableRow>
          ) : (
            list.map((data) => (
              <TableItem
                data={data}
                key={data.id}
                handleOpenAssign={handleOpenAssign}
                onSelectContactsForDelete={onSelectContactsForDelete}
              />
            ))
          )}
        </TableBody>
      </Table>

      <AppSelectItemDialog
        title={messages["common.staff"]}
        urlCreate={"/User/Create"}
        multipleSelect={false}
        isOpen={isOpenAssign}
        handleDialogClose={handleCloseAssign}
        setSelectedItem={setSelectedUser}
        selectedEdit={[]}
        itemList={users}
        loading={loadingUser}
        totalCount={totalCountUser}
        page={pageUser}
        setPage={setPageUser}
        onSearch={onSearchUser}
        getData={getUsers}
      />

      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={<IntlMessages id="contactApp.deleteCustomer" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default CustomerSupportView;

CustomerSupportView.propTypes = {
  loading: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
};
