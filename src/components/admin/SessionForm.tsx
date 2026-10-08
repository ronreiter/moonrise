"use client";

import { useActionState } from "react";
import type { SessionFormState } from "@/app/actions/sessions";
import { SelectField, TextAreaField, TextField } from "@/components/ui/fields";
import { sessionTypeList } from "@/lib/session-types";

type StaffOption = { id: string; name: string; role: string };

type SessionDefaults = {
  typeId: string;
  date: string;
  time: string;
  durationMinutes: number;
  teacherId: string;
  note: string;
};

export function SessionForm({
  action,
  staff,
  submitLabel,
  defaults,
}: {
  action: (prev: SessionFormState, formData: FormData) => Promise<SessionFormState>;
  staff: StaffOption[];
  submitLabel: string;
  defaults?: SessionDefaults;
}) {
  const [state, formAction, pending] = useActionState<SessionFormState, FormData>(action, {});

  return (
    <form action={formAction} className="grid gap-x-8 gap-y-7 md:grid-cols-2">
      <SelectField
        label="Session type"
        name="typeId"
        required
        defaultValue={defaults?.typeId ?? sessionTypeList[0]?.id}
        options={sessionTypeList.map((type) => ({
          value: type.id,
          label: `${type.name} — ${type.meta}`,
        }))}
      />
      <SelectField
        label="Teacher"
        name="teacherId"
        defaultValue={defaults?.teacherId ?? ""}
        options={[
          { value: "", label: "Unassigned" },
          ...staff.map((member) => ({
            value: member.id,
            label: `${member.name} (${member.role})`,
          })),
        ]}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        required
        defaultValue={defaults?.date}
      />
      <TextField
        label="Time — Tel Aviv"
        name="time"
        type="time"
        required
        defaultValue={defaults?.time ?? "18:00"}
      />
      <SelectField
        label="Duration"
        name="durationMinutes"
        defaultValue={String(defaults?.durationMinutes ?? 60)}
        options={[30, 45, 60, 75, 90].map((minutes) => ({
          value: String(minutes),
          label: `${minutes} minutes`,
        }))}
      />
      <TextAreaField
        label="Note (optional)"
        name="note"
        rows={1}
        defaultValue={defaults?.note}
        placeholder="e.g. guest teacher, bring a blanket"
      />

      {state.error ? <p className="text-sm text-red-800 md:col-span-2">{state.error}</p> : null}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="label rounded-full bg-ink px-7 py-4 text-ivory transition-colors hover:bg-night disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
