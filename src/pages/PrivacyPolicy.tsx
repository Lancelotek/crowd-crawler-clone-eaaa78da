import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Privacy Policy" description="Privacy Policy for JAY23 LLC and the MVA Framework. Learn how we collect, use, and protect your data." canonical="/privacy-policy" noindex />
      <div className="container mx-auto max-w-[800px] px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-8">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline">
          <h2>1. Who we are</h2>
          <p>JAY23 LLC understands that your personal information is important to you and we recognize the importance of maintaining your privacy.</p>
          <p>We offer products and services in multiple jurisdictions including Australia, the United States, Europe, South East Asia and the Middle East.</p>
          <p>We are bound by or act as if we are bound by:</p>
          <ul>
            <li>the Privacy Act 1988 (Cth) including the Australian Privacy Principles (Australia);</li>
            <li>the General Data Protection Regulation (EU) 2016/679 (Europe);</li>
            <li>California Online Privacy Protection Act of 2003 (USA); and</li>
            <li>The Children's Online Privacy Protection Act of 1998 (USA).</li>
          </ul>
          <p>This Privacy Policy describes how we handle your personal information in accordance with the above legislation. If a requirement of an applicable law conflicts with a section of this Privacy Policy, that legislative requirement will prevail.</p>
          <p>By using this website and our services, or by giving us your personal information, you acknowledge and consent to us collecting, using, storing and disclosing your personal information in accordance with this Privacy Policy.</p>

          <h2>2. The type of personal information we collect and hold</h2>
          <p>The kind of information we collect and hold about you will depend on the nature of your dealing with us. We may collect and hold information about you including:</p>
          <ul>
            <li>contact information and identification such as your name, address, phone number, email address and birth date;</li>
            <li>log in information including your username and password;</li>
            <li>payment and billing information including account or credit card information;</li>
            <li>records of correspondence; and</li>
            <li>information collected from marketing campaigns, product research, surveys and your interactions with us including via social media.</li>
          </ul>

          <h2>3. How we collect personal information</h2>
          <p>We collect personal information in a number of ways, including where you provide information directly to us (e.g. completing an order form, registering for our services, making an inquiry, or interacting with us via email, phone, SMS, or social media) and from third parties.</p>
          <p>We do not generally collect sensitive information about individuals. Where we collect, use and disclose sensitive information about you, we will only do so where we have obtained your consent or the collection, use, or disclosure is permitted by law.</p>

          <h2>4. Acting anonymously</h2>
          <p>Where possible, we will allow you to interact with us through the website anonymously or using a pseudonym. However, if you do not wish to provide particular information, or the information you provide is incorrect or inaccurate we may not be able to provide you with our products or services or respond to your inquiry or request.</p>

          <h2>5. Personal information and Children</h2>
          <p>We will not knowingly collect, use or disclose personal information about a child, without obtaining the prior written consent of a parent or guardian. We will not send any direct marketing communications to any child under 18 years of age.</p>

          <h2>6. Cookies and online tracking</h2>
          <p>On our website, we do not currently use or enable cookies, Google Adwords or Google AdSense or any other third party behavioural tracking. However, we may do so in the future. If we decide to use or enable cookies or online tracking in the future, we will honour any "Do Not Track" browser mechanisms you have put in place.</p>

          <h2>7. Purpose of collection, use and disclosure</h2>
          <p>We collect, hold, use and disclose personal information for the primary purpose of conducting our business, which includes but is not limited to: providing you with our products and services, providing assistance and customer support, following up on your correspondence, resolving disputes, protecting our property and rights, and internal purposes such as administrative, marketing, planning, and research.</p>

          <h2>8. Your choices regarding the collection, disclosure and distribution of personal information</h2>
          <p>Except as otherwise described in this Privacy Policy, we will only use personal information for the purposes described above. You must provide your consent for us to use your personal information for any other purpose.</p>

          <h2>9. Who we disclose your personal information to</h2>
          <p>We sometimes employ other companies and individuals to perform services for us. We may share your personal information with these parties who have agreed to hold this information in confidence and honour our privacy and security policies. This includes technology providers, mailing houses, electronic network administrators, lawyers, accountants and business advisors.</p>

          <h2>10. Overseas disclosure</h2>
          <p>From time to time, we may disclose your personal information to overseas recipients if it is necessary to conduct our business or if required by law. We currently have operations in Switzerland and use third party suppliers in the Netherlands and Malaysia.</p>

          <h2>11. Storage and security of personal information</h2>
          <p>We keep personal information as long as it is reasonably necessary. We take your privacy and security seriously and use secure servers with password protection and encryption. We regularly assess risks and take measures to address them.</p>

          <h2>12. Access and correction</h2>
          <p>You may request access to the personal information we hold about you by contacting us. We will respond to any request within 30 days. If you need to correct your personal information, please contact us — we will not charge you for making a correction request.</p>

          <h2>13. Direct marketing</h2>
          <p>From time to time, we may use your personal information for direct marketing purposes. If you do not want to receive direct marketing from us, please opt out by contacting <a href="mailto:operations@jay23.com">operations@jay23.com</a>.</p>

          <h2>14. Questions and complaints</h2>
          <p>If you have any questions about our Privacy Policy, you can contact us:</p>
          <ul>
            <li>JAY23 LLC</li>
            <li>412 N. Main Street, STE 100 Buffalo, Wyoming 82834</li>
            <li>+1 (628) 241-7366</li>
            <li>Email: <a href="mailto:operations@jay23.com">operations@jay23.com</a></li>
          </ul>

          <h2>15. Changes to this Privacy Policy</h2>
          <p>We may change this Privacy Policy at any time. The revised version will be effective at the time we post it. Please refer back periodically to review any updates.</p>
          <p className="italic">Last updated: May 2020</p>

          <h2>16. Personal Data (European Union users)</h2>
          <p>If you are a user in the EU, our processing of your personal information must be in accordance with the EU General Data Protection Regulation (GDPR). Under the GDPR, you have additional rights including the right to request explanation, receive a copy, request deletion, object to processing, and request access in a machine-readable format.</p>

          <p className="mt-8 text-xs font-semibold uppercase">BY USING OUR SERVICES, YOU SIGNIFY YOUR ACCEPTANCE OF THIS PRIVACY POLICY. IF YOU DO NOT AGREE TO THIS PRIVACY POLICY, YOU SHOULD NOT USE OUR SERVICES.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
