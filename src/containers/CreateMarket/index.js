import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import { Button, Checkbox, Form } from 'semantic-ui-react'

import {Web3Context, ContractContext} from "../../contexts/Web3Context";
import { MarketsContext } from "../../contexts/MarketsContext";

const CreateMarket = ({onSuccess}) => {
    const [marketName, setMarketName] = useState("");

    var history = useHistory();
    var web3 = React.useContext(Web3Context);
    var contract = React.useContext(ContractContext);
    var markets = React.useContext(MarketsContext);

    const handleMarketNameChange = (event) => {
        setMarketName(event.target.value);
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            contract.instance.events.MarketCreated({}, (error, event) => {
                if (error) {
                    console.log(error)
                    return;
                }
                markets.trySelectMarket({name:marketName, id:parseInt(event.returnValues.marketId)});
                history.push(`/MarketManagment/Market/${event.returnValues.marketId}`);
            });

            contract.instance.methods.createMarket(marketName).send({from : web3.account})
            .then((result) => {
                console.log(result);
                if(onSuccess) onSuccess(marketName);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        catch(exception) {
            console.log(exception);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Market Name</label>
                <input 
                type="text" 
                placeholder='My New Market' 
                value={marketName} 
                onChange={handleMarketNameChange} 
                />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    );
}

export default CreateMarket;