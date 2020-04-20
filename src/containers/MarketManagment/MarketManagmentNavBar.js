import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'

import MyDropdown from "../../components/Dropdown";
import { MarketsContext } from "../../contexts/MarketsContext";

const TAB_HEADERS = {
    HOME            : { text:'Item Types', name:'ItemTypes' },
    ABOUT           : { text:'About', name:'About' },
    CREATE_MARKET   : { text:'Create Market', name:'CreateMarket' }
}

const MarketManagmentNavBar = ({showMarketList = true, onTabChanged=null}) => {
    var activeTab = TAB_HEADERS.HOME;
    var markets = React.useContext(MarketsContext);
    var history = useHistory();
    var location = useLocation();
    var { path, url } = useRouteMatch();

    const updateActiveTab = (tabName) => {
        switch(tabName) {
            case TAB_HEADERS.HOME.name:
                activeTab = TAB_HEADERS.HOME;
                break;
            case TAB_HEADERS.ABOUT.name:
                activeTab = TAB_HEADERS.ABOUT;
                break;
            case TAB_HEADERS.CREATE_MARKET.name:
                activeTab = TAB_HEADERS.CREATE_MARKET;
                break;
            default:
                activeTab = TAB_HEADERS.HOME;
                break;
        }
    }

    const handleItemClick = (e, { name }) => {
        history.push(`${path}/${name}`);
    };

    const selectedItemChanged = (e, {value}) => {
        console.log(e);
        let element = markets.marketList.filter((market) => {return market.id === value})[0];
        markets.trySelectMarket(element);
    }

    var parsedPath = location.pathname.match(/[^/]+/g);
    var mainUrlIndex = parsedPath.indexOf("MarketManagment");
    window.parsedPath = parsedPath;
    
    if (mainUrlIndex >= 0 && parsedPath.length > mainUrlIndex) updateActiveTab(parsedPath[mainUrlIndex + 1]);

    return (
        <Menu>
            <MyDropdown 
            placeholder="Select market..." 
            options={markets.marketList.map((market) => ({key:market.id, text:market.name, value:market.id}))}
            value={markets.selectedMarket.id}
            onChange={selectedItemChanged}
            />
            <Menu.Item name={TAB_HEADERS.HOME.name} active={activeTab.name===TAB_HEADERS.HOME.name} onClick={handleItemClick}>{TAB_HEADERS.HOME.text}</Menu.Item>
            <Menu.Item name={TAB_HEADERS.ABOUT.name} active={activeTab.name===TAB_HEADERS.ABOUT.name} onClick={handleItemClick}>{TAB_HEADERS.ABOUT.text}</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name={TAB_HEADERS.CREATE_MARKET.name} active={activeTab.name===TAB_HEADERS.CREATE_MARKET.name} onClick={handleItemClick}>{TAB_HEADERS.CREATE_MARKET.name}</Menu.Item>
            </Menu.Menu>
        </Menu>);
}

export default MarketManagmentNavBar;