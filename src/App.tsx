import { useState } from "react";
import { AuthCode } from "./components/ui/auth-code";

function App() {
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  function onSubmit(code: string) {
    setIsSubmitting(true);
    if (code === "123456") {
      setTimeout(() => {
        alert(`OTP ${code} is correct`);
        setIsSubmitting(false);
      }, 1500);
      setIsError(false);
    } else {
      setIsError(true);
      setIsSubmitting(false);
    }
  }
  return (
    <main className="playground">
      <AuthCode
        isError={isError}
        length={6}
        onSubmit={onSubmit}
        shouldAutoSubmit={false}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}

export default App;
