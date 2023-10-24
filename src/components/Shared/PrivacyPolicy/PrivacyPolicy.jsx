import React from 'react';
import styles from './PrivacyPolicy.css.js';
import UscFullLogo from '../../../assets/Images/usc_full_logo.png';

const domain = 'UnitedStatesCredit.com';

const PrivacyPolicy = () => (
    <div style={styles.container}>
        <div style={styles.logoBar}>
            <img src={UscFullLogo} alt='footer-logo' style={styles.headerLogo}/>
        </div>
        <div style={styles.infoContainer}>

            <h1>{domain} Privacy Policy</h1>
            <p>
                The following sets forth the policies for the collection and use of personally identifiable information ("Information") by {domain}  in connection with its operation of this website(the "Site").  {domain} takes its obligations regarding privacy very seriously, and it wants to ensure users are fully informed about the Information they are providing to it.
            </p>
            <h3><u>Your California Privacy Rights</u></h3>
            <p>In connection with the Site, {domain} may collect Information in the following ways:</p>
            <ul>
                <li>Through registration forms filled out by a user on the Site</li>
                <li>Through Information provided by a user in connection with the purchase of products or services on the Site</li>
                <li>Through the maintenance and analysis of Web server logs</li>
                <li>Via e-mail sent by a user to {domain}</li>
                <li>Through the use by {domain} of third-party databases from which user Information is extracted and combined with Information obtained by {domain} through other means.</li>
            </ul>
            <p>
                {domain} may also collect non-personally identifiable information from users via "cookies" (small text files placed by {domain} on user computers), single-pixel image files (also called “Web beacons”), Web server log analysis and other similar technological means. Such non-personally identifiable information may be used to track site trends and enhance the user experience, and may be shared with third parties. To the extent third parties may place advertising on the Site, such third parties may utilize cookies or other technological means within the advertising to collect and utilize non-personally identifiable information. {domain} is not responsible for information collected by third parties in this manner, nor for the collection or use of Information by other sites to which the Site is linked.
            </p>
            <h3><u>Types of Information Collected by {domain}</u></h3>
            <p>
                The following types of Information about a user are among those that may be collected by {domain} in connection with the Site:
            </p>
            <ul>
                <li>Name</li>
                <li>Postal address</li>
                <li>E-mail address</li>
                <li>Telephone number</li>
                <li>Cellular telephone number</li>
                <li>IP Address</li>
                <li>Referring site</li>
                <li>Other technical information collected by the Site’s servers.</li>
                <li>Credit Rating</li>
                <li>Product Interests</li>
                <li>User Preferences {domain} through other means.</li>
            </ul>
            <h3><u>No Collection of Information from Children</u></h3>
            <p>
                The Site is not intended for users under the age of 18, nor does {domain} knowingly collect or retain Information in connection with the Site from children under the age of 13.
            </p>
            <h3><u>Use of Information</u></h3>
            <p>{domain} may use Information collected in connection with the Site in the following ways:</p>
            <ul>
                <li>To provide requested information, products and services to users</li>
                <li>To improve the user experience with the Site</li>
                <li>In connection with the operation of the Site and BlueKeel LLC’s internal business</li>
                <li>In connection with other Sites or offline businesses owned or operated by {domain}</li>
                <li>To contact users about products and services offered by {domain} as well as selected third parties.</li>
                <li>To provide to third parties for data processing in relation to services or information requested by users</li>
                <li>To provide to third parties whose products and services have been requested by users</li>
                <li>To share with third parties for email marketing products and services our users may find of interest.</li>
            </ul>
            <p>
                In order to do the foregoing, {domain} may provide your Information to trusted third parties, including but not limited to selected third party marketers and vendors as well as third party contractors providing services to {domain} for the operation of the Site and its business, communication services and fulfillment of orders. {domain} will use commercially reasonable efforts to limit use of the Information by such third parties to the specific uses set forth above. {domain} also utilizes electronic and physical security to reduce the risk of improper access to or manipulation of Information during transmission and storage, but cannot guarantee the security or integrity of the Information. {domain} may also disclose Information when it determines it is necessary to comply with applicable laws or regulations or protect the interests or safety of {domain}, its customers, or other visitors to the Site.
            </p>
            <h3><u>Access to Information.</u></h3>
            <p>
                Users may modify and correct certain Information through a written request sent to {domain}, 899 Skokie Blvd, Ste 340, Northbrook, IL 60062.
            </p>
            <h3><u>Changes to this Privacy Policy.</u></h3>
            <p>
                {domain} reserves the right to revise and update this Privacy Policy at any time. Any such revisions will be effective on the date of posting to the Site, and will apply to all information collected by {domain} both prior to and following the effective date. Your use of the Site following any such revisions will be deemed your acceptance of such revisions. Users should periodically visit this page to review the current policies with regard to Information.
            </p>
            <h3><u>Opting Out from Offers from {domain}.</u></h3>
            <p>
                At any time, a user may opt out from receiving future offers from {domain} by following the instructions contained within each marketing communication. Such opting out will not apply to any communications from third parties to whom {domain} may have provided Information regarding the user. Third parties’ use of the Information is subject to such parties’ own privacy policies, for which {domain} shall not be responsible.
            </p>
            <h3><u>Your California Privacy Rights.</u></h3>
            <p>
                Beginning on January 1, 2005, California Civil Code Section 1798.83 permits customers of {domain} who are California residents to request certain information regarding {domain}’s disclosure of personal information for their direct marketing purposes. To make such a request, please write to: {domain}, 899 Skokie Blvd, Ste 340, Northbrook, IL 60062. Within thirty days of receiving such a request, {domain} will provide a list of the categories of personal information disclosed to third parties for third-party direct marketing purposes during the immediately preceding calendar year, along with the names and addresses of these third parties. This request may be made no more than once per calendar year. {domain} reserves its right not to respond to requests submitted other than to the address specified in this paragraph.
            </p>
            <p>
                Policy Last Revised: June 18, 2018
            </p>
        </div>
    </div>
);

export default PrivacyPolicy;