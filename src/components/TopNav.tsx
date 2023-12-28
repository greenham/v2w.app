import { Image, Stack } from "react-bootstrap";
import logoImageUrl from "../assets/logo-128.png";

export function TopNav() {
  return (
    <Stack direction="horizontal" gap={3} className="mb-3">
      <Image src={logoImageUrl} width={64} height={64} />
      <Stack>
        <h1 className="mb-0">volum.io</h1>
        <span>a free volume to weight converter for the kitchen</span>
      </Stack>
    </Stack>
  );
}
