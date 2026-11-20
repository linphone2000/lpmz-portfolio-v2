'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/Common/Modal';
import styles from './ServicesContent.module.css';

interface ServiceInquiryProps {
  plan: string | null;
  email: string;
  onClose: () => void;
}

export function ServiceInquiry({ plan, email, onClose }: ServiceInquiryProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const confirmedCustomer = useRef<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const sending = status === 'sending';

  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus();
  }, [status]);

  function closeInquiry() {
    if (sending) return;
    onClose();
    formRef.current?.reset();
    confirmedCustomer.current = null;
    setStatus('idle');
  }

  async function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fields = new FormData(event.currentTarget);
    const name = String(fields.get('name') ?? '').trim();
    const address = String(fields.get('email') ?? '').trim();
    const phone = String(fields.get('phone') ?? '').trim();

    if (!name || !address || !phone) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const customerTemplate = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER;
      const adminTemplate = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const adminEmail = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL || email;

      if (!serviceId || !customerTemplate || !adminTemplate || !publicKey) {
        throw new Error('Email is not configured');
      }

      const details = plan
        ? 'Selected plan: ' + plan
        : 'General services inquiry';
      const endpoint = 'https://api.emailjs.com/api/v1.0/email/send';

      async function sendEmail(
        templateId: string,
        recipientEmail: string,
        recipientName: string
      ) {
        const response = await fetch(endpoint, {
          method: 'POST',
          signal: AbortSignal.timeout(15000),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: recipientEmail,
              to_name: recipientName,
              user_name: name,
              user_email: address,
              user_phone: phone,
              details,
              from_name: 'Portfolio Inquiry',
            },
          }),
        });

        if (!response.ok) {
          throw new Error('EmailJS returned status ' + response.status);
        }
      }

      const inquiryDetails = JSON.stringify([name, address, phone, plan]);
      if (confirmedCustomer.current !== inquiryDetails) {
        await sendEmail(customerTemplate, address, name);
        confirmedCustomer.current = inquiryDetails;
      }
      await sendEmail(adminTemplate, adminEmail, 'Lin');
      setStatus('sent');
    } catch (error) {
      console.warn('Service inquiry failed', error);
      setStatus('error');
    }
  }

  return (
    <Modal
      title={status === 'sent' ? 'Inquiry sent' : 'Tell me how to reach you'}
      isOpen={plan !== null}
      onClose={closeInquiry}
      dismissible={!sending}
      size="md"
    >
      {status === 'sent' ? (
        <>
          <p className={styles.dialogIntro}>
            I’ll be in touch using the details you provided.
          </p>
          <button
            type="button"
            className={styles.primary}
            ref={doneRef}
            onClick={closeInquiry}
          >
            Done
          </button>
        </>
      ) : (
        <>
          <p className={styles.dialogIntro}>
            {plan
              ? 'Project scope: ' + plan
              : 'I’ll follow up to discuss your project.'}
          </p>
          <form ref={formRef} onSubmit={sendInquiry} className={styles.form}>
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                required
                pattern=".*\S.*"
                disabled={sending}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                disabled={sending}
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                required
                pattern=".*\S.*"
                disabled={sending}
              />
            </label>
            {status === 'error' && (
              <p className={styles.formError} role="alert">
                I couldn’t send your inquiry. Try again or email me at{' '}
                <a href={'mailto:' + email}>{email}</a>.
              </p>
            )}
            <button type="submit" className={styles.primary} disabled={sending}>
              {sending ? 'Sending…' : 'Send inquiry'}{' '}
              <ArrowRightIcon aria-hidden />
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
