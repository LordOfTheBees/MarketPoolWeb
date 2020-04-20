import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom"
import { Table, Button } from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css'

import style from './style.css';
import okImage from '../../images/ok.png';
import errorImage from '../../images/error.png';
import { ItemTypesContext } from "../../contexts/ItemTypesContext";

const getOkErrorImg = (isOk) => <img src={isOk ? okImage : errorImage} height="20" width="20"/>;

const ItemTypesTable = (props) => {
    const itemTypes = useContext(ItemTypesContext);

    const history = useHistory();
    const { path, url } = useRouteMatch();

    const createItemType = (data) => {
        if (!itemTypes.canCreate()) return;
        history.push(`${path}/create`);
    }

    const renderBodyRow = (data, index) => {
        return (
            <Table.Row key={index}>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.remainingSupply}</Table.Cell>
                <Table.Cell>{data.totalSupply}</Table.Cell>
                <Table.Cell>{getOkErrorImg(data.isFinal)}</Table.Cell>
                <Table.Cell>{getOkErrorImg(data.allowSale)}</Table.Cell>
                <Table.Cell>{getOkErrorImg(data.allowAuction)}</Table.Cell>
                <Table.Cell>{getOkErrorImg(data.allowRent)}</Table.Cell>
                <Table.Cell>{getOkErrorImg(data.allowLootbox)}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
        );
    }

    const headerRow = (
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Remaining Supply</Table.HeaderCell>
          <Table.HeaderCell>Total Supply</Table.HeaderCell>
          <Table.HeaderCell>Final</Table.HeaderCell>
          <Table.HeaderCell>Sale</Table.HeaderCell>
          <Table.HeaderCell>Auction</Table.HeaderCell>
          <Table.HeaderCell>Rent</Table.HeaderCell>
          <Table.HeaderCell>Lootbox</Table.HeaderCell>
          <Table.HeaderCell className="buttonContainer"><Button onClick={createItemType}>Create</Button></Table.HeaderCell>
        </Table.Row>
    );

    return (
        <Table
        tableData={itemTypes.array}
        renderBodyRow={renderBodyRow}
        headerRow={headerRow}
        celled
        compact
        />  
    );
}

export default ItemTypesTable;