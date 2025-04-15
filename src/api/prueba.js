import { Resend } from 'resend';

const resend = new Resend('re_KDmBz8SN_CoYLeZ9c9DJdnQbs4YgmPhyt');

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['danielwfq@gmail.com'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();
