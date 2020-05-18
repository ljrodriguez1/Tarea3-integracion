import React, { Component } from 'react'
import io from 'socket.io-client'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';



import '../App.css';

import Stocks from './stockTable'
import StocksChart from './stockChart'
import Exchanges from './exchangesTable'

const socket = io("wss://le-18262636.bitzonte.com", {
    path: "/stocks"
})

class Home extends(Component){
    constructor() {
        super()
        this.state = {
            stocks: {},
            conected: false,
            current: "",
            exchanges: {}
        }
        this.onwss = this.onwss.bind(this);
        this.offwss = this.offwss.bind(this);
        this.stocksTable = this.offwss.bind(this);
        this.changeStock = this.changeStock.bind(this)
    }
    componentDidMount() {
        socket.on('STOCKS', (data) => {
            const stocks = {}
            let last = ""
            data.map(stock => {
                console.log(stock)
                stock.price = []
                stock.max = 0
                stock.min = 1000000000000
                stock.buy = 0
                stock.sell = 0
                stocks[stock.ticker] = stock
                last = stock.ticker
            })
            this.setState({current: last})
            this.setState({stocks})
            
        })
        socket.on('EXCHANGES', (data) => {
            this.setState({exchanges: data})
        })
        socket.emit('STOCKS')
        socket.emit('EXCHANGES')
        this.onwss()
    }

    onwss(){
        this.setState({conected: true})
        socket.on('UPDATE', data => {
            let stocks = this.state.stocks
            if (stocks[data.ticker] !== undefined) 
            {   
                if (stocks[data.ticker].max < data.value)
                {
                    stocks[data.ticker].max = data.value;
                }
                if (stocks[data.ticker].min > data.value)
                {
                    stocks[data.ticker].min = data.value;
                }
                stocks[data.ticker].price.unshift({value: data.value, time: data.time})
                this.setState(stocks)
            }
        });
        socket.on("BUY", data => {
            let stocks = this.state.stocks
            if (stocks[data.ticker] !== undefined) 
            {
                stocks[data.ticker].buy += data.volume
            }

        })
        socket.on("SELL", data => {
            let stocks = this.state.stocks
            if (stocks[data.ticker] !== undefined) 
            {
                stocks[data.ticker].sell += data.volume
            }
        })
    }

    offwss(){
        this.setState({conected: false})
        socket.off('UPDATE')
        socket.off("BUY")
        socket.off("SELL")
    }

    changeStock(name){
        console.log(name)
        this.setState({current: name})
    }


    render() {
        return(
            
            <div className='App'>
                <div className="app_container">
                    <div className="column2">
                        {!this.state.conected ? 
                            <Button onClick={this.onwss} variant="contained" color="primary">Connect to WebSocket</Button>:
                            <Button onClick={this.offwss} variant="contained" color="secondary">Disconnect to WebSocket</Button>
                            }
                            <Paper>
                                <Exchanges stocks={this.state.stocks} exchange={this.state.exchanges} ></Exchanges>
                            </Paper>
                    </div>
                    <div className="column1">
                            <StocksChart data={this.state.stocks[this.state.current]}></StocksChart>
                            <Paper>
                                <Stocks stocks={this.state.stocks} changeStock={this.changeStock} ></Stocks>
                            </Paper>
                    </div>
                </div>
            </div>
             
        )
    }
    
}

export default Home
