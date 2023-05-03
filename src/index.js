import Accordion from "components/accordions/Accordion.vue"
import AmenitiesSection from "components/accordions/AmenitiesSection.vue"
import QuestionAccordion from "components/accordions/QuestionAccordion.vue"
import Endorsement from "components/anchors/endorsements/Endorsement.vue"
import Endorsements from "components/anchors/endorsements/Endorsements.vue"
import MyButton from "components/buttons/MyButton.vue"
import ChipFilters from "components/buttons/filters/ChipFilters.vue"
import Filters from "components/buttons/filters/Filters.vue"
import MyFilter from "components/buttons/filters/MyFilter.vue"
import FacebookLogin from "components/buttons/login/FacebookLogin.vue"
import GoogleLogin from "components/buttons/login/GoogleLogin.vue"
import NewUserLogin from "components/buttons/login/NewUserLogin.vue"
import BookButton from "components/buttons/submissions/BookButton.vue"
import MapCard from "components/cards/MapCard.vue"
import AppSection from "components/common/AppSection.vue"
import Copyright from "components/common/Copyright.vue"
import FlexTable from "components/common/FlexTable.vue"
import Validatable from "components/common/Validatable.vue"
import LoadingBar from "components/common/loading/LoadingBar.vue"
import Spinner from "components/common/loading/Spinner.vue"
import AvailabilitySearch from "components/forms/AvailabilitySearch.vue"
import SocialLogin from "components/forms/SocialLogin.vue"
import AvailabilitySearchBar from "components/inputs/AvailabilitySearchBar.vue"
import DateSelector from "components/inputs/DateSelector.vue"
import MyDate from "components/inputs/MyDate.vue"
import SideMenu from "components/menus/SideMenu.vue"
import DialogModal from "components/modals/DialogModal.vue"

export default {
  install: (app) => 
  {
    app.component("Accordion", Accordion)
    app.component("AmenitiesSection", AmenitiesSection)
    app.component("QuestionAccordion", QuestionAccordion)
    app.component("Endorsement", Endorsement)
    app.component("Endorsements", Endorsements)
    app.component("MyButton", MyButton)
    app.component("ChipFilters", ChipFilters)
    app.component("Filters", Filters)
    app.component("MyFilter", MyFilter)
    app.component("FacebookLogin", FacebookLogin)
    app.component("GoogleLogin", GoogleLogin)
    app.component("NewUserLogin", NewUserLogin)
    app.component("BookButton", BookButton)
    app.component("MapCard", MapCard)
    app.component("AppSection", AppSection)
    app.component("Copyright", Copyright)
    app.component("FlexTable", FlexTable)
    app.component("Validatable", Validatable)
    app.component("LoadingBar", LoadingBar)
    app.component("Spinner", Spinner)
    app.component("AvailabilitySearch", AvailabilitySearch)
    app.component("SocialLogin", SocialLogin)
    app.component("AvailabilitySearchBar", AvailabilitySearchBar)
    app.component("DateSelector", DateSelector)
    app.component("MyDate", MyDate)
    app.component("SideMenu", SideMenu)
    app.component("DialogModal", DialogModal)
  },
}
