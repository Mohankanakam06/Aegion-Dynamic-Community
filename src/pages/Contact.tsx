import { useState, useId } from 'react';
import {
  Mail,
  MessageSquare,
  Instagram,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Send,
  Download,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { triggerEmberConfetti } from '../lib/confetti';
import { Eyebrow } from '../components/brand/Eyebrow';

interface FormState {
  name: string;
  email: string;
  role: 'builder' | 'mentor' | 'speaker' | 'partner';
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    role: 'builder',
    message: '',
  });

  const [touched, setTouched] = useState<{ [K in keyof FormState]?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  // Validate form state
  const validate = (state: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (!state.name.trim()) {
      errors.name = 'Please enter your name.';
    } else if (state.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    }

    if (!state.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. name@campus.edu).';
    }

    if (state.message.length > 500) {
      errors.message = 'Message must be within 500 characters.';
    }

    return errors;
  };

  const errors = validate(formState);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, role: true, message: true });

    if (!isValid) {
      setErrorMsg('Please resolve the highlighted fields before submitting.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Realistic API roundtrip simulation with graceful UI state
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitting(false);
      setSubmitted(true);
      triggerEmberConfetti();
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Something went wrong transmitting your message. Please try again.');
    }
  };

  const downloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aegion Dynamic Community//Weekly Build Hours//EN',
      'BEGIN:VEVENT',
      'SUMMARY:Aegion Sunday Build Sprint',
      'DESCRIPTION:Weekly collaborative build sprint with student engineers in Vizag. Real code, PRs, and demo circles.',
      'LOCATION:Vizag Innovation Hub & Discord, Visakhapatnam, AP',
      'RRULE:FREQ=WEEKLY;BYDAY=SU',
      'DTSTART:20261011T053000Z',
      'DTEND:20261011T093000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'aegion-sunday-sprint.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormState({ name: '', email: '', role: 'builder', message: '' });
    setTouched({});
    setErrorMsg('');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14 sm:mb-16">
        <Eyebrow variant="pill" icon={Mail} lead="Get Involved" tail="Pull Up a Chair" className="mb-6" />

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink)] mb-4">
          Get in <span className="text-[var(--ember)]">Touch</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed prose-measure">
          Whether you're pushing your first pull request, hosting a teardown, or mentoring student builders in Vizag, you're always welcome.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: DIRECT CHANNELS & INFO (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
              Direct Channels
            </h2>

            {/* Discord */}
            <a
              href="https://discord.gg/aegion"
              target="_blank"
              rel="noreferrer"
              className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] rounded-2xl"
            >
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line-strong)] shadow-xs hover:shadow-md hover:border-[var(--ember)]/40 transition-all flex items-center justify-between min-h-[72px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--ember-soft)] text-[var(--ember)] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--ink)]">Discord Community</h3>
                    <p className="text-xs text-[var(--ink-soft)] font-mono">Real-time chat & sprint channels</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[var(--ink-faint)] group-hover:text-[var(--ember)] transition-colors shrink-0" aria-hidden="true" />
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:contact@aegion.dev"
              className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] rounded-2xl"
            >
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line-strong)] shadow-xs hover:shadow-md hover:border-[var(--ember)]/40 transition-all flex items-center justify-between min-h-[72px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--amber-soft)] text-[var(--ember-deep)] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--ink)]">Email Inquiries</h3>
                    <p className="text-xs text-[var(--ink-soft)] font-mono">contact@aegion.dev</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[var(--ink-faint)] group-hover:text-[var(--ember)] transition-colors shrink-0" aria-hidden="true" />
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/aegion.community"
              target="_blank"
              rel="noreferrer"
              className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] rounded-2xl"
            >
              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line-strong)] shadow-xs hover:shadow-md hover:border-[var(--ember)]/40 transition-all flex items-center justify-between min-h-[72px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--ember-soft)] text-[var(--ember)] flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--ink)]">Instagram Stories</h3>
                    <p className="text-xs text-[var(--ink-soft)] font-mono">@aegion.community</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[var(--ink-faint)] group-hover:text-[var(--ember)] transition-colors shrink-0" aria-hidden="true" />
              </div>
            </a>

            {/* GitHub & LinkedIn */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href="https://github.com/aegion-community"
                target="_blank"
                rel="noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--line-strong)] shadow-xs hover:shadow-md hover:border-[var(--ember)]/40 transition-all flex items-center gap-3 text-[var(--ink)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] min-h-[56px]"
              >
                <Github className="w-5 h-5 text-[var(--ember)] group-hover:scale-105 transition-transform shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/company/aegion-dynamic-community"
                target="_blank"
                rel="noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--line-strong)] shadow-xs hover:shadow-md hover:border-[var(--ember)]/40 transition-all flex items-center gap-3 text-[var(--ink)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] min-h-[56px]"
              >
                <Linkedin className="w-5 h-5 text-[var(--ember)] group-hover:scale-105 transition-transform shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold">LinkedIn</span>
              </a>
            </div>

            {/* Location & Cadence Card */}
            <div className="p-6 rounded-2xl bg-[var(--cream-soft)] border border-[var(--line-strong)] space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--ember)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-sm text-[var(--ink)]">Ecosystem Hub</h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    Vizag Innovation Hub, Siripuram & Andhra Pradesh campus chapters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[var(--line)]">
                <Calendar className="w-5 h-5 text-[var(--ember)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-sm text-[var(--ink)]">Weekly Sprint Cadence</h4>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    Every Sunday from 11:00 AM to 3:15 PM IST.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE CONTACT / RSVP FORM (Span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--surface)] p-8 sm:p-12 rounded-3xl border border-[var(--line-strong)] shadow-md">
              {submitted ? (
                <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-250">
                  <div className="w-16 h-16 rounded-full bg-[var(--ember-soft)] text-[var(--ember)] flex items-center justify-center mx-auto mb-4 ring-8 ring-[var(--ember-soft)]/50">
                    <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-3xl font-extrabold text-[var(--ink)]">
                    Message Received!
                  </h3>
                  <p className="text-[var(--ink-soft)] max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, <span className="font-semibold text-[var(--ink)]">{formState.name}</span>. An Aegion community steward will reach out to you via <span className="font-mono text-[var(--ember-deep)] font-medium">{formState.email}</span> shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={downloadICS}
                      className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-mono font-semibold transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                    >
                      <Download className="w-4 h-4" />
                      <span>Add Sunday Sprint to Calendar</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[var(--cream-soft)] border border-[var(--line-strong)] text-xs font-mono font-semibold text-[var(--ink)] hover:bg-[var(--line)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-1">
                      Send a Message or RSVP
                    </h2>
                    <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                      Tell us about yourself and how you'd like to get involved with Aegion in Vizag.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-[var(--color-error-bg)] border border-[var(--color-error-border)] text-[var(--color-error)] text-xs font-medium flex items-center gap-2 animate-in fade-in"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={nameId}
                        className="block font-mono text-xs font-semibold text-[var(--ink)] uppercase tracking-wider"
                      >
                        Your Name <span className="text-[var(--ember)]">*</span>
                      </label>
                      {touched.name && errors.name && (
                        <span id={`${nameId}-error`} className="text-xs font-mono text-[var(--color-error)]">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <input
                      id={nameId}
                      type="text"
                      required
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? `${nameId}-error` : undefined}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Maya Shenoy"
                      className={`w-full px-4 py-3 min-h-[44px] rounded-xl bg-[var(--cream)] border text-[var(--ink)] text-sm transition-all focus:outline-none focus:ring-2 ${
                        touched.name && errors.name
                          ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
                          : 'border-[var(--line-strong)] focus:border-[var(--ember)] focus:ring-[var(--ember)]/20'
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={emailId}
                        className="block font-mono text-xs font-semibold text-[var(--ink)] uppercase tracking-wider"
                      >
                        Email Address <span className="text-[var(--ember)]">*</span>
                      </label>
                      {touched.email && errors.email && (
                        <span id={`${emailId}-error`} className="text-xs font-mono text-[var(--color-error)]">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <input
                      id={emailId}
                      type="email"
                      required
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? `${emailId}-error` : undefined}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. maya@gitam.edu"
                      className={`w-full px-4 py-3 min-h-[44px] rounded-xl bg-[var(--cream)] border text-[var(--ink)] text-sm transition-all focus:outline-none focus:ring-2 ${
                        touched.email && errors.email
                          ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
                          : 'border-[var(--line-strong)] focus:border-[var(--ember)] focus:ring-[var(--ember)]/20'
                      }`}
                    />
                  </div>

                  {/* Role / Goal */}
                  <div>
                    <span className="block font-mono text-xs font-semibold text-[var(--ink)] uppercase tracking-wider mb-2">
                      I am a...
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Participant role">
                      {[
                        { id: 'builder', label: 'Student Builder' },
                        { id: 'mentor', label: 'Tech Mentor' },
                        { id: 'speaker', label: 'Speaker' },
                        { id: 'partner', label: 'Campus Partner' },
                      ].map((role) => {
                        const isSelected = formState.role === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setFormState({ ...formState, role: role.id as any })}
                            className={`min-h-[44px] p-2.5 rounded-xl text-xs font-mono text-center border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] ${
                              isSelected
                                ? 'bg-[var(--ember)] text-white border-[var(--ember)] font-bold shadow-xs'
                                : 'bg-[var(--cream)] text-[var(--ink-soft)] border-[var(--line-strong)] hover:border-[var(--ember)]/40 hover:text-[var(--ink)]'
                            }`}
                          >
                            {role.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={messageId}
                        className="block font-mono text-xs font-semibold text-[var(--ink)] uppercase tracking-wider"
                      >
                        Message / Project Idea
                      </label>
                      <span className="text-[11px] font-mono text-[var(--ink-muted)]">
                        {formState.message.length} / 500
                      </span>
                    </div>
                    <textarea
                      id={messageId}
                      rows={4}
                      maxLength={500}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell us what you are building or what brings you to Aegion..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--cream)] border border-[var(--line-strong)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--ember)] focus:ring-2 focus:ring-[var(--ember)]/20 transition-all resize-y min-h-[96px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ember)] hover:bg-[var(--ember-deep)] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
