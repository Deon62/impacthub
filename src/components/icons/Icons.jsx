// Icons from react-icons library
import { 
  HiOutlineSquares2X2, 
  HiOutlineFolder, 
  HiOutlineDocumentText,
  HiOutlineBuildingOffice,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle
} from 'react-icons/hi2'
import { FaHandHoldingUsd } from 'react-icons/fa'

export const DashboardIcon = ({ className = "" }) => (
  <HiOutlineSquares2X2 className={className} size={20} />
)

export const ProjectsIcon = ({ className = "" }) => (
  <HiOutlineFolder className={className} size={20} />
)

export const ReportsIcon = ({ className = "" }) => (
  <HiOutlineDocumentText className={className} size={20} />
)

export const DonationsIcon = ({ className = "" }) => (
  <FaHandHoldingUsd className={className} size={20} />
)

export const OrganizationIcon = ({ className = "" }) => (
  <HiOutlineBuildingOffice className={className} size={20} />
)

export const UsersIcon = ({ className = "" }) => (
  <HiOutlineUserGroup className={className} size={20} />
)

export const SettingsIcon = ({ className = "" }) => (
  <HiOutlineCog6Tooth className={className} size={20} />
)

export const LogoutIcon = ({ className = "" }) => (
  <HiOutlineArrowRightOnRectangle className={className} size={20} />
)
