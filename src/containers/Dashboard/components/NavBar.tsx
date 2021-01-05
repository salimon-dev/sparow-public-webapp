import React,{useEffect, useState} from "react";
import Styles from "./NavBar.module.scss";
import Col from "ui-kit/Col";
import Row from "ui-kit/Row";
import Image from 'ui-kit/Image'
import Link from 'ui-kit/Link'
import DropDown from 'ui-kit/DropDown'
import Avatar from 'ui-kit/Avatar'
import MenuBar from './Menubar';
import Wrapper from 'ui-kit/Wrapper'
import {FaSignOutAlt} from 'react-icons/fa'
import {MdMenu,MdClose} from 'react-icons/md'
import MobileMenu from './MobileMenu'
const NavBar:React.FC = () => {
  const listItems = [
    {"label":"profile","url":"/profile"},
    {"label":"setting","url":"/setting"},
    {"label":"developement","url":"/developement"},
    {"label":"logout","url":"/logout","icon":<FaSignOutAlt/>}
  ]
  const [mobile,setMobile] = useState(()=>window.innerWidth<640?true:false);

  useEffect(() => {
    const handleResize = () =>window.innerWidth<640?setMobile(true):setMobile(false)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  });

  let avatar;

  if(mobile)
    avatar = (
      <MobileMenu  list={listItems}>
        <MenuBar>
          <MdMenu />
        </MenuBar>
      </MobileMenu>
    );
  else{
    avatar = (
      <DropDown list={listItems}>
        <Avatar size={45} round={true}>test</Avatar>
      </DropDown>
    )
  }
  return (
    <Wrapper injectedClass={Styles.nav}>
      <Row align="center" verticalAlign="center" style={{'background':"white"}}>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className={Styles.navContainer}>
            <div className={Styles.logoContainer}>
              <div className={Styles.logo}>
                <Link url="dashboard">
                  <Image 
                  source="/assets/sparrow-logo.png"
                  alt="logo"
                  className={Styles.logoImage}></Image>
                </Link>
              </div>
            </div>
            <div className={Styles.navAvatar}>
              {avatar}
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default NavBar;