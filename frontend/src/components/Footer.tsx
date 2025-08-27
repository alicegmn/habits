import { Button } from "./ui";

export default function Footer() {
  return (
    <footer className="p-6 border-t mt-12">
      <h2 className="mb-4 text-lg font-semibold">Connect</h2>
      <div className="flex gap-2">
        <Button variant="primary">Contact us</Button>
        <Button variant="outline" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost">About</Button>
      </div>
    </footer>
  );
}
