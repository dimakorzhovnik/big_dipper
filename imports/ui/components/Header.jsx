import React,{ Component } from 'react';
import { HTTP } from 'meteor/http'
import {
    Badge,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // Input,
    // InputGroup,
    // InputGroupAddon,
    // Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            networks: ""
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        }, ()=>{
            // console.log(this.state.isOpen);
        });
    }

  handleLanguageSwitch = (lang, e) => {
      i18n.setLocale(lang)
  }
  
  render() {
      return (
          <Navbar color="primary" dark expand="lg" fixed="top" id="header">
              <NavbarBrand tag={Link} to="/"><img src="/img/big-dipper.svg" className="img-fluid logo"/> <span className="d-none d-xl-inline-block"><T>navbar.siteName</T>&nbsp;</span><Badge color="secondary"><T>navbar.version</T></Badge> </NavbarBrand>
              <UncontrolledDropdown className="d-inline text-nowrap">
                  <DropdownToggle caret={(this.state.networks !== "")} tag="span" size="sm" id="network-nav">{Meteor.settings.public.chainId}</DropdownToggle>
                  {this.state.networks}
              </UncontrolledDropdown>
              <SearchBar id="header-search" history={this.props.history} />
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto text-nowrap" navbar>
                      <NavItem>
                          <NavLink tag={Link} to="/validators"><T>navbar.validators</T></NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink tag={Link} to="/blocks"><T>navbar.blocks</T></NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink tag={Link} to="/transactions"><T>navbar.transactions</T></NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink tag={Link} to="/proposals"><T>navbar.proposals</T></NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink tag={Link} to="/voting-power-distribution"><T>navbar.votingPower</T></NavLink>
                      </NavItem>
                      <NavItem>
                          <UncontrolledDropdown inNavbar>
                              <DropdownToggle nav caret>
                                  <T>navbar.lang</T>
                              </DropdownToggle>
                              <DropdownMenu right>
                                  <DropdownItem onClick={(e) => this.handleLanguageSwitch('en-US', e)}><T>navbar.english</T></DropdownItem>
                                  <DropdownItem onClick={(e) => this.handleLanguageSwitch('zh-Hant', e)}><T>navbar.chinese</T></DropdownItem>
                                  <DropdownItem onClick={(e) => this.handleLanguageSwitch('zh-Hans', e)}><T>navbar.simChinese</T></DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </NavItem>
                  </Nav>
              </Collapse>
          </Navbar>
      );
  }
}