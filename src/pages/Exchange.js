import React from "react";
import { useState } from "react";
import CommonModal from "./components/common/commonmodal";
import MainnetList from "./components/common/mainnetlist";
import TokenList from "./components/common/tokenlist";
import Content from "../layout/content/Content";
import styles from "../assets/scss/apps/style.module.scss"
import {
    Block,
    BlockDes,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    Button,
    Row,
    Col,
    PreviewAltCard,
    TooltipComponent,
} from "../components/Component";


const ExchangeHomePage = () => {
    // const [tab, setTab] = useState(0);
    const [status, setStatus] = React.useState(false);
    const [fromToken, setFromToken] = React.useState(false);
    const [fromTokenValue, setFromTokenValue] = React.useState({
        symbol: "ETH",
        name: "Ethereum",
        icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    });
    // const [fromMainnet, setFromMainnet] = React.useState(false);
    const [toToken, setToToken] = React.useState(false);
    const [toTokenValue, setToTokenValue] = React.useState({
        symbol: "USDC",
        name: "USDCoin",
        icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"
    });
    // const [toMainnet, setToMainnet] = React.useState(false);
    const [FTactiveTab, setFTActiveTab] = useState("myFavourites");
    // const [FMactiveTab, setFMActiveTab] = useState("allChains");

    const fromOptions = [
        {
            symbol: "ETH",
            name: "Ethereum",
            icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
        },
        {
            symbol: "USDC",
            name: "USDCoin",
            icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"
        },
        {
            symbol: "$MANGA",
            name: "Manga token",
            icon: "https://assets.coingecko.com/coins/images/17982/large/logo-200x200_%287%29.png"
        },
        {
            symbol: "DAI",
            name: "DaiStableCoin",
            icon: "https://assets.coingecko.com/coins/images/9956/large/4943.png"
        },
        {
            symbol: "USDT",
            name: "TetherUSD",
            icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png"
        },
        {
            symbol: "USDC",
            name: "USDCoin",
            icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"
        },
        {
            symbol: "$MANGA",
            name: "Manga token",
            icon: "https://assets.coingecko.com/coins/images/17982/large/logo-200x200_%287%29.png"
        },
        {
            symbol: "DAI",
            name: "DaiStableCoin",
            icon: "https://assets.coingecko.com/coins/images/9956/large/4943.png"
        },
    ]

    const toOptions = [
        {
            symbol: "USDC",
            name: "USDCoin",
            icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"
        },
        {
            symbol: "$MANGA",
            name: "Manga token",
            icon: "https://assets.coingecko.com/coins/images/17982/large/logo-200x200_%287%29.png"
        },
        {
            symbol: "DAI",
            name: "DaiStableCoin",
            icon: "https://assets.coingecko.com/coins/images/9956/large/4943.png"
        },
        {
            symbol: "ETH",
            name: "Ethereum",
            icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
        },
    ]

    return (
        <React.Fragment>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>
                                <div className="primary" color="primary">
                                    Crosschain
                                </div>
                            </BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className="g-gs">
                        <PreviewAltCard className="card-full">
                            <div className="  p-4 rounded-xl px-16">
                                <div className="flex justify-between text-lg">
                                    <p>From</p>
                                    <p>Balance:-</p>
                                </div>
                                <div className="md:flex md:justify-between">
                                    <div className=" pb-0">
                                        <input
                                            placeholder="0.0"
                                            className="border-bottom w-full border-none text-3xl outline-none"
                                        />
                                    </div>
                                    <div className="flex justify-center sm:justify-between max-lg:mt-2">
                                        <CommonModal show={fromToken} title={"Select a token"} handleClose={() => setFromToken(false)} className=" ">
                                            <input
                                                type="text"
                                                placeholder="Search name or paste address"
                                                className="w-full text-xl p-3 rounded-xl border"
                                            />
                                            <div className="flex flex-wrap my-2">
                                                {
                                                    fromOptions.map((coin) => (
                                                        <button
                                                            onClick={() => {
                                                                setFromTokenValue(coin)
                                                                setFromToken(false)
                                                            }}
                                                            className="  flex items-center justify-between px-2 border border-black rounded-lg m-1 hover:scale-105 transition-all">
                                                            <img src={coin.icon} alt="" className="h-5 bg-white rounded-full" />
                                                            <p className="my-2 ml-1">{coin.symbol}</p>
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex mb-2 text-lg font-medium border-t pt-2">
                                                <button className={FTactiveTab === "myFavourites" && styles.OMActiveTab}
                                                    onClick={() => setFTActiveTab("myFavourites")}>My Favorites</button>
                                                <button
                                                    className={`${FTactiveTab === "allTokens" && styles.OMActiveTab} ml-2`}
                                                    onClick={() => setFTActiveTab("allTokens")}>All Tokens</button>
                                            </div>
                                            <div>
                                                {FTactiveTab === 'myFavourites' ?
                                                    <TokenList /> :
                                                    <MainnetList />
                                                }

                                            </div>

                                        </CommonModal>
                                        <button onClick={() => setFromToken(true)} className="h-full rounded-xl px-3 border hover:scale-105  hover:bg-primary-grey transition-all ml-3 max-sm:mt-2">
                                            <div className="flex items-center">
                                                <img src={fromTokenValue.icon} alt="" className="h-11 bg-white rounded-full" />
                                                <ul className="text-left ml-2 my-2">
                                                    <li className="font-bold">{fromTokenValue.symbol}</li>
                                                    <li>{fromTokenValue.name}</li>
                                                </ul>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </PreviewAltCard>
                        <div className="w-full flex justify-center mt-3">
                            <div className=" text-3xl border rounded-full bg-white  w-12 h-12 flex justify-center items-center pb-1">
                                ↓
                            </div>
                        </div>
                        <PreviewAltCard>
                            <div className="  p-4 rounded-xl mt-3">
                                <div className="flex justify-between text-dark-blue text-lg">
                                    <p>To</p>
                                    <p>Balance:-</p>
                                </div>
                                <div className="md:flex flex-row md:justify-between">
                                    <div className="">
                                        <input
                                            placeholder="0.0"
                                            className=" w-full border-bottom text-3xl outline-none"
                                        />
                                    </div>
                                    <div className="flex justify-center sm:justify-between max-lg:mt-2">
                                        <CommonModal show={toToken} title={"Select a token"} handleClose={() => setToToken(false)} className=" ">
                                            <input type="text"
                                                placeholder="Search name or paste address"
                                                className="w-full text-xl p-3 rounded-xl border mb-2  "
                                            />
                                            <div className="flex flex-wrap mt-1">
                                                {
                                                    toOptions.map((coin) => (
                                                        <button
                                                            onClick={() => {
                                                                setToTokenValue(coin)
                                                                setToToken(false)
                                                            }}
                                                            className="   flex place-items-center justify-between px-2 border rounded-lg m-1">
                                                            <img src={coin.icon} alt="" className="h-5 bg-white rounded-full" />
                                                            <p className="my-2 ml-1">{coin.symbol}</p>
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                            <div className="border-t pt-2">
                                                <MainnetList />
                                            </div>
                                        </CommonModal>
                                        <button onClick={() => setToToken(true)} className="h-full rounded-xl px-3  bg-transparent border hover:scale-105 transition-all ml-3  max-sm:mt-2" >
                                            <div className="flex items-center">
                                                <img src={toTokenValue.icon} alt="" className="h-11  bg-white rounded-full" />
                                                <ul className="text-left ml-2 my-2">
                                                    <li className="font-bold">{toTokenValue.symbol}</li>
                                                    <li>{toTokenValue.name}</li>
                                                </ul>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </PreviewAltCard>
                        <div className="  mt-24  rounded-xl p-4">
                            <p className="font-bold">Reminder:</p>
                            <div className="ml-6">
                                <li>Crosschain Free is 0.00%, Gas fee 0.000156 ETH for you cross-chain transaction on destination chain</li>
                                <li>Minimun Crosschain Amount is 0.009868 ETH</li>
                                <li>Maximum Crosschain Amount is 4,111.84 ETH</li>
                                <li>Estimated Time of Crosschain Arrival is 10-30 min</li>
                                <li>Crosschain amount larger than 822.37 ETH could take up to 12 hours</li>
                            </div>
                        </div>
                        {/* <div className="flex justify-center mt-3">

         <CommonModal show={status} title={"Connect to a wallet"} handleClose={() => setStatus(false)} className="bg-black">
            <button className="  border rounded-xl flex justify-between w-full  px-2 py-1 text-lg">
              <p className="mt-2">MetaMask</p>
             <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" className="h-11  bg-transparent rounded-full" alt="" />
            </button>
            <button className="  border rounded-xl flex justify-between w-full  px-2 py-1 text-lg mt-2">
             <p className="mt-2">MetaMask</p>
             <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" className="h-11  bg-transparent rounded-full" alt="" />
           </button>
           <button className="  border rounded-xl flex justify-between w-full  px-2 py-1 text-lg mt-2">
             <p className="mt-2">MetaMask</p>
             <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" className="h-11  bg-transparent rounded-full" alt="" />
           </button>

         </CommonModal>

           <button onClick={() => setStatus(true)} className="rounded-xl px-3 h-10 bg-primary-blue mr-2  w-1/4 " >
             Connect Wallet
          </button>
        </div> */}
                    </Row>
                </Block>
            </Content>
        </React.Fragment >
    )
}

export default ExchangeHomePage;
