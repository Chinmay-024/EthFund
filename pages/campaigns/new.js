import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const minContributionInWei = parseFloat(minimumContribution);

    if (minContributionInWei <= 0) {
      setErrorMessage("Minimum Contribution must be greater than 0 wei");
      setLoading(false);
      return;
    }
    console.log("Hi", minContributionInWei);

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      // Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

// class CampaignNew extends Component {
//   state = {
//     minimumContribution: "",
//     errorMessage: "",
//     loading: false,
//   };

//   onSubmit = async (event) => {
//     event.preventDefault();
//     this.setState({ loading: true, errorMessage: "" });

//     try {
//       const accounts = await web3.eth.getAccounts();
//       await factory.methods
//         .createCampaign(this.state.minimumContribution)
//         .send({
//           from: accounts[0],
//         });

//       Router.pushRoute("/");
//     } catch (err) {
//       this.setState({ errorMessage: err.message });
//     }
//     this.setState({ loading: false });
//   };

//   render() {
//     return (
//       <Layout>
//         <h3>Create Campaign</h3>
//         <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
//           <Form.Field>
//             <label>Minimum Contribution</label>
//             <Input
//               label="wei"
//               labelPosition="right"
//               value={this.state.minimumContribution}
//               onChange={(event) =>
//                 this.setState({ minimumContribution: event.target.value })
//               }
//             />
//           </Form.Field>
//           <Message error header="Oops!" content={this.state.errorMessage} />
//           <Button loading={this.state.loading} primary>
//             Create!
//           </Button>
//         </Form>
//       </Layout>
//     );
//   }
// }

export default CampaignNew;
