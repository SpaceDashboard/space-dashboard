import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'src/components/base';
import { useAppContext, useToastContext } from 'src/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IconSend, IconRestore } from '@tabler/icons-react';

interface FormFields {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const { isContactFormOpen, setIsContactFormOpen } = useAppContext();
  const { showToast } = useToastContext();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [humanTest, setHumanTest] = useState<boolean>(true);

  const resetForm = () => {
    clearErrors();
    reset();
    setHumanTest(true);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xkgwonpj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resetForm();
        showToast('Message sent successfully!', 'success');
        setIsContactFormOpen && setIsContactFormOpen(false);
      } else {
        showToast('An unexpected error occurred.', 'error');
      }
    } catch (error) {
      showToast('Failed to send the message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isContactFormOpen) {
      resetForm();
    }
  }, [isContactFormOpen, setIsContactFormOpen]);

  return (
    <Modal isOpen={isContactFormOpen} setIsOpen={setIsContactFormOpen}>
      <h2>{"What's on your mind?"}</h2>
      <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
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
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">{'Email'}</label>
          <input
            type="email"
            autoComplete="off"
            data-1p-ignore
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="text-error">
              {errors.email.message === ''
                ? 'Email is required and must be valid'
                : errors.email.message}
            </p>
          )}
        </div>

        <div className="input-wrapper">
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

        <div className="button-row">
          <Button
            buttonType="submit"
            Icon={IconSend}
            disabled={humanTest || isSubmitting}
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
        </div>
      </form>
    </Modal>
  );
};
