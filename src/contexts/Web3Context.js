import Web3 from "web3";
import React, { useEffect } from "react";
import  MarketPool_ItemRelease_Sale_ABI  from  "../contracts/MarketPool_ItemRelease_Sale.json";

const MarketPool_ItemRelease_Sale_Address = "0x4A9Dd4161E512506b9f97f283E82C5b7bE5fB7f9"

const Web3Context = React.createContext();
const ContractContext = React.createContext();


// Примечание: ещё вы можете использовать хуки, чтобы определять состояние 
// и преобразовывать его в функциональный компонент
const SetDefaultWeb3 = () => {
    let web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try { 
        window.ethereum.enable().then(function() {
            // User has allowed account access to DApp...
        });
        } catch(e) {
        // User has denied account access to DApp...
        }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
        alert('You have to install MetaMask !');
        return null;
    }

    return web3;
}


const Web3Provider = ({children}) => {
    const [instance, setInstance] = React.useState(SetDefaultWeb3);
    const [account, setAccount] = React.useState("");
    const [contract, setContract] = React.useState(null);

    const OnUpdateEthClient = (args, error) => {
        if (account !== args.selectedAddress){
            setAccount(args.selectedAddress);
        }
    };

    useEffect(() => {
        if(typeof instance !== 'undefined') {
            console.log("contract created");
            instance.currentProvider.publicConfigStore.on("update", OnUpdateEthClient);
            setContract(new instance.eth.Contract(MarketPool_ItemRelease_Sale_ABI.abi, MarketPool_ItemRelease_Sale_Address));
        }
    }, [instance]);

    
    instance.eth.getAccounts()
    .then(accounts => {
        if (accounts.length > 0 && account !== accounts[0]) {
            setAccount(accounts[0]);
        }
    });

    return (
    <Web3Context.Provider value={{instance:instance, account:account}}>
        <ContractContext.Provider value={{instance:contract}}>
            {children}
        </ContractContext.Provider>
    </Web3Context.Provider>);
}

export { Web3Context, Web3Provider, ContractContext };