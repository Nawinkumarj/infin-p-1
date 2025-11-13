import React from "react";


export default function TermsCardPage() {
  return (
    <div className="terms-main-container">
      <h1 className="terms-title">Terms & Conditions</h1>
      <div className="terms-privacy-date">
        Our Privacy Policy was last updated on 13.05.2025
      </div>

      <div className="terms-section">
        <div className="terms-section-number">1</div>
        <div className="terms-content">
          <h2>Introduction</h2>
          <p>
            Welcome to EEB Engineering Design and Consultancy Services (“EEBEDCS”). We are a multidisciplinary engineering and design
            consultancy firm providing professional services across civil, mechanical, electrical, and architectural domains.
            By accessing, browsing, or using our services, you acknowledge that you have read, understood, and agree to be legally
            bound by these Terms & Conditions. If you do not agree with any provision herein, you must refrain from using our services.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">2</div>
        <div className="terms-content">
          <h2>Scope of Services</h2>
          <div className="terms-bold">EEBEDCS offers a range of professional services, including but not limited to:</div>
          <ul className="terms-list">
            <li>a. Engineering design and drafting</li>
            <li>b. Feasibility studies and planning</li>
            <li>c. Technical documentation and modelling (CAD, BIM)</li>
            <li>d. Product R&D and prototyping</li>
            <li>e. Fabrication and delivery of engineered products and tools</li>
          </ul>
          <p>
            All services are tailored to meet client-specific requirements based on agreed scopes, timelines, and deliverables outlined in formal proposals or contracts.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">3</div>
        <div className="terms-content">
          <h2>Client Responsibilities</h2>
          <div className="terms-bold">Clients engaging EEBDCS are expected to:</div>
          <ul className="terms-list">
            <li>a. Provide accurate and timely information as requested</li>
            <li>b. Respond promptly to communications and queries</li>
            <li>c. Review, approve, or comment on deliverables within agreed timelines</li>
            <li>d. Adhere to agreed payment schedules and terms</li>
          </ul>
          <p>
            Failure to fulfill these responsibilities may impact project timelines, costs, and outcomes.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">4</div>
        <div className="terms-content">
          <h2>Intellectual Property</h2>
          <div className="terms-bold">Unless otherwise agreed in writing:</div>
          <ul className="terms-list">
            <li>a. EEBDCS retains ownership of all designs, drawings, models, and documentation produced</li>
            <li>b. Clients receive limited rights to use deliverables solely for agreed project purposes</li>
            <li>c. Unauthorized use, reproduction, or distribution is prohibited</li>
          </ul>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">5</div>
        <div className="terms-content">
          <h2>Confidentiality</h2>
          <p>
            Both EEBDCS and the Client agree to maintain confidentiality of proprietary or sensitive information disclosed during project execution, except as required by law or with written consent.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">6</div>
        <div className="terms-content">
          <h2>Limitation of Liability</h2>
          <p>
            EEBDCS’s liability for any claim arising out of professional services is limited to the value of fees paid by the client for those specific services. EEBDCS is not liable for indirect, incidental, or consequential damages.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">7</div>
        <div className="terms-content">
          <h2>Dispute Resolution</h2>
          <p>
            In the event of disputes, parties agree to attempt resolution through negotiation and mediation prior to pursuing formal legal proceedings.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <div className="terms-section-number">8</div>
        <div className="terms-content">
          <h2>Changes to Terms & Conditions</h2>
          <p>
            EEBDCS reserves the right to modify these Terms & Conditions at any time. Updates will be posted on our website and will be effective from the stated date of update.
          </p>
        </div>
      </div>
    </div>
  );
}
