import React, { useState, useCallback, useEffect } from "react";
import Content from "../layout/content/Content";
import CommonModal from "./components/common/commonmodal";
import Head from "../layout/head/Head";
import InvestOverview from "../components/partials/invest/invest-overview/InvestOverview";
import InvestPlan from "../components/partials/invest/invest-plan/InvestPlan";
import RecentInvest from "../components/partials/invest/recent-investment/RecentInvest";
import RecentActivity from "../components/partials/default/recent-activity/Activity";
import Notifications from "../components/partials/default/notification/Notification";
import { DropdownToggle, DropdownMenu, Card, UncontrolledDropdown, DropdownItem } from "reactstrap";
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

import { BalanceBarChart, DepositBarChart, WithdrawBarChart } from "../components/partials/charts/invest/InvestChart";
import { useSigner, useNetwork, useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deposit, getStats, claimAllRewards } from "../components/SmartContracts/FunctionWrapper";
import MainnetList from "./components/common/mainnetlist";
const WalletHomePage = () => {
  const [sm, updateSm] = useState(false);
  const [amount, setAmount] = useState(0);


  const [toToken, setToToken] = React.useState(false);
  const [toTokenValue, setToTokenValue] = React.useState({
    symbol: "USDC",
    name: "USDCoin",
    icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png"
});
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

  const [stats, setStats] = useState({
    getTotalInvested: "0",
    stats: ["0", "0", "0"],
    balance: "0",
  });
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const stake = async (e) => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    e.preventDefault();
    toast.warn("Please wait while is trnasction is been processed");
    const send = await deposit(amount, signer);
    if (send == true) {
      toast.success("Staking has been started");
    } else {
      toast.error("Something went wrong. Kindly try again.");
    }
  };
  const withdraw = async (e) => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    e.preventDefault();
    const data = await claimAllRewards(signer);
    if (data == true) {
      toast.success("Rewards has been claimed successfully");
      return;
    } else {
      toast.error("Kindly try again later");
      return;
    }
  };
  const getStatsHere = useCallback(async () => {
    if (!isConnected && signer?._address == undefined) {
      return;
    }
    try {
      if (chain == undefined || signer == undefined) {
        console.log("not ser");
        return;
      }
      const data = await getStats(signer?._address, chain.id);
      if (data == false) {
        toast.warn("Please connect your wallet to correct network");
        return;
      }

      console.log(data, ">>>>>>this data");
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  }, [chain, isConnected, signer]);

  useEffect(() => {
    getStatsHere().catch(console.error);
  }, [getStatsHere]);
  return (
    <React.Fragment>
      <Head title="Invest Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>
                <div className="primary" color="primary">
                  Wallet Dashboard
                </div>
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <BlockTitle page>
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
                                                            className="flex place-items-center justify-between px-2 border rounded-lg m-1">
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
                                        <button onClick={() => setToToken(true)} className="h-full rounded-2xl p-2 text-md text-white bg-primary border hover:scale-105 transition-all ml-3  max-sm:mt-2" >
                                           <div className="text-sm">Deposit Crypto</div> 
                                        </button>
                </BlockTitle>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col md="5">
              
              <PreviewAltCard className="card-full">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h4 className="fs-3 font-bold">Send Crypto</h4>
                  </div>
                </div>
                <div className="card-title flex justify-between ">
                  <h6 className="subtitle mt-3">Balance:</h6>
                  <h6 className="subtitle mt-3 text-primary">$9999</h6>
                </div>
                <div className="card-title">
                  <h6 className=" subtitle mt-3">Select the coin you want to send</h6>
                </div>

                <div className="border border-secondary-subtle p-[6px] rounded-pill">
                  <input
                    type="number"
                    min={0}
                    className="border-0 outline-none"
                    placeholder="Select Coin"
                    onChange={(e) => {
                      e.preventDefault();
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="card-title">
                  <h6 className=" subtitle mt-3">Receiver address</h6>
                </div>

                <div className="border border-secondary-subtle p-[6px] rounded-pill">
                  <input
                    type="number"
                    min={0}
                    className="border-0 outline-none"
                    placeholder="0x0000000....0000"
                    onChange={(e) => {
                      e.preventDefault();
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="card-title">
                  <h6 className=" subtitle mt-3">Amount</h6>
                </div>

                <div className="border border-secondary-subtle p-[6px] rounded-pill">
                  <input
                    type="number"
                    min={0}
                    className="border-0 outline-none"
                    placeholder="Enter Amount"
                    onChange={(e) => {
                      e.preventDefault();
                      setAmount(e.target.value);
                    }}
                  />
                </div>

                <Button
                  color="primary"
                  className="w-full border border-secondary-subtle p-[6px] rounded-pill justify-content-center mt-3"
                  onClick={stake}
                >
                  Send
                </Button>
              </PreviewAltCard>
            </Col>
            <Col md="7" xxl="6">
              <table className="w-full">
                <tr className="flex justify-between text-slate-800 font-semibold ">
                  <td>  Asset  </td>
                  <td>  Price  </td>
                  <td>24h Change</td>
                  <td>  Amount  </td>
                  <td>  Value    </td>
                </tr>
                <tr className="mt-3 p-4 bg-white flex justify-between border">
                  <td>ETH</td>
                  <td>0.00</td>
                  <td className="bg-secondary-green text-primary-green px-3 border rounded">+2.2%</td>
                  <td>0.00</td>
                  <td>$0.00</td>
                </tr>
                <tr className="mt-3 p-4 bg-white flex justify-between border">
                  <td>DOGE</td>
                  <td>0.00</td>
                  <td className="bg-secondary-red text-primary-red px-3 border rounded">-99.2%</td>
                  <td>0.00</td>
                  <td>$0.00</td>
                </tr>
                <tr className="mt-3 p-4 bg-white flex justify-between border">
                  <td>ETH</td>
                  <td>0.00</td>
                  <td className="bg-secondary-green text-primary-green px-3 border rounded">+2.2%</td>
                  <td>0.00</td>
                  <td>$0.00</td>
                </tr>
                <tr className="mt-3 p-4 bg-white flex justify-between border">
                  <td>ETH</td>
                  <td>0.00</td>
                  <td className="bg-secondary-green text-primary-green px-3 border rounded">+2.2%</td>
                  <td>0.00</td>
                  <td>$0.00</td>
                </tr>
              </table>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default WalletHomePage;
