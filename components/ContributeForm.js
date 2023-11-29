import React, { Component, useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const ContributeForm = (props) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(props.address);

    setLoading(true);
    setErrorMessage("");
    const tempValue = parseFloat(value);

    if (tempValue <= 0) {
      setErrorMessage("Minimum Contribution must be greater than 0 wei");
      setLoading(false);
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
