import React, { useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Checkbox, Form } from 'semantic-ui-react'

import { ItemTypesContext } from "../../contexts/ItemTypesContext";

const CreateItemType = (props) => {
    const [name, setName] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const [allowSale, setAllowSale] = useState(false);
    const [allowAuction, setAllowAuction] = useState(false);
    const [allowRent, setAllowRent] = useState(false);
    const [allowLootbox, setAllowLootbox] = useState(false);

    const itemTypes = useContext(ItemTypesContext);
    const history = useHistory();
    const {path, url} = useRouteMatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!itemTypes.canCreate()) return;
        itemTypes.createItemType(name, totalSupply, allowSale, allowAuction, allowRent, allowLootbox, () => {history.push(`/MarketManagment/ItemTypes`);});
    }

    const handleNameChanged = (args) => {
        setName(args.target.value);
    }

    const handleTotalSupplyChanged = (args) => {
        setTotalSupply(args.target.value);
    }

    const handleAllowSaleChanged = (args, { checked }) => {
        setAllowSale(checked);
    }

    const handleAllowAuctionChanged = (args, { checked }) => {
        setAllowAuction(checked);
    }

    const handleAllowRentChanged = (args, { checked }) => {
        setAllowRent(checked);
    }

    const handleAllowLootboxChanged = (args, { checked }) => {
        setAllowLootbox(checked);
    }

    return (        
    <Form onSubmit={handleSubmit}>
        <Form.Field>
            <label>Name</label>
            <input 
            type="text" 
            placeholder='Item Type Name' 
            value={name} 
            onChange={handleNameChanged} 
            />
        </Form.Field>
        <Form.Field>
            <label>Total Supply</label>
            <input 
            type="number"
            value={totalSupply} 
            onChange={handleTotalSupplyChanged} 
            />
        </Form.Field>
        <Form.Field>
            <Checkbox
            label="Allow Sale"
            value={allowSale} 
            onChange={handleAllowSaleChanged} 
            />
        </Form.Field>
        <Form.Field>
            <Checkbox
            label="Allow Auction"
            value={allowAuction} 
            onChange={handleAllowAuctionChanged} 
            />
        </Form.Field>
        <Form.Field>
            <Checkbox
            label="Allow Rent"
            value={allowRent} 
            onChange={handleAllowRentChanged} 
            />
        </Form.Field>
        <Form.Field>
            <Checkbox
            label="Allow Lootbox"
            value={allowLootbox} 
            onChange={handleAllowLootboxChanged} 
            />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>);
}

export default CreateItemType;