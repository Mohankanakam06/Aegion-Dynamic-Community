import { useState } from 'react';
import { KitBlock, KitRow } from './KitBlock';
import { Field } from '../components/ui/Field';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { ChoiceChips } from '../components/ui/ChoiceChips';

const ROLE_OPTIONS = [
  { value: 'builder', label: 'Student Builder' },
  { value: 'mentor', label: 'Tech Mentor' },
  { value: 'speaker', label: 'Speaker' },
  { value: 'partner', label: 'Campus Partner' },
];

const SWATCHES = [
  { name: 'Danger / error', text: '#DC2626', ratio: '4.69:1 cream · 4.83:1 white', ok: true, sample: true },
  { name: 'Success', text: '#15803D', ratio: '4.87:1 cream · 5.02:1 white', ok: true, sample: true },
  { name: 'Warning — FINAL', text: '#B45309', ratio: '4.87:1 cream · 5.02:1 white', ok: true, sample: true },
  { name: 'Warning (old)', text: '#D97706', ratio: '3.09:1 — failed AA, replaced', ok: false, sample: false },
];

/** Kit blocks: B1 Field + semantic swatches, B2 Input/Textarea, B3 ChoiceChips. */
export function FormBlocks() {
  const [role, setRole] = useState('builder');
  const [message, setMessage] = useState('');

  return (
    <>
      <KitBlock
        id="tokens-semantic"
        title="B1 — Semantic tokens (warning FINAL: #B45309)"
        note="Danger and success pass AA on cream and white. Warning text is now #B45309 (4.87:1 cream, 5.02:1 white — approved); the old #D97706 failed at 3.09:1 and is retired."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SWATCHES.map((s) => (
            <div key={s.name} className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-4">
              {s.sample ? (
                <p className="font-semibold" style={{ color: s.text }}>
                  Sample text
                </p>
              ) : (
                <p className="flex items-center gap-2 font-semibold text-[var(--ink)]">
                  <span aria-hidden="true" className="inline-block size-4 rounded-full" style={{ backgroundColor: s.text }} />
                  Color chip
                </p>
              )}
              <p className="mt-2 text-[11px] font-medium text-[var(--ink)]">{s.name}</p>
              <p className="font-mono text-[10px] text-[var(--ink-faint)]">{s.text}</p>
              <p className={`mt-1 text-[11px] ${s.ok ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {s.ratio}
              </p>
            </div>
          ))}
        </div>
      </KitBlock>

      <KitBlock
        id="field"
        title="B1 — Field"
        note="Label (sans, medium, 13px, title case — APPROVED, no mono caps) + required (ember asterisk, aria-hidden) + hint (13px, 4.5:1) + error (icon + text). Wiring: htmlFor/id, aria-describedby (hint + error), aria-invalid."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Your Name" required hint="So we know what to call you at Build Hours." control={<Input placeholder="e.g. Maya Shenoy" autoComplete="name" />} />
          <Field
            label="Email Address"
            required
            error="Please provide a valid email format (e.g. name@campus.edu)."
            control={<Input data-shot="input-error" type="email" defaultValue="maya@gitam" autoComplete="email" inputMode="email" />}
          />
        </div>
      </KitBlock>

      <KitBlock
        id="input"
        title="B2 — Input + Textarea"
        note="48px tall, sans 16px (stops iOS zoom), never mono. Focus = 2px ember ring via box-shadow (no layout shift) + border change; hover, error, disabled, read-only states; autofill colors fixed. Shape — APPROVED: pill for single-line inputs, ~20px radius for the textarea."
      >
        <KitRow label="Pill input (final)">
          <div className="w-full max-w-md">
            <Input data-shot="input-pill" placeholder="e.g. Maya Shenoy" />
          </div>
        </KitRow>
        <KitRow label="Disabled / read-only">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Input placeholder="Disabled" disabled />
            <Input defaultValue="contact@aegion.dev" readOnly aria-label="Email address (read-only demo)" />
          </div>
        </KitRow>
        <KitRow label="Textarea — auto-grows (field-sizing), counter when maxLength is set">
          <div className="w-full max-w-xl">
            <Field
              label="Message / Project Idea"
              labelAside={
                <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                  {message.length} / 500
                </span>
              }
              control={
                <Textarea
                  maxLength={500}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are building or what brings you to Aegion…"
                />
              }
            />
          </div>
        </KitRow>
      </KitBlock>

      <KitBlock
        id="choicechips"
        title="B3 — ChoiceChips"
        note="Radix RadioGroup: labelled group, roving tabindex + arrow keys, required + error state. Chips 44px+, pill; checked = ember-tint fill + ember border + check fading in (width reserved). Try arrow keys after focusing."
      >
        <KitRow label="Default (keyboard: Tab → arrows)">
          <ChoiceChips data-shot="chips" aria-label="Participant role" options={ROLE_OPTIONS} value={role} onValueChange={setRole} required />
        </KitRow>
        <KitRow label="Error">
          <ChoiceChips aria-label="Participant role (error demo)" options={ROLE_OPTIONS} value="" onValueChange={() => {}} error />
        </KitRow>
      </KitBlock>
    </>
  );
}

export default FormBlocks;
