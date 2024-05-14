import InvestorSidebar from '../../Components/InvestorSidebar/InvestorSidebar'
import InvestorTopbar from '../../Components/InvestorTopbar/InvestorTopbar'
import './InvestorPage.css'

export default function InvestorPage() {
  return (
    <div>
      <div className="investor-page-main-container">
        <div className="investor-page-left-container">
          <InvestorSidebar/>
        </div>
        <div className="investor-page-right-container">
          <div className="investor-page-topbar-container">
            <InvestorTopbar/>
          </div>
        </div>
      </div>
    </div>
  )
}
