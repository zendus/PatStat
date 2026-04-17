"use client";

import React, { useState } from "react";
import styles from "./style.module.css";

// ─── Icons ────────────────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const EmailContactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A949D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const AttachIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#646363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// SectionHeaderProps from HospitalSettingsPage for consistency
interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => (
  <div className={styles.sectionHeader}>
    <div className={styles.sectionIconWrap}>{icon}</div>
    <h2 className={styles.sectionTitle}>{title}</h2>
  </div>
);

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} type="button">
        <span>{question}</span>
        {isOpen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className={styles.accordionContent}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};


const SupportCenterPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ subject, message, file });
    // In a real application, you would send this data to a backend
    alert("Support request submitted!");
    setSubject("");
    setMessage("");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Page Header - Modified from HospitalSettingsPage to fit Support Center */}
      <div className={styles.topHeader}>
        <div className={styles.headerContent}>
          <h1>Support Center</h1>
          <p className={styles.subtitle}>Get help, resources, and report issues</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.editInformationBtn} type="button"> {/* Reusing editInformationBtn style */}
            Edit Information
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          {/* Send Message Section */}
          <div className={styles.settingsSection}> {/* Reusing settingsSection style */}
            <SectionHeader icon={<MailIcon />} title="Send Message" />
            <form onSubmit={handleSubmit} className={styles.formGridSingleColumn}> {/* Using a single column grid for form */}
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  className={styles.formInput}
                  placeholder="Brief description of the issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  className={`${styles.formInput} ${styles.textarea}`} // Add textarea specific style
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="attachFile" className={styles.attachFileLabel}>
                  <AttachIcon /> Attach File <span className={styles.optionalText}>Optional</span>
                  <input
                    type="file"
                    id="attachFile"
                    className={styles.fileInput}
                    onChange={handleFileChange}
                  />
                  {file && <span className={styles.fileName}>{file.name}</span>}
                </label>
              </div>
              <button 
              type="submit" 
              className={styles.submitRequestBtn}>
                Submit Request
                </button>
            </form>
          </div>

          {/* Frequently Asked Questions Section */}
          <div className={styles.settingsSection}> {/* Reusing settingsSection style */}
            <SectionHeader icon={<QuestionIcon />} title="Frequently Asked Questions" />
            <div className={styles.accordionContainer}>
              <AccordionItem
                question="How do I add a patient?"
                answer="You can add a new patient by navigating to the 'Patients' section and clicking on the 'Add New Patient' button. Fill in the required details in the form that appears."
              />
              <AccordionItem
                question="How do I invite a family member?"
                answer="To invite a family member, go to the patient's profile, find the 'Family Members' section, and click 'Invite Family Member'. Enter their email address to send an invitation."
              />
              <AccordionItem
                question="How do I update patient status?"
                answer="Patient status can be updated from their individual profile page. Look for the 'Status' field and select the appropriate option from the dropdown menu."
              />
              <AccordionItem
                question="How do I reset a staff password?"
                answer="Only administrators can reset staff passwords. Go to 'Staff Management', select the staff member, and click 'Reset Password'. A temporary password will be sent to their email."
              />
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {/* Contact Support Section */}
          <div className={styles.settingsSection}> {/* Reusing settingsSection style */}
            <h3 className={styles.contactSupportTitle}>Contact Support</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <EmailContactIcon />
                <div>
                  <p className={styles.contactLabel}>Email Us</p>
                  <p className={styles.contactValue}>help@patstat.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <PhoneIcon />
                <div>
                  <p className={styles.contactLabel}>Call Us</p>
                  <p className={styles.contactValue}>+1 800 PAT-STAT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help Guides Section */}
          <div className={styles.settingsSection}> {/* Reusing settingsSection style */}
            <h3 className={styles.contactSupportTitle}>Help Guides</h3>
            <div className={styles.helpGuideList}>
              <a href="#" className={styles.helpGuideItem}>
                Getting Started Guide <ChevronRightIcon />
              </a>
              <a href="#" className={styles.helpGuideItem}>
                Managing Patients <ChevronRightIcon />
              </a>
              <a href="#" className={styles.helpGuideItem}>
                Using Status Updates <ChevronRightIcon />
              </a>
            </div>
          </div>

          {/* Report an Issue Section */}
          <div className={styles.reportIssueSection}>
            <div className={styles.reportIssueContainer}>
            <AlertIcon /> Report an Issue
            </div>
            <p className={styles.reportIssueText}>
              Experiencing a bug? Let us know so we can fix it immediately.
            </p>
            <button 
            type="button"
            className={styles.reportBugBtn}>
                Report Bug
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SupportCenterPage };