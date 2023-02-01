import React, { useState } from "react";
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

const StakeHomePage = () => {
  const [sm, updateSm] = useState(false);

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
                  <div className="card-title">
                    <h6 className="subtitle" >0.00 SFUSD  </h6>
                  </div>
                </div>
                <div className="card-amount mt-2 border border-secondary-subtle p-1 rounded-pill">
                  <input type="text" placeholder="23,789" className="border-0 outline-none" />
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
                <Button color="primary" className="w-full border border-secondary-subtle p-1 rounded-pill justify-content-center mt-4">Stake</Button>
                <Button color="primary" outline className="btn-dim btn-white w-full border border-secondary-subtle p-1 rounded-pill justify-content-center mt-1">
                  <span>Withdraw Reward</span>
                </Button><Button color="primary" outline className="btn-dim btn-white w-full border border-secondary-subtle p-1 rounded-pill justify-content-center mt-1">
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
                      <h6 className="subtitle">
                        Total deposited
                      </h6>
                      <h6 className="subtitle">
                        0.00 MATIC
                      </h6>
                    </div>
                    <h6 className="fw-bold mt-4 subtitle">
                      Withdraw Rewards
                    </h6>
                    <div className="flex justify-between card-title mt-3">
                      <h6 className="subtitle">
                        All Claimable Rewards
                      </h6>
                      <h6 className="subtitle">
                        0.00MATIC
                      </h6>
                    </div>
                    <div className="flex justify-between card-title mt-3">
                    <h6 className="subtitle fw-bold">
                      Total invested:
                    </h6>
                    <h6 className="subtitle fw-bold">
                      0.00 MATIC
                    </h6>
                  </div>
                  </div>
                  <div className="md:w-3/5 md:ml-20 card-title">
                    <h6 className="fw-bold subtitle">
                      Withdraw Capital
                    </h6>
                    <div className="flex justify-between card-title mt-3">
                      <h6 className="font-semibold subtitle">
                        Claimed Rewards
                      </h6>
                      <h6 className="font-semibold subtitle">
                        0.00 MATIC
                      </h6>
                    </div>
                    <div className="flex justify-between mt-2 card-title">
                      <h6 className="subtitle">
                        SFUSD per day
                      </h6>
                      <h6 className="subtitle">
                        0.000SFUSD
                      </h6>
                    </div>
                    <div className="flex justify-between card-title">
                      <h6 className="subtitle">
                        SFUSD per hour
                      </h6>
                      <h6 className="subtitle">
                        0.000SFUSD
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="sm:flex justify-between bg-transparent md:mt-1">
                  
                  <div>
                    <Button color="primary" className="border border-secondary-subtle p-1 rounded-pill ">Contact Support</Button>
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

export default StakeHomePage
