import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Button, Modal, FlexWrapper, Toggle } from 'src/components/base';
import { useAppContext, useToast } from 'src/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  IconSend,
  IconRestore,
  IconRotateClockwise,
} from '@tabler/icons-react';
import emailjs from '@emailjs/browser';

const loadingButtonCss = css`
  .button-content-wrapper > svg {
    animation: spin 1.5s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface FormFields {
  from_name: string;
  from_email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const { isContactFormOpen, setIsContactFormOpen } = useAppContext();
  const { showToast } = useToast();
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

  const resetForm = () => {
    setSubmitError('');
    clearErrors();
    reset();
    setIsHuman(true);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);

    const emailParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      message: data.message,
    };

    emailjs
      .send('service_ucx3odo', 'template_j221uon', emailParams, {
        publicKey: 'i8Bd38uDCw48_wzQ-',
      })
      .then(
        () => {
          resetForm();
          showToast('Message sent successfully!', { variant: 'confirmation' });
          setIsContactFormOpen && setIsContactFormOpen(false);
        },
        (err) => {
          showToast('Failed to send the message.', {
            variant: 'error',
          });
          setSubmitError(err.text);
          console.error('Error:', err);
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (!isContactFormOpen) {
      resetForm();
    }
  }, [isContactFormOpen, setIsContactFormOpen]);

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
              caleb@spacedashboard.com
            </a>
          </p>
        )}
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <FlexWrapper gap={24}>
            <FlexWrapper>
              <label htmlFor="from_name">{'Name'}</label>
              <input
                type="text"
                autoComplete="off"
                data-1p-ignore
                {...register('from_name', { required: true })}
              />
              {errors.from_name && (
                <p className="text-error">
                  {errors.from_name.message === ''
                    ? 'Name is required'
                    : errors.from_name.message}
                </p>
              )}
            </FlexWrapper>

            <FlexWrapper>
              <label htmlFor="from_email">{'Email'}</label>
              <input
                type="email"
                autoComplete="off"
                data-1p-ignore
                {...register('from_email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.from_email && (
                <p className="text-error">
                  {errors.from_email.message === ''
                    ? 'Email is required and must be valid'
                    : errors.from_email.message}
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
                onClick={resetForm}
                variantsList={['secondary']}
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
