import React, { useState, useCallback, useEffect } from "react";
import Content from "../layout/content/Content";
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
const StakeHomePage = () => {
  const [sm, updateSm] = useState(false);
  const [amount, setAmount] = useState(0);
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
                  Stake Crypto
                </div>
              </BlockTitle>
              <BlockDes className="text-soft">
                <p className="mt-2">Stake and Earn 1% daily on the following coins</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="primary" outline className="btn-dim btn-white">
                        <span>Refund/V2</span>
                      </Button>
                    </li>
                    <li>
                      <Button color="primary" outline className="btn-dim btn-white">
                        <span>Litepaper</span>
                      </Button>
                    </li>
                    <li>
                      <Button color="primary" outline className="btn-dim btn-white">
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div>
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
                    <h6 className="subtitle fw-bold">Stake Amount</h6>
                  </div>
                  <div className="card-title">{parseFloat(stats.balance / 10 ** 18).toFixed(4)} MATIC </div>
                </div>
                <div className="card-amount mt-2 border border-secondary-subtle p-2 rounded-pill">
                  <input
                    type="number"
                    min={0}
                    className="border-0 outline-none"
                    placeholder="23,789"
                    onChange={(e) => {
                      e.preventDefault();
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="card-title mt-4">
                  <h6 className="subtitle fw-bold">You will generate:</h6>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div className="card-title">
                    <h6 className="subtitle">Profits per day</h6>
                  </div>
                  <div className="card-title">
                    <h6 className="subtitle">1% /daily</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <div className="card-title">
                    <h6 className="subtitle">Total Monthly</h6>
                  </div>
                  <div className="card-title">
                    <h6 className="subtitle">+30% /monthly</h6>
                  </div>
                </div>
                <Button
                  color="primary"
                  className="w-full border border-secondary-subtle p-2 rounded-pill justify-content-center mt-4"
                  onClick={stake}
                >
                  Stake
                </Button>
                <Button
                  color="primary"
                  outline
                  onClick={withdraw}
                  className="btn-dim btn-white w-full border border-secondary-subtle p-2 rounded-pill justify-content-center mt-2"
                >
                  <span>Withdraw Reward</span>
                </Button>
                <Button
                  color="primary"
                  outline
                  className="btn-dim btn-white w-full border border-secondary-subtle p-2 rounded-pill justify-content-center mt-2"
                >
                  <span>Withdraw Capital</span>
                </Button>
              </PreviewAltCard>
            </Col>

            <Col md="7" xxl="4">
              <PreviewAltCard className="card-full">
                <h4 className="fs-3 font-bold">Calculator</h4>
                <div className=" md:flex md:justify-between mt-12">
                  <div className="md:w-2/5 md:mb-2 card-title">
                    <h6 className="subtitle fw-bold">Deposit</h6>
                    <div className="mt-3 flex justify-between card-title">
                      <h6 className="subtitle">Total deposited</h6>
                      <h6 className="subtitle">
                        {parseFloat(stats?.stats[0] ? stats?.stats[0] / 10 ** 18 : 0).toFixed(4)}
                        MATIC
                      </h6>
                    </div>
                    <h6 className="fw-bold mt-4 subtitle">Withdraw Rewards</h6>
                    <div className="flex justify-between card-title mt-3">
                      <h6 className="subtitle">All Claimable Rewards</h6>
                      <h6 className="subtitle">
                        {parseFloat(stats?.stats[2] ? stats?.stats[2] / 10 ** 18 : 0).toFixed(4)}
                        MATIC
                      </h6>
                    </div>
                    <div className="flex justify-between card-title mt-3">
                      <h6 className="subtitle fw-bold">Total invested:</h6>
                      <h6 className="subtitle">
                        {parseFloat(stats.getTotalInvested / 10 ** 18).toFixed(4)}
                        MATIC
                      </h6>
                    </div>
                  </div>
                  <div className="md:w-3/5 md:ml-20 card-title">
                    <h6 className="fw-bold subtitle">Withdraw Capital</h6>
                    <div className="flex justify-between card-title mt-3">
                      <h6 className="font-semibold subtitle">Claimed Rewards</h6>
                      <h6 className="font-semibold subtitle">
                        {parseFloat(stats?.stats[1] ? stats?.stats[1] / 10 ** 18 : 0).toFixed(4)}
                        MATIC
                      </h6>
                    </div>
                    <div className="flex justify-between mt-2 card-title">
                      <h6 className="subtitle">SFUSD per day</h6>
                      <h6 className="subtitle">0.000SFUSD</h6>
                    </div>
                    <div className="flex justify-between card-title">
                      <h6 className="subtitle">SFUSD per hour</h6>
                      <h6 className="subtitle">0.000SFUSD</h6>
                    </div>
                  </div>
                </div>
                <div className="sm:flex justify-between bg-transparent md:mt-1">
                  <div>
                    <Button color="primary" className="border border-secondary-subtle p-2 rounded-pill ">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default StakeHomePage;
