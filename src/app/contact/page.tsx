'use client';

import { useState, type FormEvent } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { Card } from '@/components/surfaces/Card';
import { ApiRequestError, apiFetch } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: { name, email, subject: subject || undefined, message, website },
      });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Could not send message',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="w-full bg-surface pt-16">
        <section className="mx-auto w-full max-w-2xl px-margin-desktop py-16">
          <Breadcrumbs
            className="mb-space-md"
            items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          />
          <p className="mb-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Contact
          </p>
          <h1 className="mb-space-md font-headline-lg text-headline-lg font-bold text-on-surface">
            Get in touch
          </h1>
          <p className="mb-space-lg font-body-lg text-body-lg text-on-surface-variant">
            Bug report, feature request, or partnership? Send a note.
          </p>

          <Card>
            {sent ? (
              <div className="py-6 text-center">
                <p className="mb-space-xs font-headline-sm text-headline-sm text-on-surface">
                  Message received.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  We&apos;ll reply as soon as we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
                <Input
                  label="Name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Subject (optional)"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                {/* Honeypot — hidden from humans, bots fill it, backend rejects */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="sr-only"
                />

                <div className="flex flex-col gap-space-xs">
                  <label
                    htmlFor="message"
                    className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="rounded-xl border border-outline-variant bg-surface-container-low p-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:outline-none focus:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-error/30 bg-error-container/20 p-space-sm font-body-sm text-body-sm text-error">
                    {error}
                  </div>
                )}

                <Button type="submit" loading={loading} size="lg">
                  Send message
                </Button>
              </form>
            )}
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
