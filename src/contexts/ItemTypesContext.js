import React, { createContext, useContext, useReducer, useEffect } from "react";

import { MarketsContext, NULL_MARKET } from "./MarketsContext";
import { Web3Context, ContractContext } from "./Web3Context";
import { arrayEqual, arrayIndexOf } from "../libs/ArrayHelper";

const ItemTypesContext = createContext();

const ACTION_TYPE = {
    ADD:"ADD",
    SET:"SET",
    CLEAR:"CLEAR"
}

const arrayReducer = (array, action) => {
    switch (action.type) {
        case ACTION_TYPE.ADD:
            array.push(action.value)
            return [array];
        case ACTION_TYPE.SET:
            return action.value;
        case ACTION_TYPE.CLEAR:
            return [];
    }
}

const ItemTypesProvider = ({children}) => {
    const [array, dispatchArray] = useReducer(arrayReducer, [])

    let markets = useContext(MarketsContext);
    let contract = useContext(ContractContext);
    let web3 = useContext(Web3Context);

    const canCreate = () => (typeof contract.instance !== 'undefined' && markets.selectedMarket !== NULL_MARKET && web3.account !== "");

    const createItemType = (name, totalSupply, allowSale, allowAuction, allowRent, allowLootbox, onSuccess) => {
        if (typeof contract.instance === 'undefined') throw new Error("Contract doesw not exist");
        if (markets.selectedMarket === NULL_MARKET) throw new Error("Market does not selected");
        contract.instance.methods.createItemType(
            markets.selectedMarket.id,
            name,
            totalSupply,
            allowSale,
            allowAuction,
            allowRent,
            allowLootbox
        ).send({from:web3.account})
        .on('receipt', (receipt) => {
            updateItemTypesArray();
            if (onSuccess) onSuccess();
        });
    }

    const getItemTypeArray = async () => {
        try {
            if (typeof contract.instance === 'undefined' || markets.selectedMarket === NULL_MARKET){
                if (array.length !== 0) return [];
            }
            else {
                let currentIndex = 0;
                let tmpArray = []
                console.log(await contract.instance.methods.itemTypeExist(markets.selectedMarket.id, currentIndex).call());
                while ((await contract.instance.methods.itemTypeExist(markets.selectedMarket.id, currentIndex).call())){
                    let itemTypeInContract = await contract.instance.methods.marketToItemTypes(markets.selectedMarket.id, currentIndex).call();
                    let itemType = {
                        name            : itemTypeInContract.name,
                        remainingSupply : parseInt(itemTypeInContract.remainingSupply),
                        totalSupply     : parseInt(itemTypeInContract.totalSupply),
                        isFinal         : itemTypeInContract.isFinal,
                        allowSale       : itemTypeInContract.allowSale,
                        allowAuction    : itemTypeInContract.allowAuction,
                        allowRent       : itemTypeInContract.allowRent,
                        allowLootbox    : itemTypeInContract.allowLootbox,
                    }
                    tmpArray.push(itemType);
                    currentIndex += 1;
                }
                return tmpArray;
            }
        }
        catch(exception) {console.log(exception);}
        return [];
    }

    const updateItemTypesArray = async () => {
        let tmpArray = await getItemTypeArray();
        if (!arrayEqual(array, tmpArray)) dispatchArray({type:ACTION_TYPE.SET, value:tmpArray});
    };

    useEffect(() => {updateItemTypesArray();}, [markets.selectedMarket]);

    return (
        <ItemTypesContext.Provider value={{array:array, createItemType:createItemType, canCreate:canCreate}}>
            {children}
        </ItemTypesContext.Provider>
    );
}

export {ItemTypesContext, ItemTypesProvider};