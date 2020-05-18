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

export default function Stock(props) {
    const  { 
        name, price, variation, changeStock, country, min, max, buy, sell
    } = props;

    const [open, setOpen] = React.useState(false);


    return (
        <React.Fragment>
            <TableRow
            hover
            onClick={(event) => changeStock(name)}
        >
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell align="middle">{price}</TableCell>
            <TableCell align="middle">{country}</TableCell>
            
            <TableCell align="right">{variation}</TableCell>
        </TableRow>

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Volumen Transado</TableCell>
                                <TableCell align="center">Alto Historico</TableCell>
                                <TableCell align="center">Bajo Historico</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        {buy + sell}
                                    </TableCell>
                                    <TableCell align="center">{max}</TableCell>
                                    <TableCell align="center">{min}</TableCell>
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