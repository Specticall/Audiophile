import Logo from "../ui/Logo";
import { PageLoader } from "./PageLoader";

export default function InitialPageLoader() {
  return (
    <PageLoader disableInitialAnimation>
      <Logo className="scale-150 mb-6" />
    </PageLoader>
  );
}
