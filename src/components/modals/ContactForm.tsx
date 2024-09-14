import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { usePostHog } from 'posthog-js/react';
import { Button, Modal, FlexWrapper, Toggle } from 'src/components/base';
import { useAppContext, useToast } from 'src/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  IconSend,
  IconRestore,
  IconRotateClockwise,
} from '@tabler/icons-react';

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
  const { showToast } = useToast();
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

    try {
      const response = await fetch('https://api.spacedashboard.com/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        try {
          posthog?.identify(data.email, {
            email: data.email,
            name: data.name,
          });
        } catch (error) {
          console.error(error);
        }
        resetForm();
        showToast('Message sent successfully!', { variant: 'confirmation' });
        setIsContactFormOpen && setIsContactFormOpen(false);
      } else {
        showToast('An unexpected error occurred.', { variant: 'error' });
      }
    } catch (error: any) {
      showToast('Failed to send the message.', {
        variant: 'error',
      });
      setSubmitError(error);
      console.error('Error:', error);
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
    <Modal isOpen={isContactFormOpen} setIsOpen={setIsContactFormOpen}>
      <FlexWrapper gap={20}>
        <h2>{"What's on your mind?"}</h2>
        {submitError && (
          <p className="text-error">
            {'Error submitting the form.'}
            <br />
            {'You can also email me directly at:'}{' '}
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
                  pattern: /^\S+@\S+$/i,
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
    </Modal>
  );
};
