import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
// import Card from "@mui/joy/Card";

import { Link } from "../routes";

const CampaignIndex = (campaigns) => {
  console.log(campaigns, typeof campaigns);
  const items = campaigns.campaigns.map((address) => {
    return {
      header: address,
      description: (
        <div
          style={{
            marginTop: "0.8rem",
          }}
        >
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        </div>
      ),
      fluid: true,
    };
  });
  return (
    <Layout>
      <div>
        <h3
          style={{
            fontSize: "1.5rem",
            marginTop: "1.3rem",
            marginBottom: "1.2rem",
          }}
        >
          Open Campaigns
        </h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              style={{ marginLeft: "15px", marginTop: "10px" }}
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        <Card.Group items={items} />
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
