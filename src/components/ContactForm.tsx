import React, { useState } from 'react';
import { Button, Modal } from 'src/components/base';
import { useAppContext } from 'src/hooks';
import { useForm } from 'react-hook-form';
import { IconSend, IconRestore } from '@tabler/icons-react';

export const ContactForm: React.FC = () => {
  const { isContactFormOpen, setIsContactFormOpen } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [humanTest, setHumanTest] = useState<boolean>(true);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const resetForm = () => {
    clearErrors();
    reset();
    setHumanTest(true);
  };

  // const submitForm = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (humanTest) {
  //     return;
  //   }

  //   const data = new FormData();
  //   data.append('name', name);
  //   data.append('email', email);
  //   data.append('message', message);

  //   fetch('https://formspree.io/f/xaygawjb', {
  //     method: 'POST',
  //     body: data,
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // alertSW.fire({
  //         //   icon: 'success',
  //         //   showConfirmButton: false,
  //         //   text: 'Thanks for writing!',
  //         //   timer: 2500,
  //         //   title: 'Sent',
  //         // });
  //         setIsContactFormOpen && setIsContactFormOpen(false);
  //         resetForm();
  //       } else {
  //         response.json().then((data) => {
  //           setError(
  //             data.errors
  //               .map(
  //                 (error: { code: string; message: string }) => error.message,
  //               )
  //               .join(', '),
  //           );
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       setError(`Oops! There was a problem submitting your form: ${error}`);
  //     });
  // };

  // useEffect(() => {
  //   if (isContactFormOpen) {
  //     document
  //       .querySelector('form#contact-form')
  //       ?.querySelector('input')
  //       ?.focus();
  //     const handleEscape = (event: KeyboardEvent) => {
  //       if (event.key === 'Escape') {
  //         setIsContactFormOpen && setIsContactFormOpen(false);
  //         resetForm();
  //       }
  //     };
  //     window.addEventListener('keyup', handleEscape);
  //     return () => window.removeEventListener('keyup', handleEscape);
  //   }
  // }, [isContactFormOpen, setIsContactFormOpen]);

  return (
    <Modal isOpen={isContactFormOpen} setIsOpen={setIsContactFormOpen}>
      <h2>{"What's on your mind?"}</h2>

      <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="name">{'Name'}</label>
          <input type="text" {...register('name', { required: true })} />
          {errors.name && <p className="text-error">Name is required</p>}
        </div>

        <div className="input-wrapper">
          <label htmlFor="email">{'Email'}</label>
          <input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="text-error">Email is required and must be valid</p>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="message">{'Message'}</label>
          <textarea
            {...register('message', { required: true })}
            rows={5}
            cols={40}
          ></textarea>
          {errors.message && <p className="text-error">Message is required</p>}
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
            onClick={onSubmit}
            disabled={humanTest}
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
