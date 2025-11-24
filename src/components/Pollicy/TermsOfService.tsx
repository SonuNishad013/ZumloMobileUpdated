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

const TermsOfService = () => {
  const BoldText = (text: any) => {
    return <Text style={styles.bold}>{`${text}`}</Text>;
  };

  const sections: SectionData[] = [
    {
      title: "",
      paragraphs: [
        `These Terms of Service (these “Terms ”) describe the terms and conditions by which you may access and/or use the website(s), including https://zumlo.co, and any successor URL(s), and any and all related software, documentation, companion mobile apps for Apple and/or Google (as each of those terms is defined below) devices (the “Apps”), and online, mobile-enabled, and/or digital services (collectively, the “Service”) provided by Zumlo, Inc. (including its successors and assigns, “Zumlo,” “we,” “our,” or “us”). By accessing and/or using the Service, or by clicking a button or checking a box marked “I Agree” (or something similar), you signify that you have read, understood, and agree to be bound by these Terms, and you acknowledge that you have read and understood our Privacy Notice. We reserve the right to modify these Terms, and we will provide notice of material changes as described below. These Terms apply to all visitors and users of the Service, and to all others who access the Service (collectively, “Users,” and, as applicable to you, “you” or “your”).

PLEASE READ THESE TERMS CAREFULLY TO ENSURE THAT YOU UNDERSTAND EACH PROVISION. THESE TERMS CONTAIN A MANDATORY INDIVIDUAL ARBITRATION PROVISION IN SECTION 18.2 (THE “ARBITRATION AGREEMENT”) AND A CLASS ACTION/JURY TRIAL WAIVER PROVISION IN SECTION 18.3 (THE “CLASS ACTION/JURY TRIAL WAIVER”) THAT REQUIRE, UNLESS YOU OPT OUT PURSUANT TO THE INSTRUCTIONS IN THE ARBITRATION AGREEMENT, THE EXCLUSIVE USE OF FINAL AND BINDING ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES BETWEEN YOU AND US, INCLUDING ANY CLAIMS THAT AROSE OR WERE ASSERTED BEFORE YOU AGREED TO THESE TERMS. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW (AS DEFINED BELOW), YOU EXPRESSLY WAIVE YOUR RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL ON YOUR CLAIMS, AS WELL AS YOUR RIGHT TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, COLLECTIVE, PRIVATE ATTORNEY GENERAL, OR REPRESENTATIVE ACTION OR PROCEEDING.`,
      ],
    },
    {
      title: "1.How We Administer the Service",
      paragraphs: [
        `Eligibility. This is a contract between you and Zumlo. You must read and agree to these Terms before using the Service. If you do not agree, you may not use the Service. You may use the Service only if you can form a legally binding contract with us, and only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations (“Applicable Law”). Without limiting the generality of the foregoing, any access to, or use of, the Service by anyone who is a minor (which is under the age of 18 in most jurisdictions) in any applicable jurisdiction is strictly prohibited and in violation of these Terms. The Service is not available to any Users we previously removed from the Service\n`,
      ],
    },
    {
      title: "1.1 Eligibility",
      paragraphs: [
        `This is a contract between you and Zumlo. You must read and agree to these Terms before using the Service. If you do not agree, you may not use the Service. You may use the Service only if you can form a legally binding contract with us, and only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations (“Applicable Law”). Without limiting the generality of the foregoing, any access to, or use of, the Service by anyone who is a minor (which is under the age of 18 in most jurisdictions) in any applicable jurisdiction is strictly prohibited and in violation of these Terms. The Service is not available to any Users we previously removed from the Service.`,
      ],
    },
    {
      title: "1.2 User Accounts",
      paragraphs: [
        `(a) Your User Account Your account on the Service (your “User Account”) gives you access to certain services and functionalities that we may, in our sole discretion, establish and maintain as part of the Service from time to time. You acknowledge that, notwithstanding anything to the contrary herein, you do not own your User Account, nor do you possess any rights to data stored by or on behalf of Zumlo on the servers running the Service. We may maintain different types of User Accounts for different types of Users\n`,
        `(b) Organizational Accounts An individual may access and/or use the Service on behalf of a company or other entity, such as that individual’s employer (such entity, an “Organization”). In such cases, notwithstanding anything to the contrary herein:\n
        (i)these Terms are an agreement between (A) us and such individual and (B) us and that Organization;\n
        (ii)“you,” as used in these Terms in the context of a license grant, assignment, restriction, obligation, acknowledgment, representation, warranty, or covenant, or in any similar context, means (A) such individual and (B) “the Organization, on behalf of the Organization and its subsidiaries and affiliates, and its and their respective directors, officers, employees, contractors, agents, and other representatives who access and/or use the Service (collectively, “Org Users”)”; and “your” has the corresponding meanings;\n
        (iii)such individual represents and warrants to having the authority to bind that Organization to these Terms (and, in the absence of such authority, such individual may not access, nor use, the Service);\n
        (iv)such individual’s acceptance of these Terms will bind that Organization to these Terms;\n
        (v)we may disclose information regarding such individual and such individual’s access to and use of the Service to that Organization;\n
        (vi)such individual’s right to access and use the Service may be suspended or terminated (and the administration of the applicable User Account may be transferred) if such individual ceases to be associated with, or ceases to use an email address associated with or provisioned by, that Organization;\n
        (vii)that Organization will make all Org Users aware of these Terms’ provisions, as applicable to such Org Users, and will cause each Org User to comply with such provisions; and
        (viii)that Organization will be solely responsible and liable for all acts and omissions of the Org Users, and any act or omission by any Org User that would constitute a breach of these Terms had it been taken by that Organization will be deemed a breach of these Terms by that Organization. Without limiting the generality of the foregoing, if an individual opens a User Account using an email address associated with or provisioned by an Organization, or if an Organization pays fees due in connection with such individual’s access to or use of the Service (or reimburses such individual for payment of such fees), then we may, in our sole discretion, deem such individual to be accessing and using the Service on behalf of that Organization.\n`,
        `(c) Connecting Via Third-Party Services By connecting to the Service via a third-party service, you give us permission to access and use your information from that service, as permitted by that service, and to store your log-in credentials and/or access tokens for that service\n`,
        `(d) Account Security You may never use another User’s User Account without such User’s permission. When creating your User Account, you must provide accurate and complete information, and you must keep this information up to date. You are solely responsible for the activity that occurs on your User Account, you will keep your User Account password(s) and/or any other authentication credentials secure, and you will not share your password(s) and/or any other authentication credentials with anyone else. We encourage you to use “strong” passwords (passwords that use a combination of upper- and lower-case letters, numbers, and symbols) to protect your User Account.\n`,
        `(e) Account Settings You may control certain aspects of your User Account and any associated User profile, and of the way you interact with the Service, by changing the settings in your settings page. By providing us with your email address, you consent to our using that email address to send you Service-related notices, including any notices required by Applicable Law, in lieu of communication by postal mail. We may also use that email address to send you other messages, including, without limitation, marketing and advertising messages, such as messages notifying you of changes to features of the Service and special offers (collectively, “Marketing Emails”). If you do not want to receive Marketing Emails, you may opt out by contacting info@zumlo.co or clicking “unsubscribe”\n`,
      ],
    },
    {
      title: "1.3 Changes, Suspension, and Termination",
      paragraphs: [
        `TerminationYou may de-activate your User Account at any time. We may, with or without prior notice, change the Service, stop providing the Service or features of the Service to you or to Users generally, or create usage limits for the Service. We may, with or without prior notice, permanently terminate or temporarily suspend your access to your User Account and/or the Service without liability, with or without cause, and for any or no reason, including if, in our sole determination, you violate any provision of these Terms. Upon their termination for any reason or no reason, you continue to be bound by these Terms.`,
      ],
    },
    {
      title: "1.4 Your Interactions with Other Users",
      paragraphs: [
        `YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS, INCLUDING SHARING OF INFORMATION, WITH OTHER USERS. WE RESERVE THE RIGHT, BUT HAVE NO OBLIGATION, TO MONITOR DISPUTES BETWEEN YOU AND OTHER USERS. WE EXPRESSLY DISCLAIM ALL LIABILITY ARISING FROM YOUR INTERACTIONS WITH OTHER USERS, AND FOR ANY USER’S ACTION OR INACTION, INCLUDING RELATING TO USER CONTENT (AS DEFINED BELOW).`,
      ],
    },
    {
      title: "1.5 Not Medical Advice.",
      paragraphs: [
        `While the Service may provide access to certain general medical information, the Service cannot and is not intended to provide medical advice. The Service may provide general information to patients for educational, informative and engagement purposes. All such information is not intended to replace or complement any professional medical consultation, advice, or treatment, which should be provided by a physician or other qualified healthcare professional. We advise you to always seek the advice of a physician or other qualified healthcare provider with any questions regarding your personal health or medical conditions. If you have or suspect that you have a medical problem or condition, please contact a qualified healthcare professional immediately.

`,
      ],
    },
    {
      title: "",
      paragraphs: [
        `ZUMLO IS NOT A LICENSED HEALTHCARE PROVIDER AND ZUMLO DOES NOT OFFER MEDICAL ADVICE UNDER THESE TERMS OR THE SERVICE. ZUMLO’S PROVISION OF THE SERVICE DOES NOT CONSTITUTE THE PRACTICE OF MEDICINE OR HEALTH CARE SERVICES, ADVICE, DIAGNOSIS, OR TREATMENT, AND DOES NOT CREATE A MEDICAL PROFESSIONAL/PATIENT RELATIONSHIP.`,
      ],
    },
    {
      title: "",
      paragraphs: [
        `NOTHING IN THE SERVICE, INCLUDING ANY INFORMATION AND OUTPUT WHICH MAY BE ACCESSED THROUGH THE SERVICE, SHOULD BE CONSIDERED OR USED AS MEDICAL ADVICE, NOR DOES THE SERVICE PROVIDE A DIAGNOSIS OR TREATMENT. ANY CONTENT OR RESOURCES MADE AVAILABLE THROUGH THE SERVICE ARE FOR INFORMATIONAL OR EDUCATIONAL PURPOSES.`,
      ],
    },
    {
      title: "",
      paragraphs: [
        `WE DO NOT GUARANTEE THAT THE CONTENT IS TIMELY, ACCURATE OR COMPLETE, AND WE WILL NOT BE RESPONSIBLE OR LIABLE FOR ANY ERRORS OR OMISSIONS IN, OR FOR THE RESULTS OBTAINED FROM THE USE OF, SUCH CONTENT. THE USE OF THE SERVICE AND ANY OUTPUTS ARE NOT A SUBSTITUTE FOR MEDICAL ADVICE.`,
      ],
    },
    {
      title: "",
      paragraphs: [
        `THE SERVICE DOES NOT PROVIDE OR REPLACE THE INDEPENDENT JUDGMENT OF A TRAINED AND LICENSED MEDICAL OR HEALTHCARE PROFESSIONAL, AND ANY DIAGNOSIS OR COURSE OF TREATMENT IS TO BE MADE IN THE INDEPENDENT JUDGMENT OF A TRAINED MEDICAL OR HEALTHCARE PROFESSIONAL. IF YOU BELIEVE YOU ARE EXPERIENCING A MEDICAL EMERGENCY, CALL 911 OR VISIT THE NEAREST EMERGENCY ROOM IMMEDIATELY.`,
      ],
    },
    {
      title: "2. Access to the Service; Service Restrictions",
      paragraphs: [],
    },
    {
      title: `2.1 Access to the Service.`,
      paragraphs: [
        `Subject to your compliance with these Terms and any documentation we may make available to you, you are hereby granted a non-exclusive, limited, non-transferable, and freely revocable right to access and use the Service, solely for your personal use or internal business purposes, as applicable, strictly as permitted by the features of the Service. We may terminate the license granted in this Section at any time, for any reason or no reason. We reserve all rights not expressly granted herein in and to the Service. Notwithstanding anything to the contrary herein, certain portions of the Service may be available only during the Subscription Term(s) (as defined below), as further described in Section 8.4 (SubscriptionPlans).`,
      ],
    },
    {
      title: `2.2 Restrictions and Acceptable Use.`,
      paragraphs: [
        `Except to the extent a restriction is prohibited by Applicable Law, you will not do, and will not assist, permit, or enable any third party to do, any of the following:\n
        (a) disassemble, reverse engineer, decode, or decompile any part of the Service;\n
        (b)use any robot, spider, scraper, off-line reader, data mining tool, data gathering or extraction tool, or any other automated means to access the Service in a manner that sends more request messages to the servers running the Service than a human can reasonably produce in the same period of time by using a conventional on-line web browser (except that Zumlo grants the operators of public search engines revocable permission to use spiders to copy publicly available materials from the Service for the sole purpose of, and solely to the extent necessary for, creating publicly available searchable indices of, but not caches or archives of, such materials, and only as specified in the applicable robots.txt file);\n
        (c)use any content available on or via the Service (including any caption information, keywords, or other metadata) for any machine learning and/or artificial intelligence training or development purposes, or for any technologies designed or intended for the identification of natural persons; \n
        (d) buy, sell or transfer API keys without our prior written consent in each case;\n
        (e) copy, rent, lease, sell, loan, transfer, assign, license or purport to sublicense, resell, distribute, modify, alter, or create derivative works of any part of the Service or any of our Intellectual Property (as defined below), including, without limitation by any automated or non-automated “scraping”;\n
        (f) use the Service in any manner that impacts\n
        (i)the stability of the servers running the Service,\n
        (ii)the operation or performance of the Service or any User’s use of the Service, or\n
        (iii)the behavior of other applications that use the Service;\n
        (g) take any action that imposes, or may impose (as determined by us, in our sole discretion), an unreasonable or disproportionately large load on our infrastructure;\n
        (h)use the Service in any manner or for any purpose that \n
        (i)violates, or promotes the violation of, any Applicable Law, contractual obligation, or right of any person, including, but not limited to, Intellectual Property Rights (as defined below), privacy rights, and/or rights of personality,
,\n
        (ii) is fraudulent, false, deceptive, or defamatory,\n                               
        (iii)promotes hatred, violence, or harm against any individual or group, or\n
        (iv) otherwise may be harmful or objectionable (in our sole discretion) to us or to our providers, our suppliers, Users, or any other third party;\n
        (h) use or display the Service in competition with us, to develop competing products or services, for benchmarking or competitive analysis of the Service, or otherwise to our detriment or disadvantage;\n
        (i) access any content available on or via the Service through any technology or means other than those provided by the Service or authorized by us;\n
        (j) bypass the measures we may use to prevent or restrict access to the Service, including, without limitation, features that prevent or restrict use or copying of any content or that enforce limitations on use of the Service or any portion thereof;\n
        (l) attempt to interfere with, compromise the system integrity or security of, or decipher any transmissions to or from, the servers running the Service;\n
        (m) use the Service to transmit spam, chain letters, or other unsolicited email;\n
        (n) use the Service for any commercial solicitation purposes;\n
        (o) transmit invalid data, viruses, worms, or other software agents through the Service;\n
        (p) impersonate another person or entity, misrepresent your affiliation with a person or entity, hide or attempt to hide your identity, or otherwise use the Service for any invasive or fraudulent purpose;\n
        (q) collect or harvest any personal information, including Users’ names, from the Service; or \n 
        (r) identify or refer to us or to the Service in a manner that could reasonably imply a relationship that involves endorsement, affiliation, or sponsorship between you (or a third party) and us without our prior express written consent.\n
        `,
      ],
    },
    {
      title: `3 User Grants, Covenants, Representations and Warranties`,
      paragraphs: [
        `3.1 As between us and you, you (or your licensors) will own any and all information, data, and other content, in any form or medium, that is collected, downloaded, or otherwise received, directly or indirectly, from you (or on your behalf) by or through the Service (“User Content”). For an organizational account, we may assume, in our sole discretion, that all of your User Content belongs to that Organization.\n`,
        `3.2 You understand that certain portions of the Service may allow other Users to view, edit, share, and/or otherwise interact with your User Content and your Output (as defined below). By providing or sharing your User Content and Output through the Service, you agree to allow others to view, edit, share, and/or interact with your User Content and Output in accordance with your settings and these Terms. You agree to mark any sensitive or proprietary content as confidential prior to making such content available to any other User. We have the right (but not the obligation) in our sole discretion to remove any of your User Content or Output that is shared via the Service. You hereby grant each User a non-exclusive license to access your User Content and Output through the Service,and to use, reproduce, distribute, display and perform your User Content and Output, which you make available to such User through the Service. You further grant, and you represent and warrant that you have all rights necessary to grant, to us, under all of your Intellectual Property Rights, an irrevocable, perpetual, transferable, sublicensable (through multiple tiers), fully paid, royalty-free, and worldwide right and license to use, copy, store, modify, distribute, reproduce, publish, list information regarding, make derivative works of, and display your User Content and Output:\n`,
        `(a) to maintain and provide the Service;\n`,
        `(b)to improve our products and the Service and for our other business purposes, such as data analysis, customer research, developing new products or features, and identifying usage trends; and\n
        (c)to perform such other actions as described in our Privacy Notice or as authorized by you in connection with your use of the Service.`,
      ],
    },
    {
      title: `3.3 You affirm, represent, and warrant the following:`,
      paragraphs: [
        `(a) you have obtained, and are solely responsible for obtaining, all consents required by Applicable Law to provide User Content relating to third parties;\n
        (b) your User Content and Output and our use thereof as contemplated by these Terms and the Service will not violate any Applicable Law or infringe any rights of any third party, including, but not limited to, any Intellectual Property Rights and privacy rights;\n
        (c) your User Content does not include any information or material that a governmental body deems to be sensitive or classified information, and your provision of User Content in connection with the Service is not violative of any confidentiality rights of any third party;\n
        (d) we may exercise the rights to your User Content granted to us under these Terms without liability for payment of any guild or other fees, residuals, payments, or royalties payable under any collective bargaining agreement or otherwise;\n
        (e) You will not upload or make available through the Service, either directly or by other means: any personal information of children under 13 or the applicable age of digital consent;\n
        (f) your User Content does not include nudity or other sexually suggestive content; hate speech, threats, or direct attacks on an individual or group; content that is abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, or invasive of another’s privacy; sexist or racially, ethnically, or otherwise discriminatory content; content that contains self-harm or excessive violence; fake or impostor profiles; illegal content or content in furtherance of harmful or illegal activities; malicious programs or code; any person’s personal information without such person’s consent; spam, machine-generated content, or unsolicited messages; and/or otherwise objectionable content; and\n
        (e) to the best of your knowledge, all User Content and other information that you provide to us is truthful and accurate.
`,
      ],
    },
    {
      title: `3.4`,
      paragraphs: [
        `WE CLAIM NO OWNERSHIP RIGHTS OVER YOUR USER CONTENT. WE TAKE NO RESPONSIBILITY AND ASSUME NO LIABILITY FOR ANY USER CONTENT. YOU WILL BE SOLELY RESPONSIBLE FOR YOUR USER CONTENT AND THE CONSEQUENCES OF SUBMITTING, POSTING, DISPLAYING, PROVIDING, SHARING, OR OTHERWISE MAKING IT AVAILABLE ON OR THROUGH THE SERVICE, AND YOU UNDERSTAND AND ACKNOWLEDGE THAT WE ARE ACTING ONLY AS A PASSIVE CONDUIT FOR YOUR ONLINE DISTRIBUTION AND PUBLICATION OF YOUR USER CONTENT`,
      ],
    },
    {
      title: `4 Intellectual Property`,
      paragraphs: [],
    },
    {
      title: `4.1 Intellectual Property Rights Definition.`,
      paragraphs: [
        `For the purposes of these Terms, “Intellectual Property Rights” means all patent rights, copyright rights, mask work rights, moral rights, rights of personality, trademark, trade dress and service mark rights, goodwill, trade secret rights, and any and all other intellectual property rights and proprietary rights as may now exist or hereafter come into existence, and all applications therefor and registrations, renewals, and extensions thereof, under Applicable Law.`,
      ],
    },
    {
      title: `4.2 Zumlo Intellectual Property.`,
      paragraphs: [
        `You understand and acknowledge that we (or our licensors (including other Users), as applicable) own and will continue to own all rights (including Intellectual Property Rights), title, and interest in and to the Service, all materials and content displayed or otherwise made available on and/or through the Service (including, without limitation, images, text, graphics, illustrations, logos, photographs, audio, videos, music, and User Content belonging to other Users; but, excluding your User Content), and all software, algorithms, code, technology, and intellectual property underlying and/or included in or with the Service (collectively and individually, “Intellectual Property”). Except as may be explicitly provided herein, nothing in these Terms will be deemed to create a license in or under any such Intellectual Property Rights, and you will not access, sell, license, rent, modify, distribute, copy, reproduce, transmit, display, perform, publish, adapt, edit, or create derivative works of any Intellectual Property. Use of any Intellectual Property for any purpose not expressly permitted by these Terms is strictly prohibited.`,
      ],
    },

    {
      title: `4.3 Output.`,
      paragraphs: [
        `Subject to your compliance with these Terms, you may use your output of the Service (“Output”) for any lawful purpose (except as described below), on a royalty-free basis, provided that you acknowledge and agree:\n
      (a) that your use of the Service and the Output does not transfer to you ownership of any Intellectual Property Rights in the Service and that
      (b) we may, by notice to you at any time, limit your use of the Output or require you to cease using them (and delete any copies of them) if we form the view, in our sole and absolute discretion, that your use of the Output may infringe the rights of any third party. You shall not represent that Output was human-generated or use the Output to train your own machine learning models.

        `,
      ],
    },
    {
      title: "",
      paragraphs: [
        `DUE TO THE NATURE OF MACHINE LEARNING, THE OUTPUT MAY NOT BE UNIQUE ACROSS USERS AND THE SERVICE MAY GENERATE THE SAME OR SIMILAR OUTPUT FOR OTHER USERS. USE OF THE SERVICE MAY RESULT IN INCORRECT OUTPUT THAT DOES NOT ACCURATELY REFLECT REALITY. YOU MUST EVALUATE THE ACCURACY OF ANY OUTPUT AS APPROPRIATE FOR YOUR USE CASE, INCLUDING BY USING HUMAN REVIEW OF THE OUTPUT. YOU UNDERSTAND AND AGREE THAT THE OUTPUT MAY CONTAIN “HALLUCINATIONS” AND MAY BE INACCURATE, OBJECTIONABLE, INAPPROPRIATE, OR OTHERWISE UNSUITED TO YOUR PURPOSE, AND YOU AGREE THAT WE SHALL NOT BE LIABLE FOR ANY DAMAGES YOU OR ANY THIRD PARTY ALLEGES TO INCUR AS A RESULT OF OR RELATING TO ANY OUTPUT OR OTHER CONTENT GENERATED BY OR ACCESSED ON OR THROUGH THE SERVICE`,
      ],
    },
    {
      title: "4.4",
      paragraphs: [
        `Usage Data. We may collect, or you may provide to us, diagnostic, technical, usage, and/or related information, including information about your computers, mobile devices, systems, and software (collectively, “Usage Data”). All Usage Data is and will be owned solely and exclusively by us, and, to the extent any ownership rights in or to the Usage Data vest in you, you hereby assign to us all rights (including Intellectual Property Rights), title, and interest in and to same. Accordingly, we may use, maintain, and/or process the Usage Data or any portion thereof for any lawful purpose, including, without limitation:\n
a) to provide and maintain the Service;\n
b) to improve our products and services (including the Service), and to develop new products, services, and/or features;\n
c) to monitor your usage of the Service;\n
d) for research and analytics, including, without limitation, data analysis, identifying usage trends, and/or customer research; and\n
e) to share analytics and other derived Usage Data with third parties, solely in de-identified or aggregated form. The Service may contain technological measures designed to prevent unauthorized or illegal use of the Service; you understand and acknowledge that we may use these and other lawful measures to verify your compliance with these Terms and to enforce our rights, including Intellectual Property Rights, in and to the Service.\n`,
      ],
    },
    {
      title: "4.4 Feedback",
      paragraphs: [
        `To the extent you provide us any suggestions, recommendations, or other feedback relating to the Service or to any other Zumlo products or services (collectively, “Feedback”), you hereby assign to us all rights (including Intellectual Property Rights), title, and interest in and to the Feedback. Accordingly, we are free to use the Feedback and any ideas, know-how, concepts, techniques, and/or other intellectual property contained in the Feedback, without providing any attribution or compensation to you or to any third party, for any purpose whatsoever, although we are not required to use any Feedback. Feedback is deemed our Confidential Information (as defined below). You acknowledge that, by acceptance of your submission of Feedback, we do not waive any rights to use similar or related ideas previously known to us, or developed by our employees, or obtained from sources other than you.`,
      ],
    },
    {
      title: "5. Confidential Information",
      paragraphs: [],
    },
    {
      title: `5.1`,
      paragraphs: [
        `The Service may include non-public, proprietary, or confidential information of Zumlo and/or of other Users (“Confidential Information”). Confidential Information includes any information that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure, including non-public business, product, technology, and marketing information. You will:\n
        (a) protect and safeguard the confidentiality of all Confidential Information with at least the same degree of care as you would use protect your own highly sensitive confidential information, but in no event with less than a reasonable degree of care;\n
        (b) not use any Confidential Information for any purpose other than to exercise your rights, or to perform your obligations, under these Terms; and\n
        (c) not disclose any Confidential Information to any person or entity, except your service providers or financial or legal advisors who/that\n
        (i)need to know the Confidential Information and\n
        (ii)are bound by non-use and non-disclosure restrictions at least as restrictive as those set forth in this Section.\n`,
      ],
    },
    {
      title: "6. DMCA Notice",
      paragraphs: [
        `6.1 We respect artists and content owner rights, and it is our policy to respond to alleged infringement notices that comply with the Digital Millennium Copyright Act of 1998 (as it may be amended, “DMCA”)..\n
             6.2 you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible via the Service, please notify our copyright agent as set forth in the DMCA. For your complaint to be valid under the DMCA, you must provide all of the following information in writing:.\n
        (a) an electronic or physical signature of a person authorized to act on behalf of the copyright owner;.\n
        (b) identification of the copyrighted work that you claim has been infringed;.\n
        (c) identification of the material that is claimed to be infringing and its location on the Service;.\n
        (d) information reasonably sufficient to permit us to contact you, such as your address, telephone number, and email address;.\n
        (e) a statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or law; and.\n
        (f) a statement, made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized to act on behalf of the owner..\n
The above information must be submitted to our DMCA Agent, using the following contact information:

Attn: DMCA Notice, Zumlo, Inc.
Address:44679 Endicott Drive, Suite 300, #999 ,Ashburn, VA, 20147
Tel.: 571-578-1205
Email: info@zumlo.co

Under United States federal law, if you knowingly misrepresent that online material is infringing, you may be subject to criminal prosecution for perjury and civil penalties, including monetary damages, court costs, and attorneys’ fees.

Please note that the procedure outlined herein is exclusively for notifying Zumlo and its affiliates that your copyrighted material has been infringed. The preceding requirements are intended to comply with Zumlo’s rights and obligations under the DMCA, including 17 U.S.C. §512(c), but do not constitute legal advice. It may be advisable to contact an attorney regarding your rights and obligations under the DMCA and other Applicable Law.

In accordance with the DMCA and other Applicable Law, we have adopted a policy of terminating, in appropriate circumstances, Users who are deemed to be repeat infringers. We may also, at our sole discretion, limit access to the Service and/or terminate the User Accounts of any Users who infringe any Intellectual Property Rights of others, whether or not there is any repeat infringement.`,
      ],
    },
    {
      title: "7. Our Publicity Rights",
      paragraphs: [
        `We may identify you as a User in our promotional materials. We will promptly stop doing so upon receipt of your request sent to info@zumlo.co`,
      ],
    },
    {
      title: `8. Payments, Billing, and SubscriptionPlans`,
      paragraphs: [],
    },
    {
      title: `8.1 Billing Policies;`,
      paragraphs: [
        `Taxes.Certain aspects of the Service may be provided for free, while certain other aspects of the Service and/or products available on the Service may be provided for a fee or other charge (“Fee”). Each Fee (including each Subscription Fee (as defined below)) is the sum of the applicable Zumlo Fee (as defined below) and any applicable Third-Party Fees (as defined below). By electing to use non-free aspects of the Service, including enrolling in Subscription(s) (as defined below), you agree to the pricing and payment terms applicable to you and available via your User Account (as we may update them from time to time, the “Pricing and Payment Terms”). ThePricing and Payment Terms are hereby incorporated by reference herein. We may add new products and/or services for additional Fees, add or amend Fees for existing products and/or services, and/or discontinue offering any Subscriptions at any time, in our sole discretion; provided, however, that if we have agreed to a specific Subscription Term and a corresponding Subscription Fee, then that Subscription will remain in force for that Subscription Fee during that Subscription Term. Any change to the Pricing and Payment Terms will become effective in the billing cycle following our provision of notice of such change. Except as may be expressly stated in these Terms or in the Pricing and Payment Terms, all Fees must be paid in advance, payment obligations are non-cancelable once incurred (subject to any cancellation rights set forth in these Terms), and Fees paid are non-refundable. Fees are stated exclusive of any taxes, levies, duties, or similar governmental assessments of any nature, including, for example, value-added, sales, use, and withholding taxes, assessable by any jurisdiction (collectively, but, for clarity, excluding taxes based on our net income, “Taxes”). You will be responsible for paying all Taxes associated with your purchases and/or Subscriptions in connection with the Service.`,
      ],
    },
    {
      title: `8.2 Definitions`,
      paragraphs: [
        `(a) “Subscription” means a particular portion of the Service that is available on an automatically renewing subscription basis, and your access thereto, as applicable\n
        (b) “Subscription Fee” means the recurring amount due as consideration for a Subscription; a Subscription Fee is one type of Fee.\n
        (c) “Zumlo Fee” means the portion of the Fee (including any Subscription Fee) that Zumlo may retain as consideration for providing the Service or any portion thereof (including any particular Subscription), as applicable.\n
        (d) "Third-Party Fees” means the portion of the Fee (including any Subscription Fee) retained by one (1) or more third parties, including Payment Processor, that we may engage from time to time, in our sole discretion.\n
        (e) “Payment Processor” means the third-party payment processor, currently , which we engage to process payments Users make in connection with the Service.\n`,
      ],
    },
    {
      title: `8.3 Your Payment Method`,
      paragraphs: [
        `(a) General. To use non-free aspects of the Service, you must provide us with at least one (1) current, valid payment card that is accepted by us and Payment Processor (each such card, a “Payment Method”). By providing a Payment Method, you authorize each of Zumlo and Payment Processor to charge that Payment Method the applicable Fees and Taxes, including, if applicable, on a recurring basis until you cancel your Subscription (including any notice period specified in Section 8.4(c) (Cancellation Procedures)). Fees and Taxes will be charged to your Payment Method on the specific payment date indicated in your User Account. In some cases, your payment date may change, for example, if your Payment Method has not successfully settled, if you changed your SubscriptionPlan, or if your Subscription began on a date not contained in a subsequent month. The length of your billing cycle will depend on the type of Subscription in which you are enrolled, if applicable. Fees are fully earned upon payment. We may authorize your Payment Method in anticipation of Service-related charges through various methods, including authorizing it up to one (1) month of service as soon as you register for the Service.\n
        (b) Third-Party Payment Processor. We or Payment Processor will attempt to verify your Payment Method(s), and may do so by processing an authorization hold, which is standard practice. To the extent Payment Processor processes payments made by you, you will be subject to terms and conditions governing the use of Payment Processor’s service. Please review such terms and conditions as well as Payment Processor’s privacy notice (each of which is available on Payment Processor’s website). You acknowledge and understand that Payment Processor may collect and retain Third-Party Fees whenever you pay Fees (including Subscription Fees). Payment must be received by Payment Processor before our acceptance of an order. We do not view or store your full credit card or other Payment Method information. For all payments, Payment Processor will collect your Payment Method details and charge your chosen Payment Method in connection with an order. If any of your account, order, or Payment Method information changes, you will promptly update such information, so that we or Payment Processor may complete your transaction(s) and/or contact you, as needed.\n
        (c) Payment Representations and Warranties. You represent and warrant that:\n
        (i) the account, order, and Payment Method information you supply to us and/or to Payment Processor, as applicable, is true, accurate, correct, and complete;\n
        (ii) you are duly authorized to use the Payment Method(s);\n
        (iii)you will pay any and all charges incurred by users of your Payment Method in connection with the Service, including any applicable Fees (at the prices in effect when such charges are incurred) and Taxes;\n
        (IV) charges incurred by you will be honored by your Payment Method company;\n
        (V) you will not allow or enable anyone else to use your Subscription (including, without limitation, by sharing your password(s) or any other authentication credentials with anyone else, or by attempting to transfer your Subscription to anyone else); and\n
        (VI)you will report to us any unauthorized or prohibited access to or use of your Subscription and/or password(s) or other authentication credentials.\n
        (d)Disclaimer. WE DISCLAIM ANY AND ALL LIABILITY WITH RESPECT TO, AND YOU UNDERSTAND AND ACKNOWLEDGE THAT WE ARE NOT RESPONSIBLE FOR: (I) ANY SECURITY OR PRIVACY BREACHES RELATED TO YOUR CREDIT CARD OR OTHER PAYMENT METHOD, (II) ANY FEES THAT MAY BE CHARGED TO YOU BY YOUR BANK IN CONNECTION WITH THE COLLECTION OF FEES, AND/OR (III) ANY UNAUTHORIZED USE OF YOUR CREDIT CARD, DEBIT CARD, OR OTHER PAYMENT METHOD BY A THIRD PARTY.
`,
      ],
    },
    {
      title: `8.4 SubscriptionPlans`,
      paragraphs: [
        `(a) Automatic Renewals. Subscriptions are available on an automatically renewing subscription basis and entail payment of Subscription Fees. YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW AT THE END OF EACH SUBSCRIPTION TERM IDENTIFIED IN YOUR SUBSCRIPTION ORDER FOR SUBSEQUENT TERMS EQUAL IN LENGTH TO THAT INITIAL SUBSCRIPTION TERM (EACH SUCH PERIOD, A “SUBSCRIPTION TERM”) UNLESS AND UNTIL YOU CANCEL THE APPLICABLE SUBSCRIPTION IN ACCORDANCE WITH THE CANCELLATION PROCEDURES IDENTIFIED IN SECTION 8.4(C) (INCLUDING ANY NOTICE PERIOD SPECIFIED IN SECTION 8.4(C) (CANCELLATION PROCEDURES)). YOU AUTHORIZE EACH OF ZUMLO AND PAYMENT PROCESSOR (WITHOUT NOTICE TO YOU, UNLESS REQUIRED BY APPLICABLE LAW) TO CHARGE YOU THE APPLICABLE SUBSCRIPTION FEE AND ANY APPLICABLE TAXES, USING ANY OF YOUR PAYMENT METHODS.\n
        (b) Automatic Billing and Policies. When you enroll in a Subscription, you expressly acknowledge and agree that:\n
        (i) each of Zumlo and Payment Processor is authorized to charge you, at the beginning of each Subscription Term, the Subscription Fee for the applicable Subscription, any applicable Taxes, and any other charges you may incur in connection with such Subscription, subject to adjustment in accordance with these Terms; and\n
        (i) your Subscription is continuous until the earlier of: (A) your cancellation of such Subscription (including any notice period specified in Section 8.4(c) (Cancellation Procedures)) and (B) the suspension, discontinuation, or termination of your access to such Subscription or to the Service in accordance with these Terms. You understand and acknowledge that the amounts billed may vary due to Promotional Offers (as defined below), changes to the Subscription Fee in accordance with the Pricing and Payment Terms, and/or changes in applicable Taxes, and you authorize each of Zumlo and Payment Processor to charge your Payment Method the changed amounts.\n
        (c) Cancellation Procedures. To cancel any Subscription, you must notify us at least () days before the start of the next Subscription Term by using the appropriate functionalities of the Service or by contacting us at info@zumlo.co. You will continue to have access to the Subscription through the end of the then-current Subscription Term.\n
        (d) Cancellation; Refunds. You may de-activate your User Account or any Subscription at any time, in your sole discretion, and we may, subject to Section 8.1 (Billing Policies; Taxes), suspend or terminate your Subscription, your User Account, or the Service at any time, in our sole discretion. HOWEVER, YOU UNDERSTAND AND ACKNOWLEDGE THAT, UNLESS REQUIRED BY APPLICABLE LAW, YOU WILL NOT BE ENTITLED TO RECEIVE ANY REFUND OR CREDIT FOR ANY SUCH CANCELLATION, SUSPENSION, OR TERMINATION, NOR FOR ANY UNUSED TIME ON YOUR SUBSCRIPTION, ANY PRE-PAYMENTS MADE IN CONNECTION WITH YOUR SUBSCRIPTION, ANY USAGE OR SUBSCRIPTION FEES FOR ANY PORTION OF THE SERVICE, ANY CONTENT OR DATA ASSOCIATED WITH YOUR USER ACCOUNT, OR ANYTHING ELSE, AND THAT ANY SUCH REFUNDS OR CREDITS MAY BE GRANTED AT OUR SOLE OPTION AND IN OUR SOLE DISCRETION. If you believe you have been improperly charged and would like to request a refund, please contact us atinfo@zumlo.co.\n
        (e)Free Trials. We may, at our sole option and in our sole discretion, offer free trials to a particular portion of the Service, subject to the terms of the offer. If you are signed up to such a free trial, we or Payment Processor will automatically bill your Payment Method on the day that follows the last day of your free trial (which day will be the first day of your first Subscription Term), and on the first day of each subsequent Subscription Term, subject to these Terms. You may not receive a notice that your free trial has ended and that payment for your Subscription is due and will be collected. If you wish to avoid charges to your Payment Method, you must cancel your free trial by 11:59 PM Eastern Time on the last day of your free trial period. If you cancel your free trial while it is ongoing, your access to the applicable portion of the Service may be terminated immediately upon such cancellation.\n`,
      ],
    },
    {
      title: "8.5 Promotional Offers",
      paragraphs: [
        `We may from time to time offer special promotional offers, plans, or memberships (“Promotional Offers”). Promotional Offer eligibility is determined by us in our sole discretion, and we reserve the right to revoke a Promotional Offer in the event that we determine you are not eligible. We may use information such as device ID, method of payment, and/or an email address used in connection with your User Account to determine eligibility. The eligibility requirements and other limitations and conditions will be disclosed when you sign-up for the Promotional Offer or in other communications made available to you. You understand and acknowledge that any Promotional Offers, including, without limitation, relating to Subscriptions, are subject to change at any time and from time to time.`,
      ],
    },

    {
      title: `9. Privacy; Data Security`,
      paragraphs: [
        `9.1 Privacy. By using the Service, you acknowledge that we may collect, use, and disclose your personal information and aggregated and/or anonymized data as set forth in our Privacy Notice, and that your personal information may be transferred to, and/or processed in, the United States\n 
9.2 Security. We care about the integrity and security of your personal information. However, we cannot guarantee that unauthorized third parties will never be able to defeat our security measures or to use your data for improper purposes. You acknowledge that you provide your data at your own risk.`,
      ],
    },

    {
      title: `10. Text Messaging and Calls`,
      paragraphs: [
        `10.1 General. You may provide us with your telephone number as part of creating your User Account or otherwise. By providing a telephone number, you consent to receiving autodialed or prerecorded calls and/or text messages from us, or on our behalf, at such telephone number. We may place such calls or send such texts to\n
      (a) help keep your User Account secure through the use of multi-factor authentication (“MFA”);\n
      (b) help you access your User Account if you are experiencing difficulties, such as by sending a one-time password (“OTP”) via text message; and/or\n
      (c) as otherwise necessary to service your account or enforce these Terms, our policies, Applicable Law, or any other agreement we may have with you. Part of the MFA identity-verification and OTP processes may involve Zumlo sending text messages containing security codes or links to the telephone number you provided, and you agree to receive such texts from or on behalf of Zumlo.\n`,
      ],
    },
    {
      title: ``,
      paragraphs: [
        `10.2 Consent to Communications Consent to Communications. You expressly consent and agree to Zumlo contacting you using written, electronic, and/or verbal means, including manual dialing, emails, prerecorded/artificial voice messages, and/or using an automatic telephone dialing system to call or text your mobile/cellular telephone number, as necessary to complete transactions requested by you and to service your account, and as permitted by Applicable Law, in each case even if the phone number is registered on any United States federal and/or state Do-Not-Call/Do-Not-email registry/ies. Message and data rates apply. For purposes of clarity, the text messages described in this paragraph are transactional text messages, not promotional text messages.`,
      ],
    },
    {
      title: "11. Additional Terms for Apps",
      paragraphs: [
        `11.1 General. To use any App, you must have a mobile device that is compatible with such App. Zumlo does not warrant that any App will be compatible with your mobile device. You may use mobile data in connection with an App and may incur additional charges from your wireless provider in connection with such App. You understand and acknowledge that you are solely responsible for any such charges. We hereby grant you a non-exclusive, limited, non-transferable, and freely revocable license to use a compiled code copy of the App(s) under your User Account on one (1) or more mobile devices owned or controlled solely by you (except to the extent Apple or Google permits any shared access and/or use of the iOS App or Android App (as each of those terms is defined below), respectively), solely in accordance with these Terms. The foregoing license grant is not a sale of any App or of any copy thereof. You may not:\n
        (a) modify, disassemble, decompile, or reverse engineer any App, except to the extent that such restriction is expressly prohibited by Applicable Law;\n
        (b)rent, lease, loan, resell, sublicense, distribute, or otherwise transfer any App to any third party, or use any App to provide time sharing or similar services for any third party;\n
        (c)make any copies of any App;\n
        (d)remove, circumvent, disable, damage, or otherwise interfere with security-related features of any App, features that prevent or restrict use or copying of any content accessible through any App, or features that enforce limitations on use of the Apps; or\n
        (e)delete the copyright or other proprietary rights notices on any App. You acknowledge that we may, from time to time, issue upgraded versions of the Apps, and may automatically electronically upgrade the version of the App that you are using on your mobile device. You consent to such automatic upgrading on your mobile device, and you understand and acknowledge that the terms and conditions of these Terms will apply to all such upgrades. Any third-party code that may be incorporated into an App is covered by the applicable open source or third-party license, if any, authorizing use of such code. We or our third-party partners or suppliers retain all right, title, and interest in and to the Apps (and any copies thereof). Any attempt by you to transfer or delegate any of the rights, duties, or obligations hereunder, except as expressly provided for in these Terms, is void. We reserve all rights not expressly granted under these Terms.\n
            11.2 iOS App. This Section 11.2 (iOS App) applies to any App you acquire from the Apple App Store (such App, “iOS App”). You and Zumlo understand and acknowledge that these Terms are solely between you and Zumlo, not Apple, Inc. (“Apple”), and that Apple has no responsibility for the iOS App or content thereof. Your access to and use of the iOS App must comply with the usage rules set forth in Apple’s then-current Apple Media Services Terms and Conditions and with the applicable Volume Content Terms. You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the iOS App. In the event of any failure of the iOS App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price (if any) for the iOS App to you; to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the iOS App, and any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty will be governed solely by these Terms and any law applicable to Zumlo as provider of the iOS App. You and Zumlo acknowledge that Apple is not responsible for addressing any claims of you or any third party relating to the iOS App or your possession and/or use of the iOS App, including, but not limited to: (a) product liability claims; (b) any claim that the iOS App fails to conform to any applicable legal or regulatory requirement; and (c) claims arising under consumer protection or similar legislation. You acknowledge that, in the event of any third-party claim that the iOS App, or your possession and use of that iOS App, infringes that third party’s intellectual property rights, Zumlo, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claim, to the extent required by these Terms. You and Zumlo acknowledge and agree that Apple and Apple’s subsidiaries are third-party beneficiaries of these Terms as relates to your license of the iOS App, and that, upon your acceptance of the terms and conditions of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms as relates to your license of the iOS App against you as a third-party beneficiary thereof.\n
            11.3 Android App. The following applies to any App you acquire from the Google Play Store (such App, “Android App”):\n
        (a) you acknowledge that these Terms are between you and Zumlo only, and not Google LLC or any affiliate thereof (collectively, “Google”);\n
        (b) your access to and use of the Android App must comply with Google’s then-current Google Play Terms of Service;\n
        (c) Google is only a provider of the Google Play Store where you obtained the Android App;\n
        (d) Zumlo, and not Google, is solely responsible for the Android App;\n
        (e) Google has no obligation or liability to you with respect to the Android App or these Terms; and\n
        (f) you understand and acknowledge that Google is a third-party beneficiary to these Terms as they relate to the Android App.\n
`,
      ],
    },
    {
      title: "12. Your Use of Third-Party Services",
      paragraphs: [
        `THE SERVICE MAY CONTAIN LINKS TO THIRD-PARTY SITES, MATERIALS, AND/OR SERVICES (COLLECTIVELY, “THIRD-PARTY SERVICES”) THAT ARE NOT OWNED OR CONTROLLED BY US, AND CERTAIN FUNCTIONALITIES OF THE SERVICE MAY REQUIRE YOUR USE OF THIRD-PARTY SERVICES. IF YOU USE A THIRD-PARTY SERVICE IN CONNECTION WITH THE SERVICE, YOU ARE SUBJECT TO AND AGREE TO, AND MUST COMPLY WITH, THE THIRD PARTY’S TERMS AND CONDITIONS MADE AVAILABLE VIA, OR AGREED IN CONNECTION WITH, ITS SERVICES. WE DO NOT ENDORSE OR ASSUME ANY RESPONSIBILITY FOR ANY THIRD-PARTY SERVICES. IF YOU ACCESS A THIRD-PARTY SERVICE FROM THE SERVICE OR SHARE YOUR USER CONTENT OR OUTPUT ON OR THROUGH ANY THIRD-PARTY SERVICE, YOU DO SO AT YOUR OWN RISK, AND YOU UNDERSTAND THAT THESE TERMS AND OUR PRIVACY NOTICE DO NOT APPLY TO YOUR USE OF ANY THIRD-PARTY SERVICE. YOU EXPRESSLY RELIEVE US FROM ANY AND ALL LIABILITY ARISING FROM YOUR ACCESS TO AND/OR USE OF ANY THIRD-PARTY SERVICE. ADDITIONALLY, YOUR DEALINGS WITH, OR PARTICIPATION IN PROMOTIONS OF, ADVERTISERS FOUND ON THE SERVICE, INCLUDING AS RELATES TO PAYMENT AND DELIVERY OF GOODS, AND ANY OTHER TERMS (SUCH AS WARRANTIES) ARE SOLELY BETWEEN YOU AND SUCH ADVERTISERS. YOU UNDERSTAND AND ACKNOWLEDGE THAT WE WILL NOT BE RESPONSIBLE FOR ANY LOSS OR DAMAGE OF ANY SORT RELATING TO YOUR DEALINGS WITH SUCH ADVERTISERS.`,
      ],
    },
    {
      title: `13. Release`,
      paragraphs: [
        `You hereby release us from all claims, damages (whether direct, indirect, incidental, consequential, or otherwise), obligations, losses, liabilities, costs, debts, and expenses, in each case of every kind and nature, known and unknown, arising out of a dispute between you and a third party (including any other User) in connection with the Service. In addition, you waive any Applicable Law that says, in substance:“A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH, IF KNOWN BY HIM OR HER, WOULD HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE RELEASED PARTY.”`,
      ],
    },
    {
      title: `14. Indemnity`,
      paragraphs: [
        `14.1 You will defend, indemnify, and hold us and our subsidiaries and affiliates, and our and their respective agents, suppliers, licensors, employees, contractors, officers, and directors (collectively, including Zumlo, the “Zumlo Indemnitees”) harmless from and against any and all claims, damages (whether direct, indirect, incidental, consequential, or otherwise), obligations, losses, liabilities, costs, debts, and expenses (including, but not limited to, legal fees) arising from:\n
        (a) your access to and/or use of the Service, including your use of Output;\n
        (b) your violation of any term of these Terms, including, without limitation, your breach of any of your representations and warranties set forth in these Terms;\n
        (c) your violation of any third-party right, including, without limitation, any privacy right or Intellectual Property Right;\n
        (d) your violation of any Applicable Law;\n
        (e) User Content or any content that is submitted via your User Account, including, without limitation, any misleading, false, or inaccurate information;\n
        (f) your willful misconduct; or\n
        (g) any third party’s access to and/or use of the Service with your username(s), password(s), or other authentication credential(s).\n`,
      ],
    },
    {
      title: `15. No Professional Advice`,
      paragraphs: [
        `THE CONTENT PROVIDED THROUGH OR IN CONNECTION WITH THE SERVICE IS DESIGNED TO PROVIDE PRACTICAL AND USEFUL INFORMATION ON THE SUBJECT MATTER(S) COVERED. WHILE SUCH CONTENT MAY CONCERN ISSUES RELATED TO PROFESSIONAL SERVICES, SUCH CONTENT IS NOT PROFESSIONAL SERVICES ADVICE. YOU SHOULD NOT ACT OR REFRAIN FROM ACTING ON THE BASIS OF ANY CONTENT THAT IS INCLUDED ON THE SITE(S) AND/OR THE APP(S) OR THAT IS OTHERWISE OBTAINED IN CONNECTION WITH THE SERVICE WITHOUT SEEKING THE ADVICE OF A PROFESSIONAL WHO IS LICENSED AND/OR QUALIFIED IN THE APPLICABLE SUBJECT MATTER(S). WE EXPRESSLY DISCLAIM ALL LIABILITY IN RESPECT OF ACTIONS TAKEN OR NOT TAKEN BASED ON ANY CONTENT OBTAINED IN CONNECTION WITH THE SERVICE.`,
      ],
    },
    {
      title: "16. No Warranty; Disclaimers",
      paragraphs: [
        `THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. YOUR USE OF THE SERVICE IS AT YOUR OWN RISK. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE, THE INTELLECTUAL PROPERTY, AND ANY OTHER INFORMATION AVAILABLE ON OR THROUGH THE SERVICE ARE PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND/OR NON-INFRINGEMENT. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR THROUGH THE SERVICE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, NONE OF THE ZUMLO INDEMNITEES WARRANTS THAT ANY CONTENT OR ANY OTHER INFORMATION CONTAINED IN, OR AVAILABLE VIA, THE SERVICE IS ACCURATE, COMPREHENSIVE, RELIABLE, USEFUL, OR CORRECT; THAT THE SERVICE WILL MEET YOUR REQUIREMENTS; THAT THE SERVICE WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, UNINTERRUPTED, OR SECURE; THAT ANY DEFECTS OR ERRORS IN THE SERVICE WILL BE CORRECTED; OR THAT THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. ANY CONTENT DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS SO OBTAINED AT YOUR OWN RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM(S) OR MOBILE DEVICE(S) AND/OR FOR LOSS OF DATA THAT RESULTS FROM SAME OR FROM YOUR ACCESS TO AND/OR USE OF THE SERVICE. YOU MAY HAVE OTHER STATUTORY RIGHTS, BUT THE DURATION OF STATUTORILY REQUIRED WARRANTIES, IF ANY, WILL BE LIMITED TO THE SHORTEST PERIOD PERMITTED BY APPLICABLE LAW.

FURTHER, ZUMLO DOES NOT WARRANT, ENDORSE, GUARANTEE, RECOMMEND, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY ANY THIRD PARTY THROUGH THE SERVICE OR ANY HYPERLINKED WEBSITE OR SERVICE, AND ZUMLO WILL NOT BE A PARTY TO, OR IN ANY WAY MONITOR, ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.

UNITED STATES FEDERAL LAW AND SOME STATES, PROVINCES, AND OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF AND/OR LIMITATIONS ON CERTAIN IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS AND/OR LIMITATIONS MAY NOT APPLY TO YOU. THESE TERMS GIVE YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS, WHICH VARY FROM JURISDICTION TO JURISDICTION. THE DISCLAIMERS, EXCLUSIONS, AND LIMITATIONS UNDER THESE TERMS WILL NOT APPLY TO THE EXTENT PROHIBITED BY APPLICABLE LAW.
`,
      ],
    },
    {
      title: `17. Limitation of Liability`,
      paragraphs: [
        `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL ANY ZUMLO INDEMNITEE BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, OR DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE OR ANY PORTION THEREOF. UNDER NO CIRCUMSTANCES WILL WE BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS TO OR USE OF THE SERVICE OR YOUR USER ACCOUNT OR THE INFORMATION CONTAINED THEREIN.

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (A) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT; (B) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICE; (C) ANY UNAUTHORIZED ACCESS TO OR USE OF THE SERVERS RUNNING THE SERVICE AND/OR ANY AND ALL PERSONAL INFORMATION STORED THEREIN; (D) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICE; (E) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH THE SERVICE BY ANY THIRD PARTY; (F) ANY ERRORS OR OMISSIONS IN ANY CONTENT, OR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE THROUGH THE SERVICE; AND/OR (G) YOUR DATA, ANY USER CONTENT, OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY.

IN NO EVENT WILL ANY ZUMLO INDEMNITEE BE LIABLE TO YOU FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES, LOSSES, OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO US HEREUNDER OR ONE HUNDRED U.S. DOLLARS ($100.00), WHICHEVER IS GREATER. THIS LIMITATION OF LIABILITY SECTION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF AND/OR LIMITATIONS ON INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE EXCLUSIONS AND/OR LIMITATIONS MAY NOT APPLY TO YOU. THESE TERMS GIVE YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS, WHICH VARY FROM JURISDICTION TO JURISDICTION. THE DISCLAIMERS, EXCLUSIONS, AND LIMITATIONS OF LIABILITY UNDER THESE TERMS WILL NOT APPLY TO THE EXTENT PROHIBITED BY APPLICABLE LAW.`,
      ],
    },
    {
      title: `18. Governing Law, Arbitration, and Class Action/Jury Trial Waiver`,
      paragraphs: [
        `18.1 Governing Law. You agree that:\n
        (a)the Service will be deemed solely based in the State of Delaware; and\n
        (b)the Service will be deemed a passive one that does not give rise to personal jurisdiction over us, either specific or general, in jurisdictions other than Delaware. These Terms will be governed by the internal substantive laws of the State of Delaware, without respect to its conflict of laws principles. The parties acknowledge that these Terms evidence a transaction involving interstate commerce. Notwithstanding the preceding sentences with respect to the substantive law governing these Terms, the Federal Arbitration Act (9 U.S.C. §§ 1-16) (as it may be amended, “FAA”) governs the interpretation and enforcement of the Arbitration Agreement below and preempts all state laws (and laws of other jurisdictions) to the fullest extent permitted by Applicable Law. If the FAA is found to not apply to any issue that arises from or relates to the Arbitration Agreement, then that issue will be resolved under and governed by the law of the U.S. state where you live (if applicable) or the jurisdiction mutually agreed upon in writing by you and us. The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded. You agree to submit to the exclusive personal jurisdiction of the federal and state courts located in Delaware for any actions for which we retain the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of our data security, Confidential Information, or Intellectual Property Rights, as set forth in the Arbitration Agreement below, including any provisional relief required to prevent irreparable harm. You agree that Delaware is the proper and exclusive forum for any appeals of an arbitration award, or for trial court proceedings in the event that the Arbitration Agreement below is found to be unenforceable. These Terms were drafted in the English language and this English language version of the Terms is the original, governing instrument of the understanding between you and us. In the event of any conflict between the English version of these Terms and any translation, the English version will prevail.\n
18.2 Arbitration Agreement\n
        (a) General. READ THIS SECTION CAREFULLY BECAUSE IT REQUIRES THE PARTIES TO ARBITRATE THEIR DISPUTES AND LIMITS THE MANNER IN WHICH YOU CAN SEEK RELIEF FROM US. This Arbitration Agreement applies to and governs any dispute, controversy, or claim between you and us that arises out of or relates to, directly or indirectly:\n
        (i) these Terms, including the formation, existence, breach, termination, enforcement, interpretation, validity, and enforceability thereof;\n
        (ii) access to or use of the Service, including receipt of any advertising or marketing communications;\n
        (iii) any transactions through, by, or using the Service; or\n
        (IV) any other aspect of your relationship or transactions with us, directly or indirectly, as a User or consumer (each, a “Claim,” and, collectively, “Claims”). This Arbitration Agreement will apply, without limitation, to all Claims that arose or were asserted before or after your consent to these Terms.\n
        (b) Opting Out of Arbitration Agreement. If you are a new User, you can reject and opt out of this Arbitration Agreement within thirty (30) days of accepting these Terms by emailing us at info@zumlo.co with your full, legal name and stating your intent to opt out of this Arbitration Agreement. Opting out of this Arbitration Agreement does not affect the binding nature of any other part of these Terms, including the provisions regarding controlling law or the courts in which any disputes must be brought.\n
        (c) Dispute-Resolution Process. For any Claim, you will first contact us at info@zumlo.co and attempt to resolve the Claim with us informally. In the unlikely event that we have not been able to resolve a Claim after sixty (60) days, we each agree to resolve such Claim exclusively through binding arbitration by JAMS before a single arbitrator (the “Arbitrator”), under the Optional Expedited Arbitration Procedures then in effect for JAMS (the “Rules”), except as provided herein. JAMS may be contacted at www.jamsadr.com, where the Rules are available. In the event of any conflict between the Rules and this Arbitration Agreement, this Arbitration Agreement will control. The arbitration will be conducted in the U.S. county where you live (if applicable) or Sussex County, Delaware, unless you and Zumlo agree otherwise. If you are using the Service for commercial purposes, each party will be responsible for paying any JAMS filing and administrative fees and Arbitrator fees in accordance with the Rules, and the award rendered by the Arbitrator will include costs of arbitration, reasonable attorneys’ fees, and reasonable costs for expert and other witnesses. If you are an individual using the Service for non-commercial purposes:\n
        (i) JAMS may require you to pay a fee for the initiation of your case, unless you apply for and successfully obtain a fee waiver from JAMS;\n
        (ii) the award rendered by the Arbitrator may include your costs of arbitration, your reasonable attorneys’ fees, and your reasonable costs for expert and other witnesses; and\n
        (iii) you may sue in a small claims court of competent jurisdiction without first engaging in arbitration, but this would not absolve you of your commitment to engage in the informal dispute resolution process. Any judgment on the award rendered by the Arbitrator may be entered in any court of competent jurisdiction. You and we agree that the Arbitrator, and not any federal, state, or local court or agency, will have exclusive authority to resolve any disputes relating to the scope, interpretation, applicability, enforceability, or formation of this Arbitration Agreement, including any claim that all or any part of this Arbitration Agreement is void or voidable. The Arbitrator will also be responsible for determining all threshold arbitrability issues, including issues relating to whether these Terms are, or whether any provision of these Terms is, unconscionable or illusory, and any defense to arbitration, including waiver, delay, laches, unconscionability, and/or estoppel.\n
        (d) Equitable Relief. NOTHING IN THIS ARBITRATION AGREEMENT WILL BE DEEMED AS: PREVENTING US FROM SEEKING INJUNCTIVE OR OTHER EQUITABLE RELIEF FROM THE COURTS AS NECESSARY TO PREVENT THE ACTUAL OR THREATENED INFRINGEMENT, MISAPPROPRIATION, OR VIOLATION OF OUR DATA SECURITY, CONFIDENTIAL INFORMATION, OR INTELLECTUAL PROPERTY RIGHTS; OR PREVENTING YOU FROM ASSERTING CLAIMS IN A SMALL CLAIMS COURT, PROVIDED THAT YOUR CLAIMS QUALIFY AND SO LONG AS THE MATTER REMAINS IN SUCH COURT AND ADVANCES ON ONLY AN INDIVIDUAL (NON-CLASS, NON-COLLECTIVE, AND NON-REPRESENTATIVE) BASIS.\n
        (e) Severability. If this Arbitration Agreement is found to be void, unenforceable, or unlawful, in whole or in part, the void, unenforceable, or unlawful provision, in whole or in part, will be severed. Severance of the void, unenforceable, or unlawful provision, in whole or in part, will have no impact on the remaining provisions of this Arbitration Agreement, which will remain in force, or on the parties’ ability to compel arbitration of any remaining Claims on an individual basis pursuant to this Arbitration Agreement. Notwithstanding the foregoing, if the Class Action/Jury Trial Waiver below is found to be void, unenforceable, or unlawful, in whole or in part, because it would prevent you from seeking public injunctive relief, then any dispute regarding the entitlement to such relief (and only that relief) must be severed from arbitration and may be litigated in a civil court of competent jurisdiction. All other claims for relief subject to arbitration under this Arbitration Agreement will be arbitrated under its terms, and the parties agree that litigation of any dispute regarding the entitlement to public injunctive relief will be stayed pending the outcome of any individual claims in arbitration.\n
18.3 Class Action/Jury Trial Waiver. BY ENTERING INTO THESE TERMS, YOU AND ZUMLO ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO BRING, JOIN, OR PARTICIPATE IN ANY PURPORTED CLASS ACTION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER REPRESENTATIVE PROCEEDING OF ANY KIND AS A PLAINTIFF OR CLASS MEMBER. THE FOREGOING APPLIES TO ALL USERS (BOTH NATURAL PERSONS AND ENTITIES), REGARDLESS OF WHETHER YOU HAVE OBTAINED OR USED THE SERVICE FOR PERSONAL, COMMERCIAL, OR OTHER PURPOSES. THIS CLASS ACTION/JURY TRIAL WAIVER APPLIES TO CLASS ARBITRATION, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S OR ENTITY’S CLAIMS. YOU AND ZUMLO AGREE THAT THE ARBITRATOR MAY AWARD RELIEF ONLY TO AN INDIVIDUAL CLAIMANT AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF ON YOUR INDIVIDUAL CLAIM(S). ANY RELIEF AWARDED MAY NOT AFFECT OTHER USERS.\n
`,
      ],
    },
    {
      title: `19. U.S. Government Restricted Rights`,
      paragraphs: [
        `To the extent the Service is being used by or on behalf of the U.S. Government, the Service will be deemed commercial computer software or commercial computer software documentation (as applicable). Accordingly, if you are an agency of the U.S. Government or any contractor therefor, you receive only those rights with respect to the Service as are granted to all other Users hereunder, in accordance with 48 C.F.R. §227.7202 and 48 C.F.R. §12.212, as applicable.`,
      ],
    },
    {
      title: `20. Export Controls`,
      paragraphs: [
        `20.1 You understand and acknowledge that the Service may be subject to export control laws and regulations. You will comply with all applicable import and export and re-export control and trade and economic sanctions laws and regulations, including the Export Administration Regulations maintained by the U.S. Department of Commerce, trade and economic sanctions maintained by the U.S. Treasury Department’s Office of Foreign Assets Control (“OFAC”), and the International Traffic in Arms Regulations maintained by the U.S. State Department. You represent and warrant that you are not, and that no person to whom you make the Service available or that is acting on your behalf, or, if you are an Organization, that no person or entity owning 50% or more of your equity securities or other equivalent voting interests, is\n
        (a) listed on the List of Specially Designated Nationals and Blocked Persons or on any other list of sanctioned, prohibited, or restricted parties administered by OFAC or by any other governmental entity, or\n
        (b) located in, a national or resident of, or a segment of the government of, any country or territory for which the United States maintains trade or economic sanctions or embargoes or that has been designated by the U.S. Government as a “terrorist supporting” region.\n`,
      ],
    },
    {
      title: `21. General Provisions`,
      paragraphs: [
        `21.1 Assignment. These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you without our prior express written consent, but may be assigned by us without restriction. Any attempted transfer or assignment in violation hereof will be null and void.\n
21.2 Notification Procedures and Changes to these Terms. We may provide notifications, whether such notifications are required by Applicable Law or are for marketing or other business-related purposes, to you via email notice or written or hard copy notice, or through posting of such notice on the Service, as we determine, in our sole discretion. We reserve the right to determine the form and means of providing notifications to Users, provided that you may opt out of certain means of notification, as required under Applicable Law or as described in these Terms. We are not responsible for any automatic filtering you or your network provider may apply to email notifications we send to the email address you provide us. We may, in our sole discretion, modify or update these Terms from time to time, and so you should review this page periodically. When we change these Terms in a material manner, we will update the ‘last modified’ date at the top of this page and notify you that material changes have been made to these Terms. These Terms apply to and govern your access to and use of the Service effective as of the start of your access to the Service, even if such access began before publication of these Terms. Your continued use of the Service after any change to these Terms constitutes your acceptance of the new Terms of Service. If you do not agree to any part of these Terms or to any future Terms of Service, do not access or use (or continue to access or use) the Service.\n
21.3 Entire Agreement; Severability. These Terms, together with any amendments and any additional agreements you may enter into with us in connection with the Service, will constitute the entire agreement between you and us concerning the Service. Any statements or comments made between you and any of our employees or representatives are expressly excluded from these Terms and will not apply to you or us, or to your access to or use of the Service. Except as otherwise stated in the Arbitration Agreement, if any provision of these Terms is deemed invalid by a court of competent jurisdiction, the invalidity of such provision will not affect the validity of the remaining provisions of these Terms, which will remain in full force and effect.\n
21.4 No Waiver. No waiver of any term of these Terms will be deemed a further or continuing waiver of such term or of any other term, and our failure to assert any right or provision under these Terms will not constitute a waiver of such right or provision.\n
21.5 California Residents. The provider of the Service is set forth herein. If you are a California resident, in accordance with Cal. Civ. Code §1789.3, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by contacting it in writing at 1625 North Market Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800) 952-5210 or (916) 445-1254.\n
21.6 Contact. If you have any questions about these Terms and/or the Service, please contact us at info@zumlo.co.\n`,
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
        <Text style={styles.title}>Terms of Service</Text>
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

export default TermsOfService;
