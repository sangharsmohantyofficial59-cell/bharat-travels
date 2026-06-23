# TODO - Remove automatic external redirects (run.app)

- [x] Modify `src/App.tsx`:
  - [x] Remove `gdsRedirectState`
  - [x] Remove `triggerGdsRedirect`
  - [x] Remove redirect `useEffect` using `window.location.href`
  - [x] Remove `GdsRedirectLoader` usage block + import
  - [x] Replace all homepage/property CTA click handlers that call `triggerGdsRedirect(...)` with safe in-app actions (open modal / book now)
  - [x] Update `KirteePropertyPage` props to remove `onTriggerGdsRedirect` dependency
- [x] Modify `src/components/KirteePropertyPage.tsx`:
  - [x] Remove `onTriggerGdsRedirect` prop
  - [x] Replace “Open PMS Console” button action with safe in-app placeholder
- [x] Run build/typecheck to ensure no TS errors
- [x] Provide list of every modified file + explanation of each change

