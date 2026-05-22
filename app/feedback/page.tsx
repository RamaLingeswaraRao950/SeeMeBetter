import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { FeedbackForm } from "@/components/forms/feedback-form";

export default function FeedbackPage() {
  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Anonymous Feedback</div>
          <div className="mt-1 text-sm text-mutedForeground">
            Your response is anonymous and helps me improve.
          </div>
        </div>
        <ModeToggle />
      </div>
      <div className="mt-8">
        <FeedbackForm />
      </div>
    </Container>
  );
}

