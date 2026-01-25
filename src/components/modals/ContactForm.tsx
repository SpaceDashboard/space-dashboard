import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { css } from '@emotion/css';
import { usePostHog } from 'posthog-js/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  IconSend,
  IconRestore,
  IconRotateClockwise,
  IconCode,
  IconCircleDot,
  IconExternalLink,
  IconInfoCircle,
} from '@tabler/icons-react';
import {
  Button,
  Modal,
  FlexWrapper,
  Toggle,
  TooltipWrapper,
} from 'src/components/base';
import { useAppContext } from 'src/hooks';
import { showToast } from 'src/shared/utils';

const loadingButtonCss = css`
  .button-content-wrapper > svg {
    animation: spinClockwise 1.5s linear infinite;
  }
`;

const resetButtonCss = css`
  .button-content-wrapper > svg {
    animation: spinCounterClockwise 0.75s ease-out 1;
  }
`;

interface FormFields {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const { isContactFormOpen, setIsContactFormOpen } = useAppContext();
  const posthog = usePostHog();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHuman, setIsHuman] = useState<boolean>(true);
  const [submitError, setSubmitError] = useState<string>('');
  const [spinIcon, setSpinIcon] = useState<boolean>(false);

  const resetForm = () => {
    setSubmitError('');
    clearErrors();
    reset();
    setIsHuman(true);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);
    const formUrl1 = `${import.meta.env.VITE_API_URL}/contact/`;
    // Only get 50 submissions per month, so I hope the first flow works most of the time
    const formUrl2 = 'https://formspree.io/f/xvgogpaa';

    try {
      let response;
      try {
        response = await axios.post(formUrl1, data);
      } catch (error) {
        console.error(
          'Error with first contact URL, trying the backup: ',
          error,
        );
        Sentry.captureException(
          `Error with formUrl1, trying formUrl2. Error: ${error}`,
        );
        response = await axios.post(formUrl2, data);
      }

      if (response.status === 200) {
        try {
          posthog?.identify(data.email, {
            email: data.email,
            name: data.name,
          });
        } catch (error) {
          console.error('PostHog identify error:', error);
        }
        resetForm();
        showToast('Message sent successfully!', { variant: 'confirmation' });
        setIsContactFormOpen?.(false);
      } else {
        showToast('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (error: any) {
      showToast('Failed to send the message.', {
        variant: 'error',
      });
      setSubmitError(error);
      Sentry.captureException(error);
      console.error('Final Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isContactFormOpen) {
      resetForm();
    }
  }, [isContactFormOpen, setIsContactFormOpen]);

  useEffect(() => {
    if (spinIcon) {
      setTimeout(() => {
        setSpinIcon(false);
      }, 1000);
    }
  }, [spinIcon]);

  return (
    <Modal
      isOpen={isContactFormOpen}
      setIsOpen={setIsContactFormOpen}
      isFullScreen={true}
    >
      <div className="content-two-up">
        <FlexWrapper gap={20}>
          <h2>{"What's on your mind?"}</h2>
          {submitError && (
            <p className="text-error">
              {'Error submitting the form.'}
              <br />
              {'You can also email me directly at: '}
              <a href="mailto:caleb@spacedashboard.com">
                {'caleb@spacedashboard.com'}
              </a>
            </p>
          )}
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <FlexWrapper gap={24}>
              <FlexWrapper>
                <label htmlFor="name">{'Name'}</label>
                <input
                  type="text"
                  autoComplete="off"
                  data-1p-ignore
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className="text-error">
                    {errors.name.message === ''
                      ? 'Name is required'
                      : errors.name.message}
                  </p>
                )}
              </FlexWrapper>

              <FlexWrapper>
                <label htmlFor="email">{'Email'}</label>
                <input
                  type="email"
                  autoComplete="off"
                  data-1p-ignore
                  {...register('email', {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <p className="text-error">
                    {errors.email.message === ''
                      ? 'Email is required and must be valid'
                      : errors.email.message}
                  </p>
                )}
              </FlexWrapper>

              <FlexWrapper>
                <label htmlFor="message">{'Message'}</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={5}
                  cols={40}
                ></textarea>
                {errors.message && (
                  <p className="text-error">
                    {errors.message.message === ''
                      ? 'Message is required'
                      : errors.message.message}
                  </p>
                )}
              </FlexWrapper>

              <FlexWrapper>
                <Toggle
                  id="human-test"
                  label="Human test - uncheck this"
                  checked={isHuman}
                  onChange={() => setIsHuman(!isHuman)}
                />
              </FlexWrapper>

              <FlexWrapper flexDirection="row" gap={18}>
                <Button
                  buttonType="submit"
                  Icon={isSubmitting ? IconRotateClockwise : IconSend}
                  disabled={isHuman || isSubmitting}
                  className={isSubmitting ? loadingButtonCss : ''}
                >
                  {'Send'}
                </Button>
                <Button
                  Icon={IconRestore}
                  onClick={() => {
                    setSpinIcon(true);
                    resetForm();
                  }}
                  variantsList={['secondary']}
                  className={spinIcon ? resetButtonCss : ''}
                >
                  {'Reset'}
                </Button>
              </FlexWrapper>
            </FlexWrapper>
          </form>
        </FlexWrapper>

        <FlexWrapper gap={16}>
          <h2>{'You can also find me via:'}</h2>
          <p>
            <strong>{'Email:'}</strong>
            <br />
            <a href="mailto:caleb@spacedashboard.com">
              {'caleb@spacedashboard.com'}
            </a>
          </p>
          <p>
            <strong>{'Facebook:'}</strong>
            <br />
            <a
              href="https://www.facebook.com/SpaceDashboard"
              target="_blank"
              rel="noreferrer"
            >
              {'@SpaceDashboard'}
            </a>
          </p>
          <p>
            <strong>{'X (formerly Twitter):'}</strong>
            <br />
            <a
              href="https://twitter.com/SpaceDashboard"
              target="_blank"
              rel="noreferrer"
            >
              {'@SpaceDashboard'}
            </a>
            <br />
            <FlexWrapper alignItems="center" flexDirection="row" tag="span">
              <a
                href="https://twitter.com/CloseApproaches"
                target="_blank"
                rel="noreferrer"
                style={{ margin: 0 }}
              >
                {'@CloseApproaches'}
              </a>
              <TooltipWrapper
                title="Automated account, relaying NASA's close approaches each day for near-Earth objects under 100 lunar distance (LD)"
                delay={300}
              >
                <IconInfoCircle color="#CCC" size={20} />
              </TooltipWrapper>
            </FlexWrapper>
          </p>
          <p>
            <strong>{'Bluesky:'}</strong>
            <br />
            <a
              href="https://bsky.app/profile/spacedashboard.com"
              target="_blank"
              rel="noreferrer"
            >
              {'@SpaceDashboard.com'}
            </a>
            <br />
            <FlexWrapper alignItems="center" flexDirection="row" tag="span">
              <a
                href="https://bsky.app/profile/closeapproaches.com"
                target="_blank"
                rel="noreferrer"
                style={{ margin: 0 }}
              >
                {'@CloseApproaches.com'}
              </a>
              <TooltipWrapper
                title="Automated account, relaying NASA's close approaches each day for near-Earth objects under 100 lunar distance (LD)"
                delay={300}
              >
                <IconInfoCircle color="#CCC" size={20} />
              </TooltipWrapper>
            </FlexWrapper>
          </p>
          <h2 style={{ marginTop: '20px' }}>{'Interested in contributing?'}</h2>
          <p>
            {
              'Check out Space Dashboard on GitHub or report bugs directly via GitHub Issues.'
            }
          </p>
          <FlexWrapper flexDirection="row" gap={18}>
            <Button
              Icon={IconCode}
              variantsList={['secondary']}
              onClick={() => {
                window.open(
                  'https://github.com/SpaceDashboard/space-dashboard',
                  '_blank',
                  'noopener,noreferrer',
                );
              }}
            >
              {'Code'}
              <IconExternalLink size={14} opacity={0.6} />
            </Button>
            <Button
              Icon={IconCircleDot}
              variantsList={['secondary']}
              onClick={() => {
                window.open(
                  'https://github.com/SpaceDashboard/space-dashboard/issues',
                  '_blank',
                  'noopener,noreferrer',
                );
              }}
            >
              {'Issues'}
              <IconExternalLink size={14} opacity={0.6} />
            </Button>
          </FlexWrapper>
        </FlexWrapper>
      </div>
    </Modal>
  );
};
