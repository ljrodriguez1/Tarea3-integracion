import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';

export default function Exchange(props) {
    const  { 
        name, stocks, exchange
    } = props;

    let buy = 0
    let sell = 0
    let total = 0
    let stc = 0
    for (const [key, value] of Object.entries(stocks)) {
        if (exchange.listed_companies.includes(value.company_name)) {
            console.log(value)
            buy = buy + value.buy
            sell = sell + value.sell
            stc = stc + 1
        }
        total = total + value.buy + value.sell
    }

    let market = ((buy + sell)/total) * 100
    market = Math.round((market + Number.EPSILON) * 100) / 100



    const [open, setOpen] = React.useState(false);




    return (
        <React.Fragment>
            <TableRow>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell align="middle">{sell + buy}</TableCell>
        </TableRow>

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Sell Volume</TableCell>
                                <TableCell align="center">Buy Volume</TableCell>
                                <TableCell align="center">Stocks</TableCell>
                                <TableCell align="center">Market %</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">{sell}</TableCell>
                                    <TableCell align="center">{buy}</TableCell>
                                    <TableCell align="center">{stc}</TableCell>
                                    <TableCell align="center">{market}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>

    )
} 