import './styles/lk-competencies.css';
import './styles/lk-personal-data.css';
import './styles/lk-portfolio.css';
import './styles/lk-social.css';
import './styles/registration.css';
import './styles/registration-first-step.css';
import './styles/registration-new-volunteer.css';
import './styles/settings-change-password.css';
import './styles/settings-notifications.css';
import './styles/settings-profile.css';
import './styles/_ui-kit.css';

import CustomSelect from "./components/CustomSelect";
import CustomMultiselect from "./components/CustomMultiselect";

new CustomSelect('#connection').generate();
new CustomMultiselect('#competencies').generate();
