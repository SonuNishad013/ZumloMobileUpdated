import React, { useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import { log } from "console";
type SectionData = {
  title: string;
  paragraphs?: string[];
};

const PrivacyPolicyDetails = () => {
  const sections: SectionData[] = [
    {
      title: "",
      paragraphs: [
        `Welcome to Zumlo, a well-being platform, integrating generative AI and evidence-based practices to provide personalized support for individuals, and innovative tools for healthcare providers. This Privacy Notice explains how Zumlo, Inc. (“Zumlo”) collects, uses, discloses, and otherwise processes personal data in connection with its products and services, mobile app, and website https://zumlo.co We may also choose or be required by law to provide different or additional disclosures relating to the processing of personal data about residents of certain countries, regions, or states. Please refer to the Region-Specific Disclosures section below for additional disclosures that may be applicable to you.
This Privacy Notice does not address our privacy practices relating to Zumlo’s job applicants, employees and other employment-related individuals, nor data that is not subject to applicable data protection laws (such as deidentified or publicly available information). This Privacy Notice is also not a contract and does not create any legal rights or obligations not otherwise provided by law.`,
      ],
    },
    {
      title: "A note about our services: ",
      paragraphs: [
        `Zumlo is designed as a self-help tool which may include some feedback and support for your goals. Zumlo’s services do not include the provision of medical care, medical advice, diagnosis, treatment, or mental health services, or other professional services. Zumlo’s sole purpose is to assist you in self-evaluating, monitoring, and tracking your mental wellbeing. Zumlo’s content is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek advice from a qualified professional healthcare provider. Never disregard medical advice or delay in seeking it because of your interactions with Zumlo. By accessing and using Zumlo’s services you are not entering into a doctor-patient, or provider-patient relationship with Zumlo. If you think you may have a medical emergency, call 911 or see a doctor immediately. Reliance on Zumlo’s content is solely at your own risk.`,
      ],
    },
    {
      title: "Our Role in Processing Personal Data",
      paragraphs: [
        `Data protection laws sometimes differentiate between “controllers” and “processors” of personal data. A “controller” determines the purposes and means (the why and how) of processing personal data. A “processor,” which is sometimes referred to as a “service provider,” processes personal data on behalf of a controller subject to the controller’s instructions.\n
      This Privacy Notice describes our privacy practices where we are acting as the controller of personal data. However, this Privacy Notice does not cover or address how our customers may process personal data when they use our services, or how we may process personal data on their behalf in accordance with their instructions where we are acting as their processor. As a result, we recommend referring to the privacy notice of the customer with which you have a relationship for information on how they engage processors, like us, to process personal data on their behalf. In addition, we are generally not permitted to respond to individual requests relating to personal data we process on behalf of our customers, so we recommend directing any requests to the relevant customer.
      `,
      ],
    },
    {
      title: "Our Collection and Use of Personal Data",
      paragraphs: [
        `The categories of personal data we collect depend on how you interact with us and our services. For example, you may provide us your personal data directly when you sign up for our mailing list, register for an account, sign up for a subscription service, interact with Zumlo and other users, post a review, participate in an event, promotion or survey, or otherwise contact us or interact with us


We also collect personal data automatically when you interact with our websites and other services and may also collect personal data from other sources and third parties.`,
      ],
    },
    {
      title: "Personal Data Provided by Individuals",
      paragraphs: [
        `We collect the following categories of personal data individuals provide us:

- Contact Information, including first and last name, phone number, email address, mailing address, and communication preferences. We use this information primarily to fulfill your request or transaction, to communicate with you directly, and to send you marketing communications in accordance with your preferences.\n
- Information, including first and last name, email address, phone number, account credentials or one-time passcodes, and the products or services you are interested in, purchased, or have otherwise used. We use this information primarily to administer your account, provide you with our products and services, communicate with you regarding your account and your use of our products and services, and for customer support purposes.\n
- Customer Content, including any information, files, documents, audio, videos, images, data, or communications you choose to input, upload, or transmit to our products and services. Categories of data which you may choose to provide include information about your education and occupation, lifestyle and habits, goals and aspirations, cultural, religious and personal beliefs, and social interactions, community engagement, and family information. We use this content primarily to provide you with our products and services, to facilitate your requests, and to improve our products and services. This may include using the data you provide in aggregated form to train and improve our AI models to ensure you are provided with a more accurate and relevant service from Zumlo.\n
- Health Information, including information about your physical and mental health, medical conditions, medical history, medications, emotional and psychological wellbeing, and symptoms. This can include tracking data collected from wearable devices or mobile sensors you choose to link to our services, such as heart rate, sleep patterns and activity levels. Please refer to the Region-Specific Consumer Health Data Privacy Disclosures section below for additional disclosures that may be applicable to you.\n
- Payment Information, including payment card information, billing address, and other financial information (such as, routing and account number). Please note that we use third-party payment providers,including Stripe, to process payments made to us. We do not retain any personally identifiable financial information, such as payment card number, you provide these third-party payment providers in connection with payments. Rather, all such information is provided directly by you to our third-party payment providers. The payment provider’s use of your personal data is governed by their privacy notice. To view Stripe’s privacy policy, please click here\n
- Event, Contest, Promotion, and Survey Information, including information provided when you sign up for an event, enter a contest or promotion, complete a survey or submit a testimonial. We use this information primarily to administer and facilitate our products and services, respond to your submission, communicate with you, conduct market research, inform our marketing and advertising activities, improve and grow our business, and facilitate the related event, contet, promotion, or survey.\n
- Feedback and Support Information, including the contents of custom messages sent through the forms, chat platforms, including our online live chat or automated chat functions, email addresses, or other contact information we make available to customers, as well as recordings of calls with us, where permitted by law (including through the use of automated tools provided by us or our third-party providers). We use this information primarily to investigate and respond to your inquiries, to communicate with you via online chat, email, phone, text message or social media, and to improve our products and services.\n
- Security-Related Information, including name and contact information of visitors to our premises, video recordings of videos on our premises, and electronic login records and access details when a visitor utilizes company technology on our premises. We use this information primarily to protect the security of our premises, employees, and our company.\n
If you choose to contact us, we may need additional information to fulfill the request or respond to your inquiry. We may provide additional privacy disclosures where the scope of the request we receive or personal data we require fall outside the scope of this Privacy Notice. In that case, the additional privacy disclosures will govern how we may process the information you provide at that time.\n
  `,
      ],
    },
    {
      title: "Personal Data Automatically Collected",
      paragraphs: [
        `We, and our third-party partners, automatically collect information you provide to us and information about how you access and use our products and services when you engage with us. We typically collect this information through the use of a variety of our own and our third-party partners’ automatic data collection technologies, including (i) cookies or small data files that are stored on an individual’s computer and (ii) other, related technologies, such as web beacons, pixels, embedded scripts, mobile SDKs, location-identifying technologies and logging technologies. Information we collect automatically about you may be combined with other personal data we collect directly from you or receive from other sources.


We, and our third-party partners, use automatic data collection technologies to automatically collect the following data when you use our services or otherwise engage with us:

- Information About Your Device and Network, including the device type, manufacturer, and model, operating system, IP address, browser type, Internet service provider, and unique identifiers associated with you, your device, or your network (including, for example, a persistent device identifier). We employ third-party technologies designed to allow us to recognize when two or more devices are likely being used by the same individual and may leverage these technologies (where permitted) to link information collected from different devices.\n
- Information About the Way Individuals Use Our Services and Interact With Us, including the site from which you came, the site to which you are going when you leave our services, how frequently you access our services, whether you open emails or click the links contained in emails, whether you access our services from multiple devices, and other browsing behavior and actions you take on our services (such as the pages you visit, the content you view, videos you watch, the communications you have through our services, and the content, links and ads you interact with). We employ third-party technologies designed to allow us to collect detailed information about browsing behavior and actions that you take on our services, which may record your mouse movements, scrolling, clicks, and keystroke activity on our services and other browsing, search or purchasing behavior. These third-party technologies may also record information you enter when you interact with our products or services, or engage in chat features or other communication platforms we provide.\n
- Information About Your Location, including general geographic location that we or our third-party providers may derive from your IP address, as well as more precise geolocation when you grant us access through your device settings (for example, if you use a wearable device or mobile sensor that tracks your exercise routine or counts your steps, this may share your geolocation with us.\n
- All of the information collected automatically through these tools allows us to improve your customer experience. For example, we may use this information to enhance and personalize your user experience, to monitor and improve our products and services, to offer communications features such as live and automated chat, and to improve the effectiveness of our products, services, offers, communications and customer service. We may also use this information to:\n
        (a) remember information so that you will not have to re-enter it during your visit or the next time you visit the site;\n
        (b) provide custom, personalized content and information;\n
        (c) identify you across multiple devices;\n
        (d) provide and monitor the effectiveness of our services\n
        (e) monitor aggregate metrics such as total number of visitors, traffic, usage, and demographic patterns on our website;\n
        (f) diagnose or fix technology problems; and\n
        (g) otherwise to plan for and enhance our products and services.\n

For information about the choices you may have in relation to our use of automatic data collection technologies, please refer to the Your Privacy Choices section below.`,
      ],
    },
    {
      title: "Personal Data from Other Sources and Third Parties",
      paragraphs: [
        `We may receive the same categories of personal data as described above from the following sources and other parties:

- Single Sign-On We may provide you the ability to log in to our services through certain third-party accounts you maintain. When you use these single sign-on protocols to access our services, we do not receive your login credentials for the relevant third-party service. Instead, we receive tokens from the single sign-on protocol to help identify you in our system (such as by your username) and confirm you successfully authenticated through the single sign-on protocol. This information allows us to more easily provide you access to our products and services.\n
- Mobile Sign-On: We may provide you the ability to log in to our mobile applications or authenticate yourself using facial, fingerprint, or other biometric recognition technology available through your mobile device. If you choose to utilize these login features, information about your facial geometry, your fingerprint, or other biometric information will be collected by your mobile device for authentication purposes. We do not store or have access to this biometric information. Instead, your mobile device will perform the biometric authentication process and only let us know whether the authentication was successful. If the authentication was successful, you will be able to access the applicable mobile application or feature without separately providing your credentials. For more details, please refer to the biometric authentication guides offered by your device provider.\n
- Employers: If you interact with our services in connection with your employment, we may obtain personal data about you from your employer or another company for which you work. For example, we may obtain your contact information from your employer to allow us to communicate with you about your employer’s customer relationship with us.\n
- Other Customers: We may receive your personal data from our other customers. For example, a customer may provide us with your contact information as a part of a referral.\n
- Social Media: When you interact with our services through other social media networks, such as when you follow us or share our content on other social networks, we may receive some information that you permit the social network to share with third parties. The data we receive is dependent upon your privacy settings with the social network, and may include profile information, profile picture, username, and any other information you permit the social network to share with third parties. You should always review and, if necessary, adjust your privacy settings on third-party websites and social media networks and services before sharing information and/or linking or connecting them to other services. We use this information primarily to operate, maintain, and provide to you the features and functionality of our products and services, as well as to communicate directly with you, such as to send you messages about features that may be of interest to you\n
- Advertisers, Influencers, and Publishers: We engage in advertising both on our services and through third-party services. Advertisers, influencers, and publishers may share personal data with us in connection with our advertising efforts. For example, we may obtain information about whether an advertisement on our services led to a successful engagement between you and a third-party advertiser.\n
- Business Partners: We may receive your information from our business partners, such as companies that offer their products and/or services as a part of or in connection with our services. For example, certain of our products and services allow our customers to integrate third-party services. If you choose to leverage these third-party service integrations, we may receive confirmation from our business partner regarding whether you are an existing customer of their services.\n
- Service Providers: Our service providers that perform services on our behalf, such as analytics and certain marketing providers, collect personal data and often share some or all of this information with us. For example, we receive personal data you may submit in response to requests for feedback to our survey providers.\n
- Other Sources: We may also collect personal data about you from other sources, including publicly available sources, third-party data providers, brand partnerships, or through transactions such as mergers and acquisitions.X\n
- Inferences: We may generate inferences or predictions about you and your interests and preferences based on the other personal data we collect and the interactions we have with you.\n`,
      ],
    },
    {
      title: "Additional Uses of Personal Data",
      paragraphs: [
        `In addition to the primary purposes for using personal data described above, we may also use personal data we collect to:

- Fulfill or meet the reason the information was provided, such as to fulfill our contractual obligations, to facilitate payment for our products and services, or to deliver the services requested;\n
- Manage our organization and its day-to-day operations;\n
- Communicate with you, including via email, text message, chat, social media and/or telephone calls;\n
- Facilitate the relationship we have with you and, where applicable, the company you represent;\n
- Request you provide us feedback about our product and service offerings;\n
- Address inquiries or complaints made by or about an individual in connection with our products or services;\n
- Create and maintain accounts for our users;\n
- Verify your identity and entitlement to our products and services;\n
- Register you for and provide you access to events, contests, sweepstakes, and surveys;\n
- Market our products and services to you, including through email, phone, text message, push notification, and social media;\n
- Administer, improve, and personalize our products and services, including by recognizing you and remembering your information when you return to our products and services;\n
- Develop, operate, improve, maintain, protect, and provide the features and functionality of our products and services\n
- Identify and analyze how you use our products and services;\n
- Infer additional information about you from your use of our products and services, such as your interests.\n
- Create aggregated or de-identified information that cannot reasonably be used to identify you, which information we may use for purposes outside the scope of this Privacy Notice;\n
- Conduct research and analytics on our user base and our products and services, including to better understand the demographics of our users;\n
- Improve and customize our products and services to address the needs and interests of our user base and other individuals we interact with;\n
- Test, enhance, update, and monitor the products and services, or diagnose or fix technology problems;\n
- Help maintain and enhance the safety, security, and integrity of our property, products, services, technology, assets, and business;\n
- Defend, protect, or enforce our rights or applicable contracts and agreements (including our Terms of Use), as well as to resolve disputes, to carry out our obligations and enforce our rights, and to protect our business interests and the interests and rights of third parties;\n
- Detect, prevent, investigate, or provide notice of security incidents or other malicious, deceptive, fraudulent, or illegal activity and protect the rights and property of Zumlo and others;\n
- Facilitate business transactions and reorganizations impacting the structure of our business;\n
- Comply with contractual and legal obligations and requirements;\n
- Fulfill any other purpose for which you provide your personal data, or for which you have otherwise consented.\n
`,
      ],
    },
    {
      title: "Our Disclosure of Personal Data",
      paragraphs: [
        `We disclose or otherwise make available personal data in the following ways:

- To Your Employer: If you interact with our services in connection with your employment, we may disclose personal data to your employer or another company for which you work. For example, we may provide information to your employer about your usage of our services in connection with your work for them.\n
- To Other Customers and the General Public: We make available personal data designed for sharing through our services with certain or all other Zumlo customers, or the general public, based on the applicable privacy settings and intended recipients. Keep in mind that the customers who view customer-generated content can always reshare or redistribute the content both on and off our services or save or copy the content outside of our services. In addition, by publicly posting content on our services, you are directing us to disclose that information as broadly as possible and directing those accessing the content to do the same.\n
- To Marketing Providers: We coordinate and share personal data with our marketing providers in order to advertise and communicate with you about the products and services we make available.\n
- To Business Partners: We may share personal data with our business partners, or we may allow our business partners to collect personal data directly from you in connection with our services. Our business partners may use your personal data for their own business and commercial purposes, including to send you information about their products and services.\n
- To AI Service Providers: We share personal data with service providers who enable us to provide AI-powered services. For example, this may include service providers who assist us in providing the AI-powered tools that form part of our service. Our current list of providers is available upon request.\n
- To Other Service Providers: We engage other third parties to perform certain services on our behalf in connection with the uses of personal data described in the sections above. Depending on the applicable services, these service providers may process personal data on our behalf or have access to personal data while performing services on our behalf.\n
- To Other Businesses as Needed to Provide Services: We may share personal data with third parties you engage with through our services or as needed to fulfill a request or transaction including, for example, payment processing services.\n
- In Connection with a Business Transaction or Reorganization: We may take part in or be involved with a business transaction or reorganization, such as a merger, acquisition, joint venture, or financing or sale of company assets. We may disclose, transfer, or assign personal data to a third party during negotiation of, in connection with, or as an asset in such a business transaction or reorganization. Also, in the unlikely event of our bankruptcy, receivership, or insolvency, your personal data may be disclosed, transferred, or assigned to third parties in connection with the proceedings or disposition of our assets.\n
- To Facilitate Legal Obligations and Rights: We may disclose personal data to third parties, such as legal advisors and law enforcement:\n
  - in connection with the establishment, exercise, or defense of legal claims;\n
  - to comply with laws or to respond to lawful requests and legal process;\n
  - to protect our rights and property and the rights and property of our agents, customers, and others, including to enforce our agreements, policies, and terms of use;\n
  - to detect, suppress, or prevent fraud;\n
  - to reduce credit risk and collect debts owed to us;\n
  - to protect the health and safety of us, our customers, or any person; or\n
  - as otherwise required by applicable law.\n
- With Your Consent or Direction: We may disclose your personal data to certain other third parties or publicly with your consent or direction. For example, with your permission, we may post your testimonial on our websites.\n
`,
      ],
    },
    {
      title: "Your Privacy Choices",
      paragraphs: [
        `The following privacy choices are made available to all individuals with whom we interact. You may also have additional choices regarding your personal data depending on your location or residency. Please refer to ourRegion-Specific Consumer Health Data Privacy Disclosures below for information about additional privacy choices that may be available to you.`,
      ],
    },
    {
      title: "Communication Preferences",
      paragraphs: [
        `- Email Communication Preferences: You can stop receiving promotional email communications from us by clicking on the “unsubscribe” link provided in any of our email communications. Please note you cannot opt-out of service-related email communications (such as, account verification, transaction confirmation, or service update emails).\n
- Push Notification Preferences: You can stop receiving push notifications from us by changing your preferences in your device’s notification settings menu or in the applicable service-specific application. Please note we do not have any control over your device’s notifications settings and are not responsible if they do not function as intended.\n
- Direct Mailing Preferences: You can stop receiving promotional direct mail communications from us by contacting us at info@zumlo.co Please note this opt-out does not affect any mailings that are controlled by third parties that may feature or mention our services.\n`,
      ],
    },
    {
      title: "Withdrawing Your Consent",
      paragraphs: [
        `Where we have your consent for the processing of your personal data (e.g., when you opt in to receive certain types of marketing communications from us), you may withdraw your consent by following the instructions provided when your consent was requested or by contacting us as set forth in the Contact Us section below.`,
      ],
    },
    {
      title: "Automatic Data Collection Preferences",
      paragraphs: [
        `Where a Zumlo-specific preference manager or privacy setting is not available, you may be able to utilize third-party tools and features to further restrict our use of automatic data collection technologies. For example,
        (i) most browsers allow you to change browser settings to limit automatic data collection technologies on websites,
        (ii) most email providers allow you to prevent the automatic downloading of images in emails that may contain automatic data collection technologies, and
        (iii) many devices allow you to change your device settings to limit automatic data collection technologies for device applications. Please note that blocking automatic data collection technologies through third-party tools and features may negatively impact your experience using our services, as some features and offerings may not work properly or at all. Depending on the third-party tool or feature you use, you may not be able to block all automatic data collection technologies or you may need to update your preferences on multiple devices or browsers. We do not have any control over these third-party tools and features and are not responsible if they do not function as intended`,
      ],
    },
    {
      title: "Modifying or Deleting Your Personal Data",
      paragraphs: [
        `Modifying or Deleting Your Personal Data
If you have any questions about reviewing, modifying, or deleting your personal data, you can contact us directly at info@zumlo.co . We may not be able to modify or delete your personal data in all circumstances`,
      ],
    },
    {
      title: "Partner-Specific Preferences",
      paragraphs: [
        `Certain of our third-party providers and partners offer additional ways that you may exercise control over your personal data, or automatically impose limitations on the way we can use personal data in connection with the services they provide

- Device-Specific / Platform-Specific PreferencesThe device and/or platform you use to interact with us (such as your mobile device or social media provider), may provide you additional choices with regard to the data you choose to share with us. For example, many mobile devices allow you to change your device permissions to prevent our products and services from accessing certain types of information from your device (such as your contact lists or precise geolocation data), and many social media platforms allow you to change your platform permissions to prevent integrated products and services from accessing certain types of information connected with your profile. Please refer to your device or platform provider’s user guides for additional information about implementing any available platform-specific targeted advertising opt-outs.\n
- Google Analytics:Google Analytics allows us to better understand how our customers interact with our services. For information on how Google Analytics collects and processes data, as well as how you can control information sent to Google, review Google's website here: www.google.com/policies/privacy/partners/. You can learn about Google Analytics’ currently available opt-outs, including the Google Analytics Browser Add-On here: https://tools.google.com/dlpage/gaoptout/. We may also utilize certain forms of display advertising and other advanced features through Google Analytics. These features enable us to use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick advertising cookie) or other third-party cookies together to inform, optimize, and display ads based on your past visits to our services. You may control your advertising preferences or opt-out of certain Google advertising products by visiting the Google Ads Preferences Manager, currently available at https://www.adssettings.google.com/anonymous?ref=ps-tech&hl=en.`,
      ],
    },
    {
      title: "Children’s Personal Data",
      paragraphs: [
        `Our services are not directed to, and we do not intend to, or knowingly, collect or solicit personal data from children under the age of 18. If an individual is under the age of 18, they should not use our services or otherwise provide us with any personal data either directly or by other means. If a child under the age of 18 has provided personal data to us, we encourage the child’s parent or guardian to contact us to request that we remove the personal data from our systems. If we learn that any personal data we collect has been provided by a child under the age of 18, we will promptly delete that personal data.`,
      ],
    },
    {
      title: "Security of Personal Data",
      paragraphs: [
        `We have implemented reasonable physical, technical, and organizational safeguards that are designed to protect your personal data. However, despite these controls, we cannot completely ensure or warrant the security of your personal data.`,
      ],
    },
    {
      title: "Retention of Personal Data",
      paragraphs: [
        `We will usually retain the personal data we collect about you for no longer than reasonably necessary to fulfil the purposes for which it was collected, and in accordance with our legitimate business interests and applicable law. However, if necessary, we may retain personal data for longer periods of time as required under applicable law or as needed to resolve disputes or protect our legal rights.\n


To determine the appropriate duration of the retention of personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of personal data and if we can attain our objectives by other means, as well as our legal, regulatory, tax, accounting, and other applicable obligations.\n


Once retention of the personal data is no longer reasonably necessary for the purposes outlined above, we will either delete or deidentify the personal data or, if that is not possible (for example, because personal data has been stored in backup archives), we will securely store the personal data and isolate it from further active processing until deletion or deidentification is possible

`,
      ],
    },
    {
      title: "Third-Party Websites and Services",
      paragraphs: [
        `Our services may include links to third-party websites, plug-ins, applications and other services. Except where we post, link to or expressly adopt or refer to this Privacy Notice, this Privacy Notice does not apply to any personal data practices of third parties. To learn about the personal data practices of third parties, please visit their respective privacy notices`,
      ],
    },
    {
      title: "Region-Specific Disclosures",
      paragraphs: [
        `We may choose or be required by law to provide different or additional disclosures relating to the processing of personal data about residents of certain states. Disclosures relating to Consumer Health Data can be found here.`,
      ],
    },
    {
      title: "Updates to This Privacy Notice",
      paragraphs: [
        `We may update this Privacy Notice from time to time. When we make changes to this Privacy Notice, we will change the date at the beginning of this Privacy Notice. If we make material changes to this Privacy Notice, we will notify individuals by email to their registered email address, by prominent posting on this website or our other platforms, or through other appropriate communication channels. All changes shall be effective from the date of publication unless otherwise provided.`,
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        `If you have any questions or requests in connection with this Privacy Notice or other privacy-related matters, please visit info@zumlo.co.`,
      ],
    },
    {
      title: "Region-Specific Consumer Health Data Privacy Disclosures",
      paragraphs: [],
    },
    {
      title: "Last Updated: May 5th, 2025",
      paragraphs: [
        `This section explains how Zumlo collects, uses, discloses, and otherwise processes Consumer Health Data (as defined below) of residents of the state of Washington, or Nevada, or individuals whose Consumer Health Data is collected in those states by Zumlo. In addition, this Consumer Health Notice covers the related content, products, services, or other functionality offered by Zumlo.`,
      ],
    },
    {
      title: "Our Collection and Use of Consumer Health Data",
      paragraphs: [
        `The term “Consumer Health Data” as used in this Consumer Health Privacy Notice means any personal data that is linked or reasonably linkable to you and that identifies your past, present, or future physical or mental health status as defined in the Washington My Health My Data Act or the Nevada Consumer Health Data Privacy Law (the “Consumer Health Privacy Laws”). The Consumer Health Data we collect depends on the context of your interactions with us and, in most cases, is information that you decide to share with us. This includes information collected through consultation questionnaires, your communications with us, or from your other interactions with our Service. Consumer Health Data does not include information that is considered deidentified under the Consumer Health Privacy Laws.

Examples of Consumer Health Data that we may collect include:

- Information you share about your health-related conditions, symptoms, experiences, diagnoses, testing, or treatments.\n
- Any health-related information that you share with our customer support services.\n
- Precise location data that could reasonably indicate that you are attempting to acquire or receive health services or supplies.\n
- Other information that may be used to infer or derive data related to the above or other health-related information.\n
We may process and/or use your Consumer Health Data (including with your consent where required by the Consumer Health Privacy Laws) for the following purposes:\n

- To manage and provide our services to you.\n
- To manage, provide, maintain, and improve our business.\n
- To respond to your questions, concerns, and other requests for assistance.\n
- To customize your browsing and shopping experience.\n
- For market research and providing insights into consumer health behaviors/conditions.\n
- To build and enhance consumer profiles.\n
- To provide targeted offers that may be of interest to you.\n
- To create anonymous, aggregated, or de-identified data.\n`,
      ],
    },
    {
      title: "Sources of Consumer Health Data",
      paragraphs: [
        `The Consumer Health Data we collect depends on the context of your interactions with our services and, in most cases, is information that you decide to share with us.


We and our service partners may collect Consumer Health Data over time and across third-party websites and mobile applications. For more information, please see the “Our Collection and Use of Personal Data” section of our Privacy Notice.`,
      ],
    },
    {
      title: "Our Disclosure of Consumer Health Data",
      paragraphs: [
        `We may share the categories of Consumer Health Data set forth above in the following circumstances

- To Service Providers: We work with a variety of service providers who help us process your Consumer Health Data, such as to facilitate the operation of our Sites and Services and to support our communications, and advocacy programs.\n
- As part of Business Transactions: We may take part in or be involved with a business transaction, such as a merger. We may disclose Consumer Health Data to a third-party during the negotiation of or in connection with such a transaction.\n
- In relation to the exercise of Legal Obligations and Rights: We may disclose Consumer Health Data to third parties: in connection with the establishment, exercise, or defense of legal claims; to comply with laws or to respond to lawful requests and legal processes; to protect our rights and property and the rights and property of others, including to enforce our agreements and policies; to detect, suppress, or prevent fraud; to protect the health and safety of us and others; or as otherwise required by applicable law.\n
- With Your Consent: We may disclose Consumer Health Data about you to other service providers or publicly with your consent or at your direction. For example, with an individual’s consent or at their direction we may post their testimonial on our Sites or Services-related publications.\n
With your prior consent, we may also share the categories of Consumer Health Data set forth above with the following third parties:\n

- To Other Customers and the General Public: We make available Consumer Health Data designed for sharing through our services with certain or all other Zumlo customers, or the general public, based on the applicable privacy settings and intended recipients. Keep in mind that the customers who view customer-generated content can always reshare or redistribute the content both on and off our services or save or copy the content outside of our services. In addition, by publicly posting content on our services, you are directing us to disclose that information as broadly as possible and directing those accessing the content to do the same.\n
- To Marketing Providers: We may coordinate and share Consumer Health Data with our marketing providers in order to advertise and communicate with you about the products and services we make available.\n
- To Ad Networks and Advertising Partners: We work with third-party ad networks and advertising partners to deliver advertising and personalized content on our services, on other websites and services, and across other devices. These parties may collect information automatically from your browser or device when you visit our websites and other services through the use of cookies and related technologies. This information is used to provide and inform targeted advertising, as well as to provide advertising-related services such as reporting, attribution, analytics, and market research.\n
- To Business Partners: We may share Consumer Health Data with our business partners, or we may allow our business partners to collect Consumer Health Data directly from you in connection with our services. Our business partners may use your Consumer Health Data for their own business and commercial purposes, including to send you information about their products and services.\n
- To AI Service Providers: We share Consumer Health Data with service providers who enable us to provide AI-powered services. For example, this may include service providers who assist us in providing the AI-powered tools that form part of our service. Our current list of providers is available upon request.\n
- To Other Businesses as Needed to Provide Services: We may share Consumer Health Data with third parties you engage with through our services or as needed to fulfill a request or transaction including, for example, payment processing services\n
`,
      ],
    },
    {
      title: "Your Privacy Rights",
      paragraphs: [
        `The Laws provide the following rights with respect to Consumer Health Data we collect about you:

- Right to Access / Confirm: You may have the right to confirm whether we are collecting, sharing, or selling Consumer Health Data about you and with whom we may be disclosing such Consumer Health Data, and to access such data.\n
- Right to Withdraw Consent: If you have provided your consent for our processing or sharing of your Consumer Health Data, you may have the right to withdraw your consent.\n
- Right to Delete: You may have the right to request that we delete your Consumer Health Data and that all third parties to whom we have disclosed your Consumer Health Data delete such data.\n
`,
      ],
    },
    {
      title: "How to Exercise Your Privacy Rights",
      paragraphs: [
        `To exercise any of the privacy rights set forth above or to review or request changes to your Consumer Health Data, please submit a request to info@zumlo.co.


Before processing your request, we will need to authenticate your identity. To authenticate your identity, we will generally require matching a minimum amount of information you provide us with the information we maintain about you in our systems. This process may require us to request additional information from you, including, but not limited to, your email address and phone number.


In certain circumstances, we may decline a request to exercise the rights described above, particularly where we are unable to authenticate your identity or locate your information in our systems. If we are unable to comply with all or a portion of your request, we will explain the reasons for our decision.
`,
      ],
    },
    {
      title: "Appealing Privacy Rights Decisions",
      paragraphs: [
        `If your request to exercise a right under the Laws is denied, you may appeal that decision by contacting us at info@zumlo.co. If the appeal is unsuccessful, you may raise a concern or lodge a complaint with the applicable State Attorney General.`,
      ],
    },
    {
      title: "Changes to this Consumer Health Data Privacy Notice",
      paragraphs: [
        `We may update this Consumer Health Notice from time to time. When we make changes to this Consumer Health Notice, we will notify you by changing the date at the beginning of this Consumer Health Notice. If we make material changes to this Consumer Health Notice, we will notify individuals by email to their registered email address, by prominent posting on this website or our other platforms, or through other appropriate communication channels. All changes shall be effective from the date of publication unless otherwise specified.`,
      ],
    },
  ];
  const parseAndStyleText = (text: string): React.ReactNode[] => {
    const fragments: React.ReactNode[] = [];
    const regex =
      /([“”])([^“”]+?)\1|(\bhttps?:\/\/[^\s]+)|\b([\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})\b/g;

    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index);
      if (before) fragments.push(<Text key={key++}>{before}</Text>);

      // Bold smart-quoted text
      if (match[1]) {
        fragments.push(
          <Text key={key++} style={styles.bold}>
            {match[2]}
          </Text>
        );
      }

      // URL
      else if (match[3]) {
        const url = match[3];
        fragments.push(
          <Text key={key++} style={styles.link}>
            {url}
          </Text>
        );
      }

      // Email
      else if (match[4]) {
        const email = match[4];
        const mailto = `mailto:${"info@zumlo.co"}`;
        fragments.push(
          <Text
            key={key++}
            style={styles.link}
            onPress={() =>
              Linking.canOpenURL(mailto)
                .then((supported) => {
                  if (supported) Linking.openURL(mailto);
                  else
                    Alert.alert(
                      "No Email App Found",
                      "Please install an email client to send emails."
                    );
                })
                .catch(() =>
                  Alert.alert("Error", "An unexpected error occurred")
                )
            }
          >
            {email}
          </Text>
        );
      }

      lastIndex = regex.lastIndex;
    }

    const after = text.slice(lastIndex);
    if (after) fragments.push(<Text key={key++}>{after}</Text>);

    return fragments;
  };

  const TermsSection = () => {
    return (
      <View style={{}}>
        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.heading}>{section.title}</Text>
            {section.paragraphs.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {parseAndStyleText(p)}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Privacy Notice</Text>
        <Text style={styles.date}>Last Modified: May 5th 2025</Text>
        {TermsSection()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.privacyPolicyBG,
  },
  tocContainer: {
    marginBottom: 16,
  },
  tocTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tocItem: {
    fontSize: 16,
    color: colors.SurfCrest,
    marginBottom: 4,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.SurfCrest,
  },
  date: {
    fontSize: 14,

    marginBottom: 16,
    color: colors.SurfCrest,
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.SurfCrest,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.SurfCrest,
  },
  link: {
    color: colors.SurfCrest, // Dodger blue or any color you like
    // textDecorationLine: "underline",
  },
  heading2: {
    // textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.SurfCrest,
  },
  bold: {
    fontWeight: "bold",
    color: colors.SurfCrest,
  },
});

export default PrivacyPolicyDetails;
