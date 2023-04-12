import AppLoader from "@crema/components/AppLoader";
import AppTableContainer from "@crema/components/AppTableContainer";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSmsContext ,useSmsActionContext} from "../../context/SmsTemplateContextProvider";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import { useState } from "react";
import jwtAxios from "@crema/services/auth/JWT";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import AppConfirmDialog from "@crema/components/AppConfirmDialog";
import IntlMessages from "@crema/helpers/IntlMessages";

const SmsView = () => {
  const { loading, smsTemplates } = useSmsContext();
  const { getData } = useSmsActionContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const { fetchSuccess } = infoViewActionsContext;
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };
  const handleDelete = async () => {
    try {
      setDeleteDialogOpen(false);
      const response = await jwtAxios.delete(`smsTemplate/${itemSelected}`);
      if (response) {
        fetchSuccess();
        infoViewActionsContext.showMessage(response.data.Message);
      }
      getData();
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    }
  };

  return (
    <AppTableContainer>
      <Table stickyHeader className="table">
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell sx={{ border: "0 none" }}>
                <AppLoader />
              </TableCell>
            </TableRow>
          ) : (
            smsTemplates.map((data) => <TableItem data={data} key={data.id} onSelectContactsForDelete={onSelectContactsForDelete} />)
          )}
        </TableBody>
      </Table>
      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={<IntlMessages id="contactApp.deleteSMSTemplate" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default SmsView;
