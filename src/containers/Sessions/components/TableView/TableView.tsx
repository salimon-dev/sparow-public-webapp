import React, { useState } from "react";
import Table from "ui-kit/Table/Table";
import { FaTrash } from "react-icons/fa";
import { ISessionsTableViewProps } from "../../interfaces";
import Row from "ui-kit/Row";
import Col from "ui-kit/Col";
import Pagination from "ui-kit/Pagination/Pagination";
import Session from "api/sessions/Session";
import Modal from "ui-kit/Modal/Modal";
import ModalHeader from "ui-kit/Modal/ModalHeader";
import ModalBody from "ui-kit/Modal/ModalBody";
import ModalFooter from "ui-kit/Modal/ModalFooter";
import Button from "ui-kit/Button/Botton";
import Sparow from "api/Sparow";
import { useDispatch, useSelector } from "react-redux";
import { ILoggedInState } from "types/storeActions";
import { updateSessions } from "store/actions";
const TableView: React.FC<ISessionsTableViewProps> = ({
  loading,
  pageChanged,
}: ISessionsTableViewProps) => {
  const dispatch = useDispatch();

  const sparow: Sparow = useSelector((state: ILoggedInState) => state.sparow);
  const [deleting_session, set_deleting_session] = useState<boolean>(false);
  const [selected_session, set_selected_session] = useState<Session>();

  // sessions state
  const { page_count, current_page, data } = useSelector(
    (state: ILoggedInState) => state.sessions
  );
  // terminate function
  const [terminating, set_terminating] = useState<boolean>(false);
  const terminateSession = async () => {
    set_terminating(true);
    try {
      if (selected_session) {
        // delete the selection session
        await sparow.deleteSession(selected_session.id);
        // reload the sessions list
        const results = await sparow.allSessions({
          page: current_page,
          pageSize: 10,
        });
        dispatch(
          updateSessions({
            data: results.data,
            current_page: results.meta.current_page,
            page_count: Math.ceil(results.meta.total / 10),
          })
        );
      }
      set_deleting_session(false);
      set_selected_session(undefined);
    } catch (error) {
      console.log(error);
    } finally {
      set_terminating(false);
    }
  };
  return (
    <Row>
      <Col col={12}>
        <Table
          headers={[
            { key: "row", label: "#", width: "10%" },
            {
              key: "application",
              label: "application name",
              width: "20%",
            },
            {
              key: "agent",
              label: "agent",
              width: "20%",
            },
            { key: "scopes", label: "scopes", width: "40%" },
            { key: "menu", label: "", width: "10%" },
          ]}
          rows={data.map((session, index) => {
            const application_name = session.application
              ? session.application.title
              : "direct access";
            return {
              row: index + 1,
              application: application_name,
              agent: session.agent,
              scopes: session.scopes,
              menu: session.current ? null : (
                <FaTrash
                  onClick={() => {
                    set_selected_session(session);
                    set_deleting_session(true);
                  }}
                />
              ),
            };
          })}
        />
      </Col>
      <Col col={12}>
        <Pagination
          loading={loading === "loading"}
          current_page={current_page}
          pageChanged={(value) => {
            pageChanged(value);
          }}
          page_count={page_count}
        />
      </Col>
      <Modal
        size="small"
        show={deleting_session}
        onClose={() => {
          set_selected_session(undefined);
          set_deleting_session(false);
        }}
      >
        <ModalHeader
          close={() => {
            set_selected_session(undefined);
            set_deleting_session(false);
          }}
        >
          terminate session
        </ModalHeader>
        <ModalBody>are you sure to delete this session?</ModalBody>
        <ModalFooter>
          <Button
            size="small"
            loading={terminating}
            disabled={terminating}
            onClick={terminateSession}
          >
            yes
          </Button>
          <Button
            size="small"
            disabled={terminating}
            onClick={() => {
              set_selected_session(undefined);
              set_deleting_session(false);
            }}
          >
            no
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
};

export default TableView;
