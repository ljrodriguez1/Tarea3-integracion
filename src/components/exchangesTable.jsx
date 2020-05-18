import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

 
import Exchange from "./exchange"

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
    },
  });

export default function Stocks(props) {
    const classes = useStyles()
    const  { 
        stocks, exchange
    } = props;
    console.log(stocks)
    const rows = []
    if (Object.keys(exchange).length !== 0)
    {
        for (const [key, value] of Object.entries(exchange)) {
            rows.push(<Exchange name={key} stocks={stocks} exchange={value}></Exchange>)        
        }
    }
    return (
        <div>
            
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>

                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="middle">Total Volume</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
        </div>
    )
} 