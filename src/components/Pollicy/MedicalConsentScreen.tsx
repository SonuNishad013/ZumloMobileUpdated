import React, { useRef } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { text } from "stream/consumers";

const MedicalConsentScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          Consent to Collection, Use, and Sharing of Personal Health Data{`\n`}
          (Washington My Health My Data Act Consent)
        </Text>
        <Text style={styles.date}>Last Modified: July 17th, 2025</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>1. Introduction and Scope </Text>
          <Text style={styles.paragraph}>
            Welcome to Zumlo. Zumlo, Inc. (“Zumlo,” "we," "us," or "our")
            provides an AI-enabled wellness platform designed to enhance your
            mental and emotional well-being through personalized wellness plans,
            AI-driven interactions, community engagement, and wellness-tracking
            features (the "Services"). This Consent to Collection, Use, and
            Sharing of Personal Health Data (this "Consent") provides clear
            notice regarding our practices and your rights in connection with
            Zumlo’s collection, use, disclosure, and protection of your Personal
            Health Data under Washington’s My Health My Data Act (Chapter 19.373
            RCW, the "MHMDA"). This Consent specifically and exclusively applies
            to Personal Health Data collected or processed through your use of
            our mobile application, web platform (https://zumlo.co), and
            associated functionalities (collectively, the "Application"). For
            purposes of this Consent, "Personal Health Data" means personal
            information as defined by the MHMDA relating to your physical,
            mental, or emotional health conditions, treatments, diagnoses, or
            wellness activities. This explicitly includes mental and emotional
            health information, wellness goals, biometric data, lifestyle
            habits, community interactions, and any other health-related details
            you voluntarily provide or that are collected through your use of
            the Services. Your explicit consent is voluntary, informed, and
            revocable. You may access, correct, delete, or withdraw your consent
            regarding your Personal Health Data at any time. Please note that
            withdrawing your consent will significantly restrict your access to
            certain personalized, AI-driven, or data-dependent features of the
            Application. However, you will continue to have general access to
            features that do not rely upon processing your Personal Health Data.
            This Consent is separate from, and provided in addition to, your
            acceptance of Zumlo’s Terms of Service, Privacy Notice, and any
            applicable End User License Agreement ("EULA"). While those
            documents govern your general use of the Services, this Consent
            specifically addresses and governs Zumlo’s handling of Personal
            Health Data under the MHMDA. By affirmatively providing your consent
            through this document, you explicitly agree to Zumlo’s practices as
            described herein. If you do not consent to these practices, you must
            immediately cease all use of the Application and delete it from your
            devices. Capitalized terms not explicitly defined herein have the
            meanings provided in Zumlo’s Terms of Service and Privacy Notice.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>2. Definitions</Text>
          <Text style={styles.paragraph}>
            The following terms have the meanings stated below. Capitalized
            terms used but not defined herein shall have the meanings provided
            in Zumlo’s Terms of Service, Privacy Notice, or End User License
            Agreement ("EULA"), unless otherwise expressly stated.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.1 "Application"{` `}
            <Text style={styles.subParagraph}>
              The following terms have the meanings stated below. Capitalized
              terms used but not defined herein shall have the meanings provided
              in Zumlo’s Terms of Service, Privacy Notice, or End User License
              Agreement ("EULA"), unless otherwise expressly stated.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.2 "Personal Health Data"{` `}
            <Text style={styles.subParagraph}>
              means personal information as defined under the Washington My
              Health My Data Act ("MHMDA"), relating to your physical, mental,
              or emotional health conditions, treatments, diagnoses, wellness
              activities, or services. This includes, without limitation, mental
              and emotional health information, wellness goals and activities,
              medical histories, demographic data, biometric information,
              lifestyle habits, community engagement, personal beliefs,
              preferences, feedback, and health-related information collected
              through your use of the Application.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.3 "Consent"{` `}
            <Text style={styles.subParagraph}>
              means your clear, informed, voluntary, and affirmative agreement
              to Zumlo’s collection, use, disclosure, transfer, and processing
              of your Personal Health Data, as set forth in this document,
              compliant with the requirements of the MHMDA.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.4 "Processing"{` `}
            <Text style={styles.subParagraph}>
              means any operation or set of operations performed on your
              Personal Health Data, including collection, use, storage,
              disclosure, analysis, transmission, sharing, modification,
              anonymization, pseudonymization, aggregation, retention, deletion,
              and other handling or operation described in this Consent or
              Zumlo’s Privacy Notice.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.5 "Sensitive Personal Information"{` `}
            <Text style={styles.subParagraph}>
              means Personal Health Data requiring heightened protection under
              the MHMDA or other applicable laws, including mental health
              status, emotional well-being, biometric identifiers, physical or
              mental health conditions, medical history, cultural or religious
              beliefs relating to health or wellness, and similar sensitive
              data.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.6 "Third Parties"{` `}
            <Text style={styles.subParagraph}>
              means any entity or individual service provider, vendor,
              consultant, analytics provider, technology provider, or hosting
              provider engaged by Zumlo that processes, stores, analyzes, or
              accesses your Personal Health Data on behalf of Zumlo. "Third
              Parties" explicitly excludes Zumlo’s users.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.7 "User," "you," or "your" {` `}
            <Text style={styles.subParagraph}>
              means any individual accessing, downloading, registering, or
              otherwise using the Application who provides explicit consent
              through this document.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.8 "Zumlo," "we," "us," or "our" {` `}
            <Text style={styles.subParagraph}>
              means Zumlo, Inc., as the data controller, provider, and operator
              of the Application, responsible for managing Personal Health Data
              under this Consent, Privacy Notice, Terms of Service, and EULA.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            2.9 "Washington My Health My Data Act" or "MHMDA" {` `}
            <Text style={styles.subParagraph}>
              means Chapter 19.373 RCW, Washington’s consumer health data
              privacy and security law governing the collection, use,
              disclosure, sharing, and protection of consumer health data.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>
            3. Categories of Personal and Health Data Collected {` `}
          </Text>
          <Text style={styles.paragraph}>
            By providing your consent and using Zumlo’s Application, you
            acknowledge and agree that we collect, use, disclose, process, and
            share your Personal Health Data, which may include the following
            categories of information:
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.1 Personal Information: {` `}{" "}
            <Text style={styles.subParagraph}>
              Information identifying or directly relating to you, including
              your name, date of birth, gender, educational background,
              employment status, professional skills, occupational details, and
              contact information (email address, phone number, mailing
              address), as provided by you during registration or ongoing use.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.2 Health Profile: {` `}{" "}
            <Text style={styles.subParagraph}>
              Information provided by you concerning your mental and physical
              health, medical and mental health history, emotional and
              psychological conditions, treatments, medications, symptoms,
              wellness status, self-assessments, and symptom-tracking data
              voluntarily submitted or recorded within the Application.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.3 Lifestyle and Habits: {` `}{" "}
            <Text style={styles.subParagraph}>
              Information related to your lifestyle and daily habits, including
              sleep patterns, dietary habits, exercise and physical activity
              routines, substance use, technology use, personality traits,
              hobbies, interests, motivation, and social life details relevant
              to wellness recommendations within the Application.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.4 Goals and Aspirations: {` `}{" "}
            <Text style={styles.subParagraph}>
              Information you provide regarding personal, professional,
              financial, educational, mental and physical health, emotional
              wellness, skill development, and personal improvement goals.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.5 Cultural, Religious, and Personal Beliefs:{` `}{" "}
            <Text style={styles.subParagraph}>
              cultural background, religious or spiritual beliefs, traditions,
              values, socioeconomic status, and personal principles that
              influence your wellness journey or interaction with the
              Application.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.6 Social and Community Engagement:{` `}{" "}
            <Text style={styles.subParagraph}>
              Information relating to your social interactions, family
              relationships, support networks, community involvement, social
              connections, social media interactions, and participation in
              Zumlo’s social and community-oriented features, groups, or forums.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.7 Feedback and Interaction Information:{` `}{" "}
            <Text style={styles.subParagraph}>
              User-provided feedback, survey responses, reviews, feature
              interactions, participation in research activities, and other
              engagement or communication within the Application or directly
              with Zumlo.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.8 Preferences Information:{` `}{" "}
            <Text style={styles.subParagraph}>
              Preferences you provide relating to your health, wellness
              practices, technology usage, accessibility needs, personalized
              recommendations, Application functionalities, and overall user
              experience.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.9 Communication, Journaling, and Conversational Data:{` `}{" "}
            <Text style={styles.subParagraph}>
              Information provided through journaling entries, interactions with
              Zumlo’s conversational AI features, and all other communications
              exchanged directly with Zumlo, including support requests, emails,
              messages, and in-app communications related to your wellness or
              Application use.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.10 Technical and Device Information:{` `}{" "}
            <Text style={styles.subParagraph}>
              Technical details about your device, including unique device
              identifiers, IP address, operating system, device type, browser
              information, Application usage data, access logs, analytics data,
              cookies, and related technical or device-specific data collected
              for Application functionality, security, diagnostics, and
              analytics purposes.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            3.11 Other Disclosed or Consented Information:{` `}{" "}
            <Text style={styles.subParagraph}>
              Any other categories of Personal Health Data disclosed to you at
              the point of collection, voluntarily provided by you, explicitly
              consented to by you, or otherwise described within our Privacy
              Notice or this Consent.You acknowledge that providing certain data
              is voluntary; however, declining to provide particular categories
              of Personal Health Data may limit your access to personalized
              recommendations, customized interactions, or specific Application
              features and functionalities dependent upon such data. For
              additional explicit details regarding how we handle your Personal
              Health Data, please refer to Zumlo’s comprehensive Privacy Notice.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>
            4. Explicit Purposes for Collection and Use of Personal Health Data
          </Text>
          <Text style={styles.paragraph}>
            Zumlo collects, processes, uses, stores, and shares your Personal
            Health Data solely for specific purposes clearly outlined in this
            Consent and our Privacy Notice. These purposes include:
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.1 Provision and Personalization of Wellness Services
            {`\n`}
            <Text style={styles.subParagraph}>
              To deliver personalized wellness recommendations, tailored
              wellness plans, individualized activities, wellness goal
              management, skill development, conversational AI interactions,
              journaling prompts, community engagement, and related wellness
              support offered within the Application.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.2 AI-Driven Conversational and Wellness Support
            {`\n`}
            <Text style={styles.subParagraph}>
              To provide and enhance AI-driven conversational support,
              interactive wellness recommendations, customized wellness
              activities, personalized journaling, mood tracking, emotional
              wellness coaching, and related mental wellness engagement.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.3 Wellness Progress Tracking and Management
            {`\n`}
            <Text style={styles.subParagraph}>
              To track, monitor, and evaluate your wellness progress, goal
              achievement, emotional states, participation in wellness
              activities, symptom management, and related wellness outcomes,
              providing personalized insights and reporting.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.4 User Support and Communication
            {`\n`}
            <Text style={styles.subParagraph}>
              To respond to your inquiries, resolve issues, communicate
              important Application updates, inform you of wellness activities,
              and deliver technical or customer support related to your
              Application use.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.5 Application Enhancement and Improvement
            {`\n`}
            <Text style={styles.subParagraph}>
              To evaluate, enhance, and further develop Application
              functionalities, AI algorithms, conversational interfaces,
              wellness content, user experiences, personalization capabilities,
              technical performance, accessibility, and overall service quality.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.6 Research and Analytical Purposes
            {`\n`}
            <Text style={styles.subParagraph}>
              To perform internal research and analytics aimed at understanding
              user behaviors, preferences, and wellness needs, thereby enabling
              continuous improvement of wellness recommendations, AI-driven
              support, user experience, and product innovation.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.7 Security and Compliance
            {`\n`}
            <Text style={styles.subParagraph}>
              To detect, prevent, investigate, and respond to security issues,
              fraud, unauthorized access, technical vulnerabilities, and misuse
              or violations of Zumlo’s Terms of Service, Privacy Notice, EULA,
              and this Consent; and to comply with applicable laws, regulations,
              court orders, or governmental requests.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.8 Community and Social Engagement
            {`\n`}
            <Text style={styles.subParagraph}>
              To facilitate and personalize your engagement within Zumlo’s
              wellness community, including social interactions, community
              forums, wellness groups, support networks, wellness challenges,
              and related community features within the Application.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.9 Marketing and Promotional Communications
            {`\n`}
            <Text style={styles.subParagraph}>
              With your explicit consent, to deliver tailored marketing,
              promotional materials, wellness updates, newsletters, and other
              communications regarding Zumlo’s products, services, features,
              special events, research opportunities, or wellness resources.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.10 Data Aggregation and Anonymization
            {`\n`}
            <Text style={styles.subParagraph}>
              To aggregate, anonymize, or pseudonymize Personal Health Data to
              generate insights, analytics, trends, statistical information, or
              anonymized datasets for research, product development, improvement
              of wellness recommendations, advancement of AI-driven
              technologies, and public-facing wellness analytics or educational
              purposes, without identifying any individual user.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.11 Consent Fulfillment and User Requests
            {`\n`}
            <Text style={styles.subParagraph}>
              To process and fulfill your requests, including requests to
              access, correct, delete, or modify your Personal Health Data,
              withdraw consent, or exercise privacy rights granted under MHMDA
              or other applicable laws.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            4.12 Other Purposes Disclosed and Consented
            {`\n`}
            <Text style={styles.subParagraph}>
              To For any other purposes explicitly disclosed to you at the point
              of data collection, voluntarily consented to by you, or described
              within Zumlo’s Privacy Notice or other explicitly referenced and
              consented-to documents.{`\n`}Zumlo commits to processing your
              Personal Health Data solely for these clearly described and
              consented-to purposes. Zumlo acknowledges its responsibility to
              handle your Personal Health Data in full compliance with MHMDA and
              applicable privacy and data protection laws.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>
            5. Disclosure of Third-Party Data Sharing
          </Text>
          <Text style={styles.paragraph}>
            Zumlo is committed to transparency regarding the disclosure and
            sharing of your Personal Health Data. By providing your consent, you
            acknowledge that Zumlo may disclose, transfer, or share your
            Personal Health Data with selected third parties solely for the
            purposes described in this Consent and our Privacy Notice. {`\n`}
            Third-party service providers engaged by Zumlo are contractually
            obligated to maintain confidentiality, implement appropriate
            security measures, and comply with applicable privacy laws,
            including the MHMDA. {`\n`}We disclose your Personal Health Data to
            third parties only in the following circumstances:
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.1 Service Providers and Vendors{`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo utilizes third-party providers for essential services such
              as cloud hosting, data storage, application performance, customer
              support, email delivery, subscription management, and customer
              relationship management. Examples include infrastructure providers
              (e.g., Amazon Web Services, Microsoft Azure), payment processors
              (e.g., Stripe), and communication services (e.g., Twilio). These
              providers have limited access to your data solely for the
              provision of contracted services.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.2 AI and Technology Partners {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo collaborates with AI and machine-learning partners to
              deliver personalized wellness recommendations, conversational
              experiences, journaling insights, mood tracking, and
              behavior-driven personalization. These partners process your
              Personal Health Data under strict confidentiality and
              data-protection agreements.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.3 Analytics and Research Providers {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo shares data with analytics and research providers to
              evaluate user interactions, inform product development, optimize
              wellness outcomes, and refine our AI capabilities. This shared
              data is generally anonymized, aggregated, or pseudonymized and not
              used to identify individual users.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.4 Communications Providers {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo uses third-party communication platforms (e.g., Twilio,
              SendGrid, Mailchimp) to send notifications, deliver Application
              updates, respond to user support requests, and send messages
              consented to by you. Your contact details and communication
              preferences may be shared as necessary.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.5 Payment Processing Providers {`\n`}{" "}
            <Text style={styles.subParagraph}>
              When you make payments through the Application (e.g., premium
              subscriptions), your payment information is shared with trusted
              third-party payment processors (e.g., Stripe) solely to complete
              transactions, manage billing, and handle payment-related
              communications. These providers do not use your data for any other
              purpose.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.6 Device and Platform Integration Partners {`\n`}{" "}
            <Text style={styles.subParagraph}>
              If you explicitly consent, Zumlo may integrate with third-party
              health or wellness platforms (e.g., Apple Health, Google Fit,
              Fitbit, wearables) and exchange relevant wellness data to enhance
              personalization. Such integrations can be revoked by you at any
              time within your account settings.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.7 Legal, Compliance, and Security Disclosures{`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo may disclose your Personal Health Data when required to
              comply with legal obligations, respond to regulatory inquiries or
              court orders, or investigate suspected violations of law or
              Zumlo’s policies. We may also disclose data to address fraud,
              security concerns, or threats to user safety.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.8 Corporate Transactions {`\n`}{" "}
            <Text style={styles.subParagraph}>
              In the event of a merger, acquisition, reorganization, or sale of
              assets, Zumlo may transfer your Personal Health Data to the
              relevant third party, provided that party agrees to adhere to data
              protection obligations equal to or exceeding those described in
              this Consent and our Privacy Notice.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.9 Aggregated and Anonymized Data Sharing {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo may use and share aggregated or de-identified data for
              analytics, academic research, product development, industry
              benchmarking, and public wellness reporting. Such data does not
              personally identify users and is not used for targeted marketing
              or profiling.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            5.10 Consent-Based Sharing {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo will seek your separate, specific consent before sharing
              your Personal Health Data with third parties for purposes not
              described above.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            Third-Party Safeguards and Responsibilities {`\n`}
            <Text style={styles.subParagraph}>
              All third-party recipients of your Personal Health Data are
              obligated to use such data exclusively for contracted services
              provided to Zumlo, implement data security safeguards, limit data
              access, and comply with applicable privacy laws and Zumlo’s
              internal policies.
              {`\n`}
              For more information about specific third-party providers or data
              sharing practices, please refer to Zumlo’s Privacy Notice or
              contact our privacy team at info@zumlo.co.
            </Text>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>6. Data Retention and Security</Text>
          <Text style={styles.paragraph}>
            Zumlo recognizes the critical importance of securely managing your
            Personal Health Data. We maintain industry-standard safeguards and
            retention policies designed to protect the confidentiality,
            integrity, and availability of your data in compliance with
            applicable laws, including the MHMDA.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            6.1 Data Retention Practices {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo retains your Personal Health Data as long as your account
              remains active and you continue using the Application, or as
              required to fulfill the purposes outlined in this Consent, our
              Terms of Service, Privacy Notice, and End User License Agreement
              ("EULA"), or as otherwise mandated by applicable law.{`\n`}
              {`\n`}
              Data retention periods are determined based on the following
              criteria:{`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              The need to deliver personalized wellness recommendations,
              AI-driven interactions, user support, and related Application
              services;{`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Compliance with applicable legal, regulatory, or contractual
              obligations; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Operational purposes, including enhancing Zumlo’s products, AI
              functionalities, and user experiences using aggregated or
              anonymized data; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Protection against fraud, misuse, unauthorized access, security
              incidents, or potential violations of Zumlo’s policies or
              applicable laws; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Accommodation of user requests for data access, correction,
              deletion, and consent withdrawal. {`\n`}
            </Text>
          </Text>
          <Text style={styles?.subParagraph}>
            When you delete your Zumlo account or request deletion of your data,
            Zumlo will promptly delete or anonymize your Personal Health Data
            unless retention is necessary for compliance, security, legal
            obligations, or other legitimate purposes permitted by law.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeading}>
            6.2 Data Security Measures {`\n`}{" "}
            <Text style={styles.subParagraph}>
              Zumlo employs robust security measures consistent with industry
              standards to protect your Personal Health Data against
              unauthorized access, disclosure, alteration, misuse, or loss. Our
              current security measures include, but are not limited to: {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Encryption of data at rest and during transmission using secure
              protocols (SSL/TLS); {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Role-based and restricted access controls, limiting data access
              strictly to authorized personnel and services; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Secure coding practices, vulnerability assessments, ongoing
              security monitoring, and penetration testing; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Employee training programs, confidentiality agreements, and
              security awareness initiatives; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Contractual requirements mandating third-party service providers
              adhere to confidentiality, security, and data-protection standards
              equivalent to Zumlo’s internal policies; {`\n`}
            </Text>
            <Text style={styles.subParagraph}>
              <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
                {` • `}
              </Text>
              Incident response and breach notification procedures aligned with
              applicable laws, including the MHMDA. {`\n`}
            </Text>
          </Text>
          <Text style={styles?.subParagraph}>
            While Zumlo currently utilizes industry-leading cloud infrastructure
            providers, we reserve the right to change such providers in the
            future, ensuring continued adherence to equal or superior security
            standards.{" "}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            6.3 Limitations and User Responsibilities{" "}
          </Text>
          <Text style={styles.subParagraph}>
            While Zumlo implements rigorous security safeguards, no method of
            electronic data transmission or storage is entirely secure. You
            acknowledge inherent risks associated with digital services and
            accept responsibility for safeguarding your own account credentials,
            passwords, devices, and related security practices.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            6.4 User Requests and Consent Withdrawal{" "}
          </Text>
          <Text style={styles.subParagraph}>
            You have the right to access, correct, delete, or withdraw consent
            regarding your Personal Health Data, consistent with this Consent,
            Zumlo’s Privacy Notice, and applicable privacy laws, including the
            MHMDA. Zumlo promptly and securely processes user requests. For
            additional details or to submit requests regarding your Personal
            Health Data, please consult Zumlo’s Privacy Notice or contact us
            directly at info@zumlo.co.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>
            7. User Rights under the Washington My Health My Data Act (MHMDA){" "}
          </Text>
          <Text style={styles.paragraph}>
            Zumlo respects your privacy rights in accordance with the Washington
            My Health My Data Act ("MHMDA"). You have the following rights
            regarding your Personal Health Data:
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.1 Right to Access </Text>
          <Text style={styles.subParagraph}>
            You have the right to confirm whether Zumlo collects, uses, stores,
            or shares your Personal Health Data. Upon receiving a verified
            request, Zumlo will provide you clear and complete access to your
            Personal Health Data, subject only to applicable legal limitations.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.2 Right to Correction </Text>
          <Text style={styles.subParagraph}>
            You have the right to request corrections to inaccuracies or
            incomplete information in your Personal Health Data maintained by
            Zumlo. Upon verifying your request, Zumlo will promptly update or
            correct your data as necessary.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.3 Right to Deletion </Text>
          <Text style={styles.subParagraph}>
            You have the right to request deletion of your Personal Health Data
            held by Zumlo. Following verification of your request or account
            deletion, Zumlo will promptly delete or anonymize your Personal
            Health Data unless retention is required or permitted by applicable
            law for legitimate purposes, such as compliance, security, or fraud
            prevention.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.4 Right to Withdraw Consent </Text>
          <Text style={styles.subParagraph}>
            You have the right to withdraw your consent at any time regarding
            Zumlo’s collection, use, or sharing of your Personal Health Data as
            described in this Consent. Withdrawal of consent may limit your
            access to personalized features and services. Zumlo will promptly
            implement your withdrawal of consent and notify relevant third
            parties as necessary.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.5 Right to Non-Discrimination</Text>
          <Text style={styles.subParagraph}>
            You have the right to exercise your privacy rights without
            discrimination. Zumlo will not deny services, alter the quality of
            services, or impose penalties due to your exercise of privacy rights
            protected under applicable law.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.6 Right to Transparent Notice</Text>
          <Text style={styles.subParagraph}>
            You have the right to clear, concise, transparent, and comprehensive
            notice regarding Zumlo’s practices for collecting, using,
            processing, and sharing your Personal Health Data, as provided in
            this Consent, our Terms of Service, Privacy Notice, and other
            applicable documents.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.7 Right to Data Portability </Text>
          <Text style={styles.subParagraph}>
            Upon verified request, you have the right to obtain a copy of your
            Personal Health Data in a structured, commonly used,
            machine-readable format, enabling you to transmit your data to
            another entity without undue restriction, subject only to applicable
            legal exceptions or limitations.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.8 Right to Appeal</Text>
          <Text style={styles.subParagraph}>
            If Zumlo denies or limits your request regarding your data privacy
            rights, you have the right to appeal that decision. Zumlo will
            clearly communicate and provide detailed explanations for any denial
            or limitation, consistent with our Privacy Notice and applicable
            laws.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>7.9 Exercising Your Rights</Text>
          <Text style={styles.subParagraph}>
            To exercise any of your privacy rights—including access, correction,
            deletion, or consent withdrawal—submit your request directly to
            Zumlo’s privacy team at info@zumlo.co. Zumlo will verify your
            identity and respond promptly, consistent with applicable privacy
            laws.
            {`\n`}
            Zumlo may request additional information necessary to verify your
            identity or the legitimacy of your request, ensuring compliance with
            privacy and security obligations.
            {`\n`}
            For further information regarding your privacy rights or Zumlo’s
            data protection practices, consult Zumlo’s Privacy Notice or contact
            us at info@zumlo.co. laws.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>8. Risks and Limitations of Use</Text>
          <Text style={styles.paragraph}>
            Zumlo provides the Application and related Services solely to
            support your personal wellness journey through personalized wellness
            plans, conversational AI interactions, wellness tracking,
            journaling, and associated informational features. Please carefully
            consider the following risks and limitations before using the
            Application:
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.1 Not Medical or Therapeutic Advice{" "}
          </Text>
          <Text style={styles.subParagraph}>
            The Application and all related content—including recommendations,
            wellness plans, AI-generated interactions, and other materials—are
            intended for informational, educational, and general wellness
            purposes only. Zumlo is not a licensed healthcare provider or
            medical professional, and the Application does not offer medical
            advice, diagnosis, treatment, counseling, psychotherapy, or crisis
            intervention services. Always seek professional advice from a
            qualified healthcare provider or mental health professional
            regarding medical conditions or treatments. Never disregard or delay
            seeking professional medical advice due to information received
            through the Application.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.2 No Emergency or Crisis Support
          </Text>
          <Text style={styles.subParagraph}>
            The Application is not designed or intended for emergency use,
            medical crises, mental health crises, suicidal thoughts, or
            life-threatening situations. If you experience any such situation,
            immediately contact emergency services (e.g., call 911) or seek
            immediate assistance from qualified emergency or crisis-response
            professionals. Zumlo expressly disclaims all responsibility or
            liability arising from reliance on the Application in emergency or
            crisis situations.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.3 Limitations of AI-Generated Content
          </Text>
          <Text style={styles.subParagraph}>
            Zumlo utilizes artificial intelligence ("AI") technologies to
            deliver personalized wellness recommendations, conversational
            interactions, and other features. Although we take commercially
            reasonable measures to enhance accuracy and relevance, you
            acknowledge that AI-generated content may occasionally be
            inaccurate, incomplete, inappropriate, or unsuitable for your
            specific circumstances. You are responsible for independently
            evaluating the accuracy, relevance, and appropriateness of all
            AI-generated content before acting on it. Zumlo expressly disclaims
            all liability arising from your reliance on any AI-generated content
            or recommendations provided through the Application.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>8.4 User Responsibility</Text>
          <Text style={styles.subParagraph}>
            The effectiveness of Zumlo’s recommendations, wellness interactions,
            and Application features significantly depends upon the accuracy,
            completeness, and truthfulness of information you provide. You are
            solely responsible for assessing your capabilities, limitations,
            personal circumstances, and health conditions before engaging with
            recommended activities or interactions. Zumlo disclaims liability
            for adverse outcomes resulting from inaccurate or incomplete
            information you provide or from your actions based on Application
            recommendations.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.5 Security and Data Breach Risks
          </Text>
          <Text style={styles.subParagraph}>
            Zumlo maintains industry-standard security safeguards to protect
            your Personal Health Data; however, no electronic transmission or
            data-storage method is entirely secure. Zumlo expressly disclaims
            liability for unauthorized access, data breaches, or security
            incidents outside Zumlo’s reasonable control. You acknowledge
            inherent security risks associated with digital services and accept
            responsibility for safeguarding your account credentials, passwords,
            and personal devices.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.6 Third-Party Content and Integrations
          </Text>
          <Text style={styles.subParagraph}>
            The Application may contain or link to third-party content,
            resources, websites, or integrations. Zumlo does not control,
            endorse, or guarantee the availability, accuracy, reliability,
            safety, or appropriateness of third-party content or resources. Your
            use of third-party resources or integrations is at your sole risk
            and subject to third-party terms and conditions. Zumlo expressly
            disclaims liability for your reliance on third-party content or
            resources.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.7 No Guarantee of Outcomes or Results
          </Text>
          <Text style={styles.subParagraph}>
            Zumlo does not promise or guarantee any specific outcomes, wellness
            improvements, therapeutic benefits, or results from your use of the
            Application or its recommendations. Individual results and
            experiences vary significantly based on multiple factors, including
            personal engagement, consistency, accuracy of information provided,
            and individual circumstances.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            8.8 Disclaimer and Limitation of Liability
          </Text>
          <Text style={styles.subParagraph}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ZUMLO EXPRESSLY
            DISCLAIMS ALL LIABILITY FOR ANY CLAIMS, INJURIES, LOSSES, DAMAGES,
            OR ADVERSE OUTCOMES ARISING DIRECTLY OR INDIRECTLY FROM YOUR USE OR
            INABILITY TO USE THE APPLICATION OR ITS FEATURES, INCLUDING WITHOUT
            LIMITATION ANY AI-GENERATED CONTENT, RECOMMENDATIONS, THIRD-PARTY
            MATERIALS, OR INFORMATION PROVIDED THROUGH THE APPLICATION.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subHeading}>8.9 Indemnification</Text>
          <Text style={styles.subParagraph}>
            You expressly agree to indemnify, defend, and hold harmless Zumlo,
            its affiliates, subsidiaries, directors, officers, employees,
            agents, licensors, service providers, and third-party partners from
            and against any and all claims, liabilities, losses, damages, costs,
            and expenses (including reasonable attorneys’ fees) arising from or
            related to your violation of this Consent, misuse of the
            Application, or reliance upon information or recommendations
            provided through the Application. {`\n`}
            You acknowledge and accept sole responsibility for all decisions or
            actions taken based on your use of the Application and expressly
            assume all associated risks.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>9. Voluntary Consent </Text>
          <Text style={styles.subParagraph}>
            Your use of the Zumlo Application is entirely voluntary, and
            providing consent for the collection, use, processing, and sharing
            of your Personal Health Data is not a condition for accessing basic
            Application functionality. However, certain personalized
            features—including AI-driven wellness recommendations, interactive
            insights, and wellness tracking—depend on processing your Personal
            Health Data and may not be available if you choose not to provide
            consent or later withdraw your consent. {`\n`}
            By reviewing this Consent and affirmatively selecting “I Consent”
            (or taking another action clearly indicating your agreement), you
            explicitly acknowledge and agree as follows:{`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You have received clear and comprehensive information
            </Text>{" "}
            regarding Zumlo’s collection, use, processing, and sharing of your
            Personal Health Data, including data categories, purposes,
            third-party sharing practices, your rights under MHMDA, and Zumlo’s
            data retention and security practices. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              Your consent is specific, informed, voluntary, and revocable
            </Text>{" "}
            as required under the Washington My Health My Data Act (MHMDA). You
            have the right to withdraw your consent at any time without penalty
            by following the procedures described in this Consent or by
            contacting us at info@zumlo.co. Zumlo will promptly cease processing
            your Personal Health Data following your withdrawal of consent,
            except as otherwise permitted or required by applicable law. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You understand that withdrawal of consent
            </Text>{" "}
            may significantly limit your access to personalized recommendations,
            AI-driven insights, wellness-tracking features, and other
            functionalities dependent upon Personal Health Data. However,
            withdrawal of consent will not restrict your general access to
            Application functionalities that do not rely on Personal Health Data
            processing. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You represent that you are of legal age and capacity
            </Text>{" "}
            to consent in your jurisdiction. If you provide this Consent on
            behalf of another individual, you represent that you have the legal
            authority to do so. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You acknowledge responsibility
            </Text>{" "}
            for reviewing and understanding this Consent, Zumlo’s Privacy
            Notice, Terms of Service, and other related legal documents, and for
            making informed decisions regarding your Personal Health Data and
            use of the Application. {`\n`}
          </Text>
          <Text style={styles?.paragraph}>
            Zumlo encourages you to retain a copy of this Consent for your
            records. This Consent does not replace or supersede Zumlo’s Terms of
            Service, Privacy Notice, or End User License Agreement ("EULA"),
            which govern your general use of the Application.
          </Text>
        </View>
        <View style={styles?.section}>
          <Text style={styles?.heading}>
            10. Governing Law and Contact Information
          </Text>
        </View>
        <View style={styles?.section}>
          <Text style={styles?.subHeading}>10.1 Governing Law</Text>
          <Text style={styles?.paragraph}>
            This Consent, and all disputes, claims, or controversies arising
            from or relating to it, including Zumlo’s collection, use,
            processing, or sharing of your Personal Health Data, shall be
            governed by and construed in accordance with the laws of the State
            of Washington, without regard to its conflict of law principles or
            rules. To the extent permitted by applicable law, you agree that the
            exclusive jurisdiction and venue for any legal proceedings related
            to this Consent shall be the state and federal courts located in
            King County, Washington, and you consent to the personal
            jurisdiction of such courts for resolving these matters. If you are
            located outside the United States, you expressly acknowledge and
            agree that your Personal Health Data may be collected, processed,
            and stored in jurisdictions—including the United States—which may
            not provide the same level of data protection as your home
            jurisdiction. Your use of the Application constitutes your consent
            to such international transfers, subject to this Consent and Zumlo’s
            Privacy Notice.
          </Text>
        </View>
        <View style={styles?.section}>
          <Text style={styles?.subHeading}>10.2 Contact Information </Text>
          <Text style={styles?.paragraph}>
            If you have questions, requests, complaints, or concerns regarding
            this Consent or Zumlo’s handling of your Personal Health Data—or if
            you wish to exercise your rights under the Washington My Health My
            Data Act or other applicable privacy laws—please contact us at:
            {`\n`}
          </Text>
          <Text style={styles?.subHeading}>Zumlo, Inc. </Text>
          <Text style={styles?.paragraph}>
            44679 Endicott Drive, Suite 300, #999{`\n`}Ashburn, VA, 20147{`\n`}
            United States{" "}
          </Text>
          <Text style={styles?.subHeading}>
            Email : <Text style={styles?.subParagraph}>info@zumlo.co</Text>
          </Text>
          <Text style={styles?.subHeading}>
            Website :{" "}
            <Text style={styles?.subParagraph}>https://zumlo.co </Text>
          </Text>
          <Text style={styles?.paragraph}>
            Zumlo’s privacy team will review and respond promptly to all
            inquiries and rights requests, consistent with Zumlo’s internal
            procedures and applicable regulatory obligations. You may be
            required to verify your identity and provide additional information
            necessary to fulfill your request or respond to your inquiry.
          </Text>
        </View>
        <View style={styles?.section}>
          <Text style={styles?.heading}>11. Acknowledgment and Acceptance</Text>
          <Text style={styles?.paragraph}>
            By affirmatively selecting “I Consent” or otherwise clearly
            indicating agreement (e.g., by tapping a consent button within the
            Application), you explicitly acknowledge and confirm the following:
            {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You have read and understood this Consent.{`\n`}
            </Text>{" "}
            You acknowledge receiving clear, accessible, and comprehensive
            information regarding Zumlo’s collection, use, processing, storage,
            and sharing of your Personal Health Data as required by the
            Washington My Health My Data Act (MHMDA) and other applicable laws.{" "}
            {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You voluntarily consent to the practices described herein. {`\n`}
            </Text>{" "}
            Your consent is specific, informed, affirmative, and freely given.
            You understand that consent is not mandatory and that refusal or
            withdrawal of consent may limit your access to certain personalized
            Application features or services. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You understand your privacy rights. {`\n`}
            </Text>{" "}
            You acknowledge your rights to access, correct, delete, and withdraw
            consent regarding your Personal Health Data, and understand how to
            exercise these rights as detailed in this Consent and Zumlo’s
            Privacy Notice. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You have legal age and capacity to consent. {`\n`}
            </Text>{" "}
            You represent that you are at least eighteen (18) years of age or
            the legal age of majority in your jurisdiction and possess the legal
            capacity to consent to this document. If you accept this Consent on
            behalf of another individual, you represent that you have the lawful
            authority to do so. {`\n`}
          </Text>
          <Text style={styles.subParagraph}>
            <Text style={{ fontSize: textScale(18), fontWeight: "800" }}>
              {` • `}
            </Text>
            <Text style={styles?.pointsHeader}>
              You understand your consent is binding. {`\n`}
            </Text>{" "}
            Your affirmative act of consent constitutes a legally binding
            agreement to Zumlo’s collection, use, processing, and sharing of
            your Personal Health Data as described herein and in Zumlo’s Privacy
            Notice. {`\n`}
          </Text>
          <Text style={styles?.paragraph}>
            You further acknowledge that this Consent is separate from—and does
            not replace or supersede—Zumlo’s Terms of Service, Privacy Notice,
            or End User License Agreement ("EULA"), each of which governs your
            general use of the Application.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
// •
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
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.SurfCrest,
  },
  pointsHeader: {
    marginBottom: 8,
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(16),
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.SurfCrest,
  },
  subParagraph: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.SurfCrest,
    fontWeight: "400",
  },
});

export default MedicalConsentScreen;
