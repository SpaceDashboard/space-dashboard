import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useAppContext } from 'src/hooks/useAppContext';

export const ContactForm: React.FC = () => {
  const { isContactFormOpen, setIsContactFormOpen } = useAppContext();
  const [initialHiddenClass, setInitialHiddenClass] =
    useState<string>('initial-hidden');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [humanTest, setHumanTest] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const errorDisplayValue = useMemo(() => {
    return error ? 'block' : 'none';
  }, [error]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setHumanTest(true);
    setError('');
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (humanTest) {
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('message', message);

    fetch('https://formspree.io/f/xaygawjb', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // alertSW.fire({
          //   icon: 'success',
          //   showConfirmButton: false,
          //   text: 'Thanks for writing!',
          //   timer: 2500,
          //   title: 'Sent',
          // });
          setIsContactFormOpen(false);
          resetForm();
        } else {
          response.json().then((data) => {
            setError(
              data.errors
                .map(
                  (error: { code: string; message: string }) => error.message,
                )
                .join(', '),
            );
          });
        }
      })
      .catch((error) => {
        setError(`Oops! There was a problem submitting your form: ${error}`);
      });
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      setInitialHiddenClass('');
    }, 500);
  }, []);

  useEffect(() => {
    if (isContactFormOpen) {
      document
        .querySelector('form#contact-form')
        ?.querySelector('input')
        ?.focus();
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsContactFormOpen(false);
          resetForm();
        }
      };
      window.addEventListener('keyup', handleEscape);
      return () => window.removeEventListener('keyup', handleEscape);
    }
  }, [isContactFormOpen, setIsContactFormOpen]);

  return (
    <div
      className={`contact-form-wrapper ${initialHiddenClass} ${isContactFormOpen ? 'show' : 'hide'}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setIsContactFormOpen(false);
          resetForm();
        }
      }}
    >
      <section className="contact-form-content">
        <button
          type="button"
          className="close-contact-form"
          aria-label="Close contact form"
          onClick={() => {
            setIsContactFormOpen(false);
            resetForm();
          }}
        >
          <span></span>
          <span></span>
        </button>
        <h2>{"What's on your mind?"}</h2>

        <p style={{ marginBottom: '18px' }}>
          {'You can also email me directly: '}
          <a href="mailto:caleb@calebdudleydesign.com" rel="noreferrer">
            {'caleb@calebdudleydesign.com'}
          </a>
        </p>

        <form id="contact-form">
          <p
            className="text-error"
            style={{ marginBottom: '20px', display: errorDisplayValue }}
            aria-live="polite"
          >
            {error}
          </p>

          <div className="input-wrapper">
            <label htmlFor="name">{'Name'}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="email">{'Email'}</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="message">{'Message'}</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              cols={40}
            ></textarea>
          </div>

          <div className="input-wrapper">
            <label htmlFor="human-test">
              {'Human test - uncheck this:'}
              <input
                type="checkbox"
                name="human-test"
                id="human-test"
                checked={humanTest}
                onChange={() => setHumanTest(!humanTest)}
              />
            </label>
          </div>

          <div className="input-wrapper btns">
            <button
              type="submit"
              className="btn"
              id="submit-contact-form"
              onClick={submitForm}
              disabled={humanTest}
            >
              {'Send'}
            </button>
            <button
              type="button"
              className="btn reset"
              id="reset-contact-form"
              onClick={resetForm}
            >
              {'Reset'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
