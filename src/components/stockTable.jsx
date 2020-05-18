import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

 
import Stock from "./stock"

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
        stocks, changeStock
    } = props;

    const rows = []


    for (const [key, value] of Object.entries(stocks)) {
        if (value.price.length < 1){
            rows.push(<Stock name={key} price={0} variation={0} changeStock={changeStock} country={value.country} max={0} min={0} sell={value.sell} buy={value.buy}></Stock> )
        } else if (value.price.length < 2){
            rows.push(<Stock name={key} price={value.price[0].value} variation={0} changeStock={changeStock} country={value.country} max={value.price[0].value} min={value.price[0].value} sell={value.sell} buy={value.buy}></Stock> )
        } else {
            let vari = ((value.price[0].value-value.price[1].value)/value.price[0].value) * 100
            vari = Math.round((vari + Number.EPSILON) * 100) / 100
            rows.push(<Stock name={key} price={value.price[0].value} variation={vari} changeStock={changeStock} country={value.country} max={value.max} min={value.min} sell={value.sell} buy={value.buy}></Stock> )
        }
        
      }

    return (
        <div>
            
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>

                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="middle">Price</StyledTableCell>
                            <StyledTableCell align="middle">Country</StyledTableCell>
                            <StyledTableCell align="right">Var%</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
        </div>
    )
} 