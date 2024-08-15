
import { CgProfile } from "react-icons/cg"; 
import { HiOutlineLogout } from "react-icons/hi"; 
import { CgLogOut } from "react-icons/cg"; 
// import { MdManageAccounts } from "react-icons/md";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import animatedLogo from "../assets/animatedLogo.mp4"
import FullScreenButton from "./FullScreenButton";
import ProfilePopup from "./ProfilePopUp";
function Navbar() {
  return (
    <div className="sticky top-0 z-20">
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-between items-center mx-auto px-2 flex">
              <div className="flex xl:ml-0 ml-7 justify-center gap-1 items-center">
                {/* <MdManageAccounts size={35} /> */}
                <Link to="/erp/dashboard"><video className="w-16" src={animatedLogo} autoPlay={true} loop={true}/></Link>
                <Link to="/erp/dashboard"><p className="text-lg font-inter font-semibold">WebSeeder ERP</p></Link>
                
              </div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="justify-center items-center flex relative gap-3">
                  <FullScreenButton/>
                  {/* <button className="px-3 py-2 bg-gray-800 text-white rounded flex justify-center items-center gap-2" onClick={()=>{localStorage.removeItem('erp_admin_token');navigate('/')}}>Log-Out<HiOutlineLogout size={20} /></button> */}
                  <div>
                <ProfilePopup/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <SideNav/>
    </div>
  );
}

export default Navbar;
