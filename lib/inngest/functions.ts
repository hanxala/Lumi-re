import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { event, body: "Hello, World!" };
    },
);

// Simulated welcome email
export const sendWelcomeEmail = inngest.createFunction(
    { id: "send-welcome-email" },
    { event: "user/created" },
    async ({ event, step }) => {
        const { email, name } = event.data;

        await step.run("send-email", async () => {
            console.log(`Sending welcome email to ${name} <${email}>`);
            // In a real app, you'd use Resend, SendGrid, etc.
            return { success: true, message: `Email sent to ${email}` };
        });

        return { success: true };
    }
);
