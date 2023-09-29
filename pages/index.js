import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
// import Card from "@mui/joy/Card";

// import { Link } from "../routes";

const CampaignIndex = (campaigns) => {
  console.log(campaigns, typeof campaigns);
  const items = campaigns.campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      // (
      //   <Link route={`/campaigns/${address}`}>
      //     <a>View Campaign</a>
      //   </Link>
      // ),
      fluid: true,
    };
  });
  return (
    <Layout>
      <div>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        <Card.Group items={items} />
      </div>
    </Layout>
  );
};

export default CampaignIndex;

// class CampaignIndex extends Component {
//   async componentDidMount() {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     console.log(campaigns);
//   }
//   render() {
//     return <div>Campaigns Index!</div>;
//   }
// static async getInitialProps() {
//   const campaigns = await factory.methods.getDeployedCampaigns().call();

//   return { campaigns };
// }
//   renderCampaigns() {
//     const items = this.props.campaigns.map((address) => {
//       return {
//         header: address,
//         description: (
//           <Link route={`/campaigns/${address}`}>
//             <a>View Campaign</a>
//           </Link>
//         ),
//         fluid: true,
//       };
//     });
//     return <Card.Group items={items} />;
//   }
//   render() {
//     return (
//       <Layout>
//         <div>
//           <h3>Open Campaigns</h3>
//           <Link route="/campaigns/new">
//             <a>
//               <Button
//                 floated="right"
//                 content="Create Campaign"
//                 icon="add circle"
//                 primary
//               />
//             </a>
//           </Link>
//           {this.renderCampaigns()}
//         </div>
//       </Layout>
//     );
//   }
// }
CampaignIndex.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  // const campaigns = await res.json();
  return { campaigns };
};
// export default CampaignIndex;
