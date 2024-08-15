import { createBrowserRouter } from "react-router-dom";
import Home from "../Landing/pages/Home";
import SignIn from "../Landing/pages/SignIn";
import Layout from "../Layout/Layout";
import CheckAuth from "../Component/CheckAuth";
import Inventory from "../Pages/Inventory";
import Error from "../Component/Error";
import Ledger from "../Pages/Ledger";
import ErpReport from "../Pages/ErpReport";
import ExpenseTracker from "../Pages/ExpenseTracker";
import InvoicePage from "../Pages/InvoicePage";
import AllInvoices from "../Pages/AllInvoices";
import DashboardMain from "../Pages/DashboardMain";
import TaxReport from "../Pages/TaxReport";
import Quotation from "../Pages/Quotation";
import SalesReturns from "../Pages/SalesReturns";
import PurchaseOrder from "../Pages/PurchaseOrder";
import PurchaseBill from "../Pages/PurchaseBill";
import PurchaseReturn from "../Pages/PurchaseReturn";
import BankReconciliation from "../Pages/BankReconciliation";
import SalesInvoice from "../Pages/SalesInvoice";
import CreateCustomer from "../mainComponent/CreateCustomer";
import CreateAccount from "../mainComponent/CreateAccount";
import CreateItem from "../mainComponent/CreateItem";
import Reciepts from "../Pages/Reciepts";
import Print from "../Pages/getPages/Print";
import CreateUnit from "../Pages/CreateUnit";
import FindBranch from "../Pages/FindBranch";
import CreateCharts from "../Pages/MasterComponent/AllCharts";
import MyProfile from "../mainComponent/MyProfile";
import MyCompanies from "../mainComponent/MyCompanies";
import Setting from "../mainComponent/Setting";
import StatutoryInfo from "../Pages/settingPages.jsx/StatutoryInfo";
import EditGst from "../Pages/settingPages.jsx/EditGst";
import EditTds from "../Pages/settingPages.jsx/EditTds";
import EditTcs from "../Pages/settingPages.jsx/EditTcs";
import ViewGst from "../Pages/settingPages.jsx/ViesGst";
import EditCompany from "../mainComponent/EditCompany";
import ViewTds from "../Pages/settingPages.jsx/ViewTds";
import ViewTcs from "../Pages/settingPages.jsx/ViewTcs";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/print",
    element: <Print />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/findbranch",
    element: <FindBranch />,
  },
  {
    path: "/erp",
    element: (
      <CheckAuth>
        <Layout />
      </CheckAuth>
    ),
    children: [
      {
        path: 'myProfile',
        element: (
          <CheckAuth>
            <MyProfile />
          </CheckAuth>
        )
      },
      {
        path: 'inventory',
        element: (
          <CheckAuth>
            <Inventory />
          </CheckAuth>
        )
      },
      {
        path: 'dashboard',
        element: (
          <CheckAuth>
            <DashboardMain />
          </CheckAuth>
        )
      },
      {
        path: 'ledger',
        element: (
          <CheckAuth>
            <Ledger />
          </CheckAuth>
        )
      },
      {
        path: 'sales-report',
        element: (
          <CheckAuth>
            <ErpReport />
          </CheckAuth>
        )
      },
      {
        path: 'exp-tracker',
        element: (
          <CheckAuth>
            <ExpenseTracker />
          </CheckAuth>
        )
      },
      {
        path: 'invoice',
        element: (
          <CheckAuth>
            <InvoicePage />
          </CheckAuth>
        )
      },
      {
        path: 'all-invoice',
        element: (
          <CheckAuth>
            <AllInvoices />
          </CheckAuth>
        )
      },
      {
        path: 'tax',
        element: (
          <CheckAuth>
            <TaxReport />
          </CheckAuth>
        )
      },
      {
        path: 'sales-quotation',
        element: (
          <CheckAuth>
            <Quotation />
          </CheckAuth>
        )
      },
      {
        path: 'sales-return',
        element: (
          <CheckAuth>
            <SalesReturns />
          </CheckAuth>
        )
      },
    
      {
        path: 'purchase-orders',
        element: (
          <CheckAuth>
            <PurchaseOrder />
          </CheckAuth>
        )
      },
      {
        path: 'purchase-returns',
        element: (
          <CheckAuth>
            <PurchaseReturn />
          </CheckAuth>
        )
      },
      {
        path: 'bank-reconciliation',
        element: (
          <CheckAuth>
            <BankReconciliation />
          </CheckAuth>
        )
      },
      {
        path: 'sales-invoice',
        element: (
          <CheckAuth>
            <SalesInvoice />
          </CheckAuth>
        )
      },
      {
        path: 'create-customer',
        element: (
          <CheckAuth>
            <CreateCustomer />
          </CheckAuth>
        )
      },
      {
        path: 'create-item',
        element: (
          <CheckAuth>
            <CreateItem />
          </CheckAuth>
        )
      },
      {
        path: 'reciepts',
        element: (
          <CheckAuth>
            <Reciepts />
          </CheckAuth>
        )
      },
      {
        path: 'create-account',
        element: (
          <CheckAuth>
            <CreateAccount />
          </CheckAuth>
        )
      },
      {
        path: 'purchase-bill',
        element: (
          <CheckAuth>
            <PurchaseBill />
          </CheckAuth>
        )
      },
      {
        path: 'unit',
        element: (
          <CheckAuth>
            <CreateUnit />
          </CheckAuth>
        )
      },
      {
        path: 'charts-of-account',
        element: (
          <CheckAuth>
            <CreateCharts />
          </CheckAuth>
        )
      },
      {
        path: 'myCompanies',
        element: (
          <CheckAuth>
            <MyCompanies />
          </CheckAuth>
        )
      },
      {
        path: 'settings',
        element: (
          <CheckAuth>
            <Setting />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info',
        element: (
          <CheckAuth>
            <StatutoryInfo />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info/edit-gst',
        element: (
          <CheckAuth>
            <EditGst />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info/view-gst',
        element: (
          <CheckAuth>
            <EditTcs />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info/edit-tds',
        element: (
          <CheckAuth>
            <EditTds />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info/view-tds',
        element: (
          <CheckAuth>
            <ViewTds />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info/edit-tcs',
        element: (
          <CheckAuth>
            <EditTcs />
          </CheckAuth>
        )
      },
      {
        path: 'statutory-info/view-tcs',
        element: (
          <CheckAuth>
            <ViewTcs />
          </CheckAuth>
        )
      },
      {
        path:  'editCompanies/:id',
        element: (
          <CheckAuth>
            <EditCompany />
          </CheckAuth>
        )
      },
     
    ]
  },
  {
    path: '*',
    element:
      <Error />
  }
]);
export default router;
