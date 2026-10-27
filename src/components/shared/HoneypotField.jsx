import React from 'react';

// Hidden spam trap: people never see or fill it; bots usually do.
export default function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
      <input type="text" name="hp_url" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}