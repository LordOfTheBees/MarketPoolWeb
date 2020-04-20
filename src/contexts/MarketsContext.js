import React, {useContext, useState, useEffect, createContext} from "react";
import { Web3Context, ContractContext } from "./Web3Context";
import { arrayEqual, arrayIndexOf } from "../libs/ArrayHelper";

const MarketsContext = createContext();

const NULL_MARKET = {name:null, id:-1};

const MarketsProvider = ({children}) => {
    const [trySelectMarketValue, setTrySelectMarketValue] = useState(NULL_MARKET);
    const [selectedMarket, setSelectedMarket] = useState(NULL_MARKET);
    const [marketList, setMarketList] = useState([]);

    var web3 = React.useContext(Web3Context);
    var contract = React.useContext(ContractContext);

    const trySelectMarket = (market) => {
        if (typeof market === 'undefined') 
        {
            setTrySelectMarketValue(NULL_MARKET);
            return;
        }
        let index = arrayIndexOf(marketList, market);
        if (index >= 0) {
            setSelectedMarket(marketList[index]);
        }
        else {
            setTrySelectMarketValue(market);
        }
    }

    const updateMarketsList = async (innerContract) => {
        try {
            if (typeof innerContract === 'undefined' || typeof web3 === 'undefined' || web3.account === ""){
                if (marketList.length !== 0) setMarketList([]);
            }
            else {
                let marketsCount = parseInt((await innerContract.methods.getMarketCounts(web3.account).call()));
                let currentIndex = 0;
                let tmpMarketList = []
                while (marketsCount != 0 && (await innerContract.methods.marketExist(currentIndex).call())){
                    if(!(await innerContract.methods.isMarketOwner(currentIndex).call({ from : web3.account }))) {
                        currentIndex += 1;
                        continue;
                    }
                    var market = await innerContract.methods.markets(currentIndex).call();
                    tmpMarketList.push({name : market, id : currentIndex});
                    marketsCount -= 1;
                    currentIndex += 1;
                }
                if(!arrayEqual(marketList, tmpMarketList)) setMarketList(tmpMarketList);
                if(selectedMarket !== NULL_MARKET && arrayIndexOf(marketList, selectedMarket) === -1) {
                    if(tmpMarketList.length === 0) setSelectedMarket(NULL_MARKET);
                    else if (trySelectMarketValue === NULL_MARKET) trySelectMarket(tmpMarketList[0]);
                }
                else if (selectedMarket === NULL_MARKET && trySelectMarketValue === NULL_MARKET && tmpMarketList.length > 0) trySelectMarket(tmpMarketList[0]);
                return tmpMarketList;
            }
        }
        catch(exception) {console.log(exception);}
        return [];
    };

    useEffect(() => { updateMarketsList(contract.instance); }, [web3.account, contract]);
    useEffect(() => {
        if (trySelectMarketValue !== NULL_MARKET && arrayIndexOf(marketList, trySelectMarketValue) >= 0) {
            setTrySelectMarketValue(NULL_MARKET)
            setSelectedMarket(trySelectMarketValue);
        }
    }, [trySelectMarketValue, marketList])


    return (
        <MarketsContext.Provider value={{marketList: marketList, selectedMarket: selectedMarket, trySelectMarket: trySelectMarket, updateMarketsList: updateMarketsList}}>
            {children}
        </MarketsContext.Provider>
    );
}

export {MarketsContext, MarketsProvider, NULL_MARKET};