import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-[800px] px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-8">Terms of Service</h1>

        <div className="prose prose-sm max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:underline">
          <p className="italic">Last updated: March 2026</p>

          <p>Welcome to the website operated by JAY23 LLC ("Company", "we", "us", or "our"). By accessing or using our website at crowdfunding.zone and any related services, tools, or content (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Services.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using our Services, you confirm that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>

          <h2>2. Description of Services</h2>
          <p>JAY23 LLC provides audience-building, crowdfunding strategy, growth hacking, and marketing consultation services. Our website includes tools such as the MVA Calculator, Strategy Quiz, educational content, and scheduling functionality for consultations. The Services are provided "as is" and are subject to change without notice.</p>

          <h2>3. User Accounts and Registration</h2>
          <p>Certain features of the Services may require you to provide personal information such as your name and email address. You agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.</p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services for any unlawful purpose or in violation of any applicable law or regulation;</li>
            <li>Interfere with or disrupt the integrity or performance of the Services;</li>
            <li>Attempt to gain unauthorized access to any part of the Services;</li>
            <li>Use automated systems (bots, scrapers, etc.) to access the Services without our written permission;</li>
            <li>Transmit any viruses, malware, or other harmful code;</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>All content on the Services — including but not limited to text, graphics, logos, images, tools, software, and the MVA Framework methodology — is the property of JAY23 LLC or its licensors and is protected by United States and international intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.</p>

          <h2>6. Third-Party Services</h2>
          <p>Our Services may contain links to or integrations with third-party websites and services (e.g., Calendly, Discord, social media platforms). We are not responsible for the content, privacy policies, or practices of any third-party services. Your use of third-party services is at your own risk and subject to their respective terms.</p>

          <h2>7. Consultation Services</h2>
          <p>Strategy calls and consultations booked through our platform are subject to availability. We reserve the right to reschedule or cancel appointments. Any advice, strategies, or recommendations provided during consultations are for informational purposes only and do not constitute a guarantee of specific results.</p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.</p>

          <h2>9. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, JAY23 LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES, REGARDLESS OF THE THEORY OF LIABILITY.</p>

          <h2>10. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless JAY23 LLC and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising out of or in connection with your use of the Services or violation of these Terms.</p>

          <h2>11. Privacy</h2>
          <p>Your use of the Services is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>

          <h2>12. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>

          <h2>13. Termination</h2>
          <p>We may terminate or suspend your access to the Services at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease.</p>

          <h2>14. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Wyoming, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Wyoming.</p>

          <h2>15. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>JAY23 LLC</li>
            <li>412 N. Main Street, STE 100 Buffalo, Wyoming 82834</li>
            <li>Phone: <a href="tel:+16282417366">+1 (628) 241-7366</a></li>
            <li>Email: <a href="mailto:crowdfunding_zone@jay23.com">crowdfunding_zone@jay23.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
