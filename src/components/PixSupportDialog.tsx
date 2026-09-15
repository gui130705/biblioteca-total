import { useState } from "react";
import { Check, Copy, HeartHandshake, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const PIX_KEY = "11971616496";

async function copyPixKey() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(PIX_KEY);
    return;
  }

  const input = document.createElement("textarea");
  input.value = PIX_KEY;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("Não foi possível copiar");
}

export function PixSupportDialog({
  mobile = false,
  onOpen,
}: {
  mobile?: boolean;
  onOpen?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyPixKey();
      setCopied(true);
      toast.success("Chave PIX copiada.");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Não foi possível copiar. Selecione a chave manualmente.");
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) onOpen?.();
        if (!open) setCopied(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={mobile ? "ghost" : "outline"}
          size={mobile ? "default" : "sm"}
          className={cn(mobile && "w-full justify-start px-2")}
        >
          <HeartHandshake className="size-4 text-gold" />
          Apoiar via PIX
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden border-border bg-card p-0">
        <div className="border-b border-border bg-accent/40 px-6 py-7">
          <div className="flex size-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
            <HeartHandshake className="size-5" />
          </div>
          <DialogHeader className="mt-5 text-left">
            <DialogTitle className="font-display text-2xl">Apoie a Biblioteca</DialogTitle>
            <DialogDescription className="mt-2 leading-relaxed">
              Sua contribuição ajuda a manter o acervo gratuito e a experiência de leitura em evolução.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="flex items-start gap-3">
            <Smartphone className="mt-0.5 size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Chave PIX · Celular</p>
              <p className="mt-1 font-mono text-base font-semibold">{PIX_KEY}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nome</p>
            <p className="mt-1 text-sm font-medium">Wagner S. Apolinário</p>
          </div>
          <Button className="w-full" onClick={handleCopy} aria-live="polite">
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Chave copiada" : "Copiar chave PIX"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}