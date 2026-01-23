import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { helloWorld, sendWelcomeEmail } from "@/lib/inngest/functions";

// Create an API that serves zero-latency GraphQL-like functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
        sendWelcomeEmail
    ],
});
