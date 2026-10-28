import React from 'react';

// Hidden spam trap: people never see or fill it; bots usually do.
// The data-* attributes tell common password managers and autofill extensions to leave it alone.
export default function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
      <input
        type="text"
        name="fx_trap_7"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        data-lpignore="true"
        data-1p-ignore="true"
        data-bwignore="true"
        data-form-type="other"
      />
    </div>
  );
}