import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

const CampaignShow = (props) => {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount,
  } = props;
  console.log(web3.utils.fromWei(balance, "ether"));
  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description:
        "The manager created this campaign and can create requests to withdraw money",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
      description:
        "You must contribute at least this much wei to become an approver",
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw money from the contract. Requests must be approved by approvers",
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description: "Number of people who have already donated to this campaign",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (ether)",
      description:
        "The balance is how much money this campaign has left to spend.",
    },
  ];
  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (ctx) => {
  const campaign = Campaign(ctx.query.address);
  const summary = await campaign.methods.getSummary().call();

  const minimumContribution = Number(summary[0]);
  const balance = Number(summary[1]);
  const requestsCount = Number(summary[2]);
  const approversCount = Number(summary[3]);
  const manager = summary[4];
  return {
    address: ctx.query.address,
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
  };
};

export default CampaignShow;
