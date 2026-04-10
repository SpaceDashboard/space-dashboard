import { useEffect, useRef } from 'react';
import packageConfig from '../../package.json';
import { showToast } from 'src/shared/utils';
import { css } from '@emotion/css';

const refreshButtonStyles = css`
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  color: inherit;
  cursor: pointer;
  font: inherit;
  margin-left: 8px;
  padding: 2px 20px;

  &:hover {
    background: rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const VERSION_URL = `${import.meta.env.VITE_API_URL}/v1/json/version.json`;

/**
 * Compare two semver-ish strings (e.g. "2.10.0").
 * Returns 1 if a > b, -1 if a < b, 0 if equal. Strips a leading "v".
 * Pre-release tags are ignored — fine for our release format.
 */
const compareVersions = (a: string, b: string): number => {
  const pa = a.replace(/^v/, '').split('.').map(Number);
  const pb = b.replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const ai = pa[i] ?? 0;
    const bi = pb[i] ?? 0;
    if (Number.isNaN(ai) || Number.isNaN(bi)) return 0;
    if (ai > bi) return 1;
    if (ai < bi) return -1;
  }
  return 0;
};

const refreshNow = () => {
  window.location.href = `${window.location.pathname}?v=${Date.now()}`;
};

/**
 * Polls a small JSON file on the api host to detect when a new production
 * build of Space Dashboard has shipped. If the remote version is newer than
 * the version baked into this bundle, prompts the user with a sticky toast
 * to refresh.
 *
 * Checks fire on initial mount and whenever the tab becomes visible again
 * (e.g. user returns to a tab they left open overnight). No background
 * polling.
 */
// Module-level flag prevents duplicate in-flight requests across StrictMode's
// double-invoked effects in dev, and across rapid visibilitychange events.
let checkInFlight = false;

export const useVersionCheck = () => {
  const promptedRef = useRef(false);

  useEffect(() => {
    const localVersion = packageConfig.version;

    const check = async () => {
      if (promptedRef.current || checkInFlight) return;
      checkInFlight = true;
      try {
        const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = (await res.json()) as { version?: string };
        if (!data?.version) return;
        if (compareVersions(data.version, localVersion) > 0) {
          promptedRef.current = true;
          showToast(
            <span>
              A new version of Space Dashboard is ready.{' '}
              <button
                type="button"
                onClick={refreshNow}
                className={refreshButtonStyles}
              >
                Update now
              </button>
            </span>,
            { variant: 'info' },
            true,
          );
        }
      } catch {
        // Network/JSON failures are silent on purpose — transient issues
        // shouldn't bother the user.
      } finally {
        checkInFlight = false;
      }
    };

    check();

    const onVisibility = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
};
