import React, { Component, useState } from "react";
import { Table, Button, Modal, Message, Icon } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

const RequestRow = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for spinner
  const [modalOpen, setModalOpen] = useState(false); // Added modal state for error message

  const handleApprove = async () => {
    setErrorMessage("");
    setLoading(true); // Show spinner
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const handleFinalize = async () => {
    setErrorMessage("");
    setLoading(true); // Show spinner
    const campaign = Campaign(props.address);
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(props.id).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize =
    parseInt(request.approvalCount) > parseInt(approversCount) / 2;

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {parseInt(request.approvalCount)}/{parseInt(approversCount)}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button
            color="green"
            basic
            loading={loading} // Show spinner while loading
            onClick={handleApprove}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button
            color="teal"
            basic
            loading={loading} // Show spinner while loading
            onClick={handleFinalize}
          >
            Finalize
          </Button>
        )}
      </Cell>
      {/* Error Message Popup */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small">
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>
          <Message negative>
            <p>{errorMessage}</p>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => setModalOpen(false)}>
            <Icon name="checkmark" /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    </Row>
  );
};

export default RequestRow;
