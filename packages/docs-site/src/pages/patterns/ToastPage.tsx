import { ToastProvider, useToast, Button } from '../../../../ds/src';

export const title = "TOAST";

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex gap-4">
      <Button onClick={() => toast("ACTION COMPLETED", "success")}>SUCCESS</Button>
      <Button onClick={() => toast("SYSTEM FAILURE", "danger")}>DANGER</Button>
      <Button onClick={() => toast("STANDARD NOTIFICATION", "default")}>DEFAULT</Button>
    </div>
  );
}

export function ToastPage() {
  return (
    <ToastProvider>
      <div className="p-8 max-w-2xl text-fg">
        <h1 className="font-mono text-h1 font-black text-earned uppercase mb-4 tracking-[0.12em]">
          TOAST
        </h1>
        <p className="font-sans text-body mb-12">
          A brutalist notification system. Zero animations. Pure instant pop-in and pop-out logic natively tied to absolute z-index layout.
        </p>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-mono text-[13px] font-black uppercase text-hairline tracking-[0.12em] mb-4">
              TRIGGERS
            </h2>
            <ToastDemo />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
